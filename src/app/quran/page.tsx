"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, MapPin, Hash } from "lucide-react";
import surahsData from "./source/surah.json";

interface Surah {
  place: string;
  type: string;
  count: number;
  title: string;
  titleAr: string;
  index: string;
  pages: string;
}

const surahs: Surah[] = surahsData as Surah[];

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[-_]/g, " ")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export default function QuranHome() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSurahs = surahs.filter(
    (surah) =>
      normalizeText(surah.title).includes(normalizeText(searchQuery)) ||
      normalizeText(surah.titleAr).includes(normalizeText(searchQuery)) ||
      surah.index.includes(searchQuery),
  );

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
      <header className="mb-12 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-center md:justify-start gap-3 mb-4"
        >
          <div className="h-1 w-12 bg-[#00E676] rounded-full" />
          <span className="text-[#00E676] font-mono text-sm tracking-widest uppercase">
            The Noble Scroll
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold font-serif text-white tracking-tighter"
        >
          Holy <span className="text-stone-500 italic">Quran</span>
        </motion.h1>
      </header>
      <div className="relative max-w-2xl mx-auto md:mx-0 mb-16">
        <div className="absolute inset-0 bg-[#00E676]/5 blur-xl rounded-full" />
        <div className="relative flex items-center">
          <Search className="absolute left-5 text-stone-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by title, number or Arabic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-5 bg-[#1A1D24]/80 border border-white/10 rounded-2xl text-white placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-[#00E676]/50 focus:border-[#00E676]/50 transition-all backdrop-blur-md shadow-2xl"
          />
        </div>
      </div>
      <AnimatePresence mode="popLayout">
        {filteredSurahs.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-stone-500 text-xl py-20 bg-[#1A1D24]/30 rounded-3xl border border-dashed border-white/10"
          >
            No cosmic match found for "{searchQuery}"
          </motion.p>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredSurahs.map((surah, idx) => (
              <motion.div
                key={surah.index}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: idx * 0.02 }}
              >
                <Link
                  href={`/quran/${surah.index}`}
                  className="group relative block p-6 bg-[#1A1D24] border border-white/5 rounded-[2rem] hover:border-[#00E676]/40 transition-all duration-500 overflow-hidden shadow-lg hover:shadow-[#00E676]/5"
                >
                  <span className="absolute -right-2 -top-2 text-8xl font-bold text-white/5 group-hover:text-[#00E676]/10 transition-colors pointer-events-none">
                    {surah.index}
                  </span>
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-[#0F1115] rounded-xl border border-white/5 group-hover:scale-110 transition-transform duration-500">
                        <BookOpen className="w-6 h-6 text-[#00E676]" />
                      </div>
                      <span className="text-2xl font-serif text-stone-400 group-hover:text-white transition-colors">
                        {surah.titleAr}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:translate-x-1 transition-transform">
                      {surah.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5 text-xs text-stone-500 uppercase tracking-widest font-mono">
                      <span className="flex items-center gap-1">
                        <Hash className="w-3 h-3" /> {surah.count} Verses
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {surah.place}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
