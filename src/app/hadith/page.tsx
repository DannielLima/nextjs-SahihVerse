"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Book, Library, Globe, Loader2 } from "lucide-react";

interface Edition {
  name: string;
  mainName: string;
  language: string;
}

const fetchEditions = async (): Promise<Edition[]> => {
  try {
    const response = await fetch(
      "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.min.json",
    );
    if (!response.ok) throw new Error("Failed to fetch editions");

    const data = await response.json();
    return Object.entries(
      data as Record<
        string,
        { name: string; collection: { name: string; language: string }[] }
      >,
    )
      .flatMap(([, entry]) =>
        entry.collection.map((collection) => ({
          ...collection,
          mainName: entry.name,
        })),
      )
      .filter(
        (edition: Edition) => edition.language.toLowerCase() === "english",
      );
  } catch (error) {
    console.error("Error fetching editions:", error);
    return [];
  }
};

const EditionCard: React.FC<{ edition: Edition; index: number }> = ({
  edition,
  index,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
  >
    <Link
      href={`/hadith/${edition.name}`}
      className="group relative flex flex-col justify-between h-full p-8 bg-[#1A1D24] border border-white/5 rounded-[2rem] hover:border-[#00E676]/40 transition-all duration-500 overflow-hidden shadow-xl"
    >
      <div className="absolute -right-4 -bottom-4 text-white/5 group-hover:text-[#00E676]/10 transition-colors">
        <Book size={120} strokeWidth={1} />
      </div>

      <div className="relative z-10">
        <div className="w-12 h-12 flex items-center justify-center bg-[#0F1115] rounded-xl border border-white/5 mb-6 group-hover:scale-110 transition-transform">
          <Library className="w-6 h-6 text-[#00E676]" />
        </div>

        <h2 className="text-2xl font-bold text-white tracking-tight leading-tight group-hover:text-[#00E676] transition-colors">
          {edition.mainName}
        </h2>
      </div>

      <div className="relative z-10 mt-8 flex items-center gap-2 text-xs font-mono text-stone-500 uppercase tracking-widest">
        <Globe className="w-3 h-3" />
        {edition.language} Edition
      </div>
    </Link>
  </motion.div>
);

const HadithPage: React.FC = () => {
  const [editions, setEditions] = useState<Edition[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEditions = async () => {
      const data = await fetchEditions();
      if (data.length === 0) {
        setError("No collections found in the digital archives.");
      } else {
        setEditions(data);
      }
      setIsLoading(false);
    };
    loadEditions();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 min-h-screen">
      <header className="mb-16 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-center md:justify-start gap-3 mb-4"
        >
          <div className="h-1 w-12 bg-[#1DE9B6] rounded-full" />
          <span className="text-[#1DE9B6] font-mono text-xs tracking-[0.3em] uppercase">
            Authentic Wisdom
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold font-serif text-white tracking-tighter"
        >
          Hadith <span className="text-stone-600 italic">Library</span>
        </motion.h1>
      </header>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <Loader2 className="w-10 h-10 text-[#00E676] animate-spin" />
          <p className="text-stone-500 font-mono text-sm animate-pulse">
            Syncing collections...
          </p>
        </div>
      ) : error ? (
        <div className="p-10 bg-red-500/5 border border-red-500/20 rounded-3xl text-center">
          <p className="text-red-400 font-medium">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {editions.map((edition, idx) => (
            <EditionCard key={edition.name} edition={edition} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HadithPage;
