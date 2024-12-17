import Link from "next/link";
import path from "path";
import fs from "fs";

interface Surah {
  place: string;
  type: string;
  count: number;
  title: string;
  titleAr: string;
  index: string;
  pages: string;
  juz: {
    index: string;
    verse: {
      start: string;
      end: string;
    };
  }[];
}

async function getSurahs(): Promise<Surah[]> {
  const filePath = path.join(process.cwd(), "src/app/quran/source/surah.json");
  const fileContents = await fs.promises.readFile(filePath, "utf8");
  return JSON.parse(fileContents);
}

export default async function Home() {
  const surahs = await getSurahs();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold font-serif mb-6 text-center md:text-5xl">
        Quran
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {surahs.map((surah) => (
          <Link
            href={`/quran/${surah.index}`}
            key={surah.index}
            className="bg-light-beige border-4 border-dark-green p-4 rounded-lg text-center shadow-md hover:bg-pastel-green transition-all"
          >
            <div>
              <p className="text-xl font-semibold text-dark-gray">
                {surah.title}
              </p>
              <p className="text-lg text-dark-gray font-serif">{surah.titleAr}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
