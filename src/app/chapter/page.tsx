import Link from 'next/link';
import { surahs } from './surahs';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-extrabold mb-6 text-center">Chapters of the Quran</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {surahs.map((surah) => (
          <Link
            href={`/chapter/${surah.number}`}
            key={surah.number}
            className="bg-gray-800 p-4 rounded-lg text-center shadow-md hover:bg-gray-700"
          >
            <div>
              <p className="text-xl font-semibold">{surah.name_en}</p>
              <p className="text-sm text-gray-400 italic">{surah.name_transliteration}</p>
              <p className="text-lg text-gray-300">{surah.name_ar}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
