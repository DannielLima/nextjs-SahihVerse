"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import "../app/styles/globals.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      className="bg-light-beige py-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold font-serif text-dark-gray">
          SahihVerse
        </h1>

        <button
          className="lg:hidden text-dark-gray focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>

        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } lg:flex lg:items-center lg:space-x-4 absolute lg:static top-16 left-0 w-full lg:w-auto bg-light-beige lg:bg-transparent lg:py-0 py-4 shadow-lg lg:shadow-none`}
        >
          <Link href="/" passHref legacyBehavior>
            <a className="block lg:inline-block text-dark-gray font-semibold font-serif py-2 px-4 rounded-full relative group hover:bg-gray-100">
              Home
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-dark-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 hidden lg:block" style={{ height: '1px' }}></span>
            </a>
          </Link>
          <Link href="/quran" passHref legacyBehavior>
            <a className="block lg:inline-block text-dark-gray font-semibold font-serif py-2 px-4 rounded-full relative group hover:bg-gray-100">
              Quran
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-dark-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 hidden lg:block" style={{ height: '1px' }}></span>
            </a>
          </Link>
          <Link href="/about" passHref legacyBehavior>
            <a className="block lg:inline-block text-dark-gray font-semibold font-serif py-2 px-4 rounded-full relative group hover:bg-gray-100">
              About
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-dark-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 hidden lg:block" style={{ height: '1px' }}></span>
            </a>
          </Link>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
