import { use } from "react";
import path from "path";
import fs from "fs/promises";
import Image from "next/image";

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
    `src/app/quran/source/surah/surah_${formattedId}.json`
  );
  const translationPath = path.join(
    process.cwd(),
    `src/app/quran/source/translation/en/en_translation_${formattedId}.json`
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
    <div className="min-h-screen bg-light-gray text-dark-gray p-4">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
        <Image
          src="/img/bismillah-img.png"
          alt="Bismillah"
          width={500}
          height={500}
          className="mx-auto mb-8 pointer-events-none"
        />
        <h1 className="text-3xl md:text-4xl font-serif text-center text-dark-gray mb-6">
          {surahData.name}
        </h1>
        <hr className="border-t border-dark-gray my-6" />
        <ul className="space-y-8">
          {Object.entries(surahData.verse).map(([key, verse]) => (
            <li key={key} className="space-y-4">
              <p className="text-xl md:text-2xl font-semibold font-arabic text-[#1a1a1a] leading-relaxed text-right">
                {verse}
              </p>
              <p className="text-base md:text-lg italic font-lato text-[#555555] text-left">
                {translationData.verse[key]}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
