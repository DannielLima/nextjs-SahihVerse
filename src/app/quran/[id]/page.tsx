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
  params: Promise<{ id: string }>; // Promessa como parâmetro
}

// Função para gerar parâmetros dinâmicos
export async function generateStaticParams() {
  const surahDir = path.join(process.cwd(), "src/app/quran/source/surah");
  const surahFiles = await fs.readdir(surahDir);

  return surahFiles.map((file) => ({
    id: file.match(/\d+/)?.[0] || "1", // Extrai o ID do nome do arquivo
  }));
}

// Função assíncrona para obter os dados
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

// Componente da página
export default function QuranSurahPage({ params }: Params) {
  const { id } = use(params); // Aguarda os parâmetros
  const { surahData, translationData } = use(getSurahAndTranslation(id)); // Aguarda os dados

  return (
    <div className="min-h-screen text-dark-gray p-6">
      <div className="max-w-4xl mx-auto p-8 bg-light-beige shadow-lg rounded-lg border-4 border-dark-green">
        <Image
          src="/img/bismillah-img.png"
          alt="bismillah"
          width={500}
          height={500}
          className="rounded-lg max-w-full mx-auto"
        />
        <h1 className="text-4xl font-serif text-center mb-6 text-dark-gray md:text-5xl">
          {surahData.name}
        </h1>
        <hr className="border-t border-dark-green my-4" />
        <ul className="space-y-8">
          {Object.entries(surahData.verse).map(([key, verse]) => (
            <li key={key} className="text-center">
              <p className="text-3xl font-semibold font-arabic text-dark-gray leading-loose mb-3">
                {verse}
              </p>
              <p className="text-lg italic font-lato text-dark-gray">
                {translationData.verse[key]}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
