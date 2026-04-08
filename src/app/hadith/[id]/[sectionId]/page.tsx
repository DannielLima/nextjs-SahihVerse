"use client";

import Loading from "@/components/ui/Loading";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote, Hash, Copy, Check } from "lucide-react";

interface Hadith {
  hadithNumber: string;
  text: string;
}

const fetchHadiths = async (
  id: string,
  sectionId: string,
): Promise<Hadith[]> => {
  try {
    const response = await fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${id}/sections/${sectionId}.json`,
    );
    if (!response.ok) throw new Error("Failed to fetch hadiths.");
    const data = await response.json();
    return (data.hadiths || []).filter((h: Hadith) => h.text.trim().length > 0);
  } catch (error) {
    console.error("Error fetching hadiths:", error);
    return [];
  }
};

const HadithCard: React.FC<{ hadith: Hadith; index: number }> = ({
  hadith,
  index,
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hadith.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group relative p-8 bg-[#1A1D24] border border-white/5 rounded-[2.5rem] hover:border-[#00E676]/30 transition-all duration-500"
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex md:flex-col items-center justify-between md:justify-start gap-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#0F1115] border border-white/10 text-[#00E676] font-mono font-bold shadow-inner">
            {hadith.hadithNumber}
          </div>

          <button
            onClick={copyToClipboard}
            className="p-3 rounded-xl bg-white/5 text-stone-500 hover:text-[#00E676] hover:bg-[#00E676]/10 transition-all"
            title="Copy Hadith"
          >
            {copied ? (
              <Check className="w-5 h-5" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>
        </div>
        <div className="flex-1">
          <Quote className="w-8 h-8 text-white/5 mb-4 group-hover:text-[#00E676]/20 transition-colors" />
          <p className="text-xl md:text-2xl text-stone-200 font-light leading-relaxed tracking-wide selection:bg-[#00E676]/30">
            {hadith.text}
          </p>
          <div className="mt-8 h-px w-20 bg-gradient-to-r from-[#00E676]/50 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
};

const HadithsPage: React.FC = () => {
  const params = useParams();
  const id = params.id as string;
  const sectionId = ((params.sectionId as string) || "").replace(/\s+/g, "");

  const [hadiths, setHadiths] = useState<Hadith[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHadiths = async () => {
      setLoading(true);
      const data = await fetchHadiths(id, sectionId);
      if (data.length === 0) setError("Narrations not found in this register.");
      setHadiths(data);
      setLoading(false);
    };
    loadHadiths();
  }, [id, sectionId]);

  return (
    <div className="max-w-4xl mx-auto px-6 pt-32 pb-20 min-h-screen">
      <header className="mb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-stone-500 font-mono text-xs mb-4 uppercase tracking-[0.3em]"
        >
          <Hash className="w-4 h-4 text-[#00E676]" />
          <span>Register: {id.replace(/_/g, " ")}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold font-serif text-white tracking-tighter"
        >
          Sacred <span className="text-stone-500 italic">Narrations</span>
        </motion.h1>
      </header>
      {loading ? (
        <div className="py-20 flex justify-center">
          <Loading />
        </div>
      ) : error ? (
        <div className="p-8 bg-red-500/5 border border-red-500/10 rounded-3xl text-red-400 text-center">
          {error}
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {hadiths.map((hadith, index) => (
            <HadithCard
              key={`${hadith.hadithNumber}-${index}`}
              hadith={hadith}
              index={index}
            />
          ))}
        </div>
      )}
      {!loading && !error && (
        <footer className="mt-20 pt-12 border-t border-white/5 text-center">
          <p className="text-stone-600 font-mono text-xs uppercase tracking-widest">
            End of Section {sectionId}
          </p>
        </footer>
      )}
    </div>
  );
};

export default HadithsPage;
