import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-extrabold mb-6 text-center">Welcome to the Quran App</h1>
      <p className="text-center text-lg mb-8">
        Explore the chapters of the Quran by clicking the button below.
      </p>
      <div className="flex justify-center">
        <Link
          href="/chapter"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          View Chapters
        </Link>
      </div>
    </div>
  );
}
