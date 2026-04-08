import { use } from "react";
import path from "path";
import fs from "fs/promises";
import Image from "next/image";
import { motion } from "framer-motion";

interface Verse {
  [key: string]: string;
}

interface Surah {
  index: string;
  name: string;
  verse: Verse;
  count: number;
}

interface Translation {
  name: string;
  index: string;
  verse: Verse;
  count: number;
}

interface Params {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const surahDir = path.join(process.cwd(), "src/app/quran/source/surah");
  const surahFiles = await fs.readdir(surahDir);

  return surahFiles.map((file) => ({
    id: file.match(/\d+/)?.[0] || "1",
  }));
}

async function getSurahAndTranslation(id: string) {
  const formattedId = String(parseInt(id, 10));

  const surahPath = path.join(
    process.cwd(),
    `src/app/quran/source/surah/surah_${formattedId}.json`,
  );
  const translationPath = path.join(
    process.cwd(),
    `src/app/quran/source/translation/en/en_translation_${formattedId}.json`,
  );

  const [surahFile, translationFile] = await Promise.all([
    fs.readFile(surahPath, "utf8"),
    fs.readFile(translationPath, "utf8"),
  ]);

  const surahData: Surah = JSON.parse(surahFile);
  const translationData: Translation = JSON.parse(translationFile);

  return { surahData, translationData };
}

export default function QuranSurahPage({ params }: Params) {
  const { id } = use(params);
  const { surahData, translationData } = use(getSurahAndTranslation(id));

  return (
    <div className="min-h-screen bg-[#0F1115] pt-32 pb-20 px-4 md:px-0">
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#00E676]/10 blur-[120px] rounded-full" />
      </div>

      <article className="max-w-5xl mx-auto">
        <header className="text-center mb-16 relative">
          <div className="inline-block px-4 py-1 rounded-full border border-[#00E676]/20 bg-[#00E676]/5 text-[#00E676] text-xs font-mono mb-4">
            SURAH {surahData.index.padStart(3, "0")}
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 tracking-tighter">
            {surahData.name}
          </h1>

          <div className="relative w-full max-w-md mx-auto h-24 mb-12 opacity-80 invert">
            <Image
              src="/img/bismillah-img.png"
              alt="Bismillah"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </header>
        <div className="space-y-0">
          {Object.entries(surahData.verse).map(([key, verse], index) => (
            <section
              key={key}
              className="group relative py-12 px-6 md:px-12 rounded-[2rem] hover:bg-white/[0.02] transition-colors duration-500"
            >
              <div className="absolute left-4 top-12 flex flex-col items-center gap-2">
                <span className="text-[#00E676] font-mono text-xs font-bold opacity-40 group-hover:opacity-100 transition-opacity">
                  {key}
                </span>
                <div className="w-px h-12 bg-gradient-to-b from-[#00E676]/50 to-transparent" />
              </div>
              <div className="flex flex-col gap-8">
                <p
                  dir="rtl"
                  className="text-4xl md:text-6xl font-arabic text-white leading-[1.8] md:leading-[1.6] text-right selection:bg-[#00E676]/30"
                >
                  {verse}
                </p>
                <div className="max-w-3xl">
                  <p className="text-lg md:text-xl text-stone-400 font-light leading-relaxed group-hover:text-stone-200 transition-colors">
                    {translationData.verse[key]}
                  </p>
                </div>
              </div>
              <div className="absolute bottom-0 left-12 right-12 h-px bg-white/[0.03]" />
            </section>
          ))}
        </div>
        <footer className="mt-20 flex justify-center">
          <button className="px-8 py-4 bg-[#1A1D24] border border-white/10 rounded-full text-white hover:border-[#00E676]/50 transition-all font-bold tracking-widest text-xs uppercase">
            End of Surah
          </button>
        </footer>
      </article>
    </div>
  );
}
