import Link from "next/link";

const Header = () => (
  <header className="bg-gray-800 py-4">
    <div className="container mx-auto px-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">SahihVerse</h1>
      <nav className="space-x-4">
        <Link href="/" className="text-white hover:text-gray-300">
          Home
        </Link>
        <Link href="/quran" className="text-white hover:text-gray-300">
          Quran
        </Link>
        <Link href="/about" className="text-white hover:text-gray-300">
          About
        </Link>
      </nav>
    </div>
  </header>
);

export default Header;
