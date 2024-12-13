import Link from 'next/link';

export default function Home() {
  const chapters = Array.from({ length: 114 }, (_, i) => i + 1);

  return (
    <div>
      <h1 className="text-4xl font-extrabold mb-6 text-center">Chapters of the Quran</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {chapters.map((chapter) => (
          <Link
            href={`/chapter/${chapter}`}
            key={chapter}
            className="bg-gray-800 p-4 rounded-lg text-center shadow-md hover:bg-gray-700"
          >
            Surah {chapter}
          </Link>
        ))}
      </div>
    </div>
  );
}
