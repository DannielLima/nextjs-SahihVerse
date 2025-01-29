"use client";

import Link from "next/link";
import { useState } from "react";
import surahsData from "./source/surah.json";

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

const surahs: Surah[] = surahsData as Surah[];

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[-_]/g, " ")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSurahs = surahs.filter(
    (surah) =>
      normalizeText(surah.title).includes(normalizeText(searchQuery)) ||
      normalizeText(surah.titleAr).includes(normalizeText(searchQuery))
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold font-serif mb-6 text-center md:text-5xl">
        Quran
      </h1>
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search Surah"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-400 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 text-lg text-gray-700"
          aria-label="Search for a Surah"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute right-4 top-3 text-gray-500 w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35m2.6-5.4a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      {filteredSurahs.length === 0 ? (
        <p className="text-center text-gray-600 text-xl" aria-live="polite">
          No results found.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {filteredSurahs.map((surah) => (
            <Link
              href={`/quran/${surah.index}`}
              key={surah.index}
              className="bg-light-beige border-2 border-dark-green p-4 rounded-lg text-center shadow-md hover:bg-pastel-green transition-all transform hover:scale-105"
            >
              <div>
                <p className="text-xl font-semibold text-dark-gray mb-2">
                  {surah.title}
                </p>
                <p className="text-lg text-gray-600 font-serif">
                  {surah.titleAr}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
