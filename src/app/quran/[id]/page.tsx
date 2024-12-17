import path from "path";
import fs from "fs";
import { FC } from "react";
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

interface QuranSurahPageProps {
  params: {
    id: string;
  };
}

const QuranSurahPage: FC<QuranSurahPageProps> = async ({ params }) => {
  const formattedId = String(parseInt(params.id, 10));

  const surahPath = path.join(
    process.cwd(),
    `src/app/quran/source/surah/surah_${formattedId}.json`
  );
  const translationPath = path.join(
    process.cwd(),
    `src/app/quran/source/translation/en/en_translation_${formattedId}.json`
  );

  const surahData: Surah = JSON.parse(fs.readFileSync(surahPath, "utf8"));
  const translationData: Translation = JSON.parse(
    fs.readFileSync(translationPath, "utf8")
  );

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
};

export default QuranSurahPage;
