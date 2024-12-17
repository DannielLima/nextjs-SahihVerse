import Link from "next/link";
import "../app/styles/globals.css";

const Header = () => (
  <header className="bg-light-beige py-4">
    <div className="container mx-auto px-4 flex justify-center items-center">
      <h1 className="text-2xl font-bold font-serif text-dark-gray">SahihVerse</h1>
      <nav className="space-x-4 absolute right-4">
        <Link href="/" passHref>
          <button className="bg-light-blue hover:bg-dark-blue text-white font-semibold font-nunito py-2 px-4 rounded-full">
            Home
          </button>
        </Link>
        <Link href="/quran" passHref>
          <button className="bg-light-blue hover:bg-dark-blue text-white font-semibold py-2 px-4 rounded-full">
            Quran
          </button>
        </Link>
        <Link href="/about" passHref>
          <button className="bg-light-blue hover:bg-dark-blue text-white font-semibold py-2 px-4 rounded-full">
            About
          </button>
        </Link>
      </nav>
    </div>
  </header>
);

export default Header;
