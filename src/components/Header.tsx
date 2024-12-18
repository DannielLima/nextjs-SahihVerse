"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import "../app/styles/globals.css";

const Header = () => {
  return (
    <>
      <motion.header
        className="bg-light-beige py-4 w-full z-40 shadow-md"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" passHref legacyBehavior>
            <a className="text-2xl font-bold font-serif text-dark-gray hover:text-dark-green transition-colors">
              SahihVerse
            </a>
          </Link>

          <nav className="flex items-center space-x-2 lg:space-x-4 flex-wrap">
            {[
              { href: "/quran", label: "Quran" },
              { href: "/hadith", label: "Hadith" },
              { href: "/about", label: "About" },
            ].map((link) => (
              <Link href={link.href} key={link.label} passHref legacyBehavior>
                <a className="relative text-xs sm:text-sm text-dark-gray font-semibold font-serif py-1 px-2 hover:text-dark-green transition-colors group">
                  {link.label}
                  <span
                    className="absolute left-0 bottom-0 w-0 h-0.5 bg-dark-green transform transition-all duration-300 group-hover:w-full"
                    style={{ height: "1px" }}
                  ></span>
                </a>
              </Link>
            ))}
          </nav>
        </div>
      </motion.header>
    </>
  );
};

export default Header;
