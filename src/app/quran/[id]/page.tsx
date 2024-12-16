import fs from "fs";
import path from "path";

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

const QuranSurahPage = ({ params }: { params: { id: string } }) => {
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
    <div className="min-h-screen text-gray-100 p-6">
      <div className="max-w-4xl mx-auto p-8 bg-[#2d3748] shadow-lg rounded-lg border border-gray-600">
        <h1 className="text-4xl font-serif text-center mb-6 text-gray-100 md:text-5xl">
          {surahData.name}
        </h1>
        <hr className="border-t border-gray-600 my-4" />
        <ul className="space-y-8">
          {Object.entries(surahData.verse).map(([key, verse]) => (
            <li key={key} className="text-center">
              <p className="text-3xl font-semibold font-arabic text-gray-100 leading-loose mb-3">
                {verse}
              </p>
              <p className="text-lg italic text-gray-300">
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
