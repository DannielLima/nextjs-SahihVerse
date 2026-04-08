"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, LayoutGrid, Info } from "lucide-react";
import Loading from "@/components/ui/Loading";

interface Section {
  [key: string]: string;
}

const fetchSections = async (editionId: string): Promise<Section> => {
  try {
    const response = await fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${editionId}.json`,
    );
    if (!response.ok) throw new Error("Failed to fetch sections");
    const data = await response.json();
    return data.metadata?.sections || {};
  } catch (error) {
    console.error("Error fetching sections:", error);
    return {};
  }
};

const SectionCard: React.FC<{
  sectionId: string;
  sectionName: string;
  editionId: string;
  index: number;
}> = ({ sectionId, sectionName, editionId, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.03 }}
  >
    <Link
      href={`/hadith/${editionId}/${sectionId.replace(/\s+/g, "")}`}
      className="group flex items-center justify-between p-5 bg-[#1A1D24] border border-white/5 rounded-2xl hover:border-[#00E676]/40 hover:bg-[#1f232b] transition-all duration-300 shadow-lg"
    >
      <div className="flex items-center gap-5">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-[#0F1115] border border-white/10 text-[#00E676] font-mono text-sm font-bold group-hover:bg-[#00E676] group-hover:text-[#0F1115] transition-colors duration-300">
          {sectionId}
        </div>
        <h2 className="text-stone-200 font-medium group-hover:text-white transition-colors leading-tight">
          {sectionName}
        </h2>
      </div>
      <ChevronRight className="w-5 h-5 text-stone-600 group-hover:text-[#00E676] group-hover:translate-x-1 transition-all" />
    </Link>
  </motion.div>
);

const SectionsPage: React.FC = () => {
  const { id } = useParams();
  const editionId = (Array.isArray(id) ? id[0] : id) || "";
  const [sections, setSections] = useState<Section | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!editionId) {
      setError("Invalid edition ID");
      setIsLoading(false);
      return;
    }

    const loadSections = async () => {
      const cleanedId = editionId.replace(/\s+/g, "");
      const fetchedSections = await fetchSections(cleanedId);

      if (Object.keys(fetchedSections).length === 0) {
        setError("No sections found in this collection.");
      } else {
        setSections(fetchedSections);
      }
      setIsLoading(false);
    };

    loadSections();
  }, [editionId]);

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-20 min-h-screen">
      <header className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-[#00E676] font-mono text-xs mb-4"
        >
          <LayoutGrid className="w-4 h-4" /> {/* <--- Aqui o nome correto */}
          <span className="uppercase tracking-[0.2em]">
            Collection Structure
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold font-serif text-white tracking-tighter"
        >
          Explore <span className="text-stone-500 italic">Sections</span>
        </motion.h1>
        <p className="mt-4 text-stone-400 font-light max-w-xl">
          Detailed chapters for{" "}
          <span className="text-white font-medium">
            {editionId.replace(/_/g, " ")}
          </span>
          . Select a topic to view authentic narrations.
        </p>
      </header>
      {error ? (
        <div className="flex items-center gap-3 p-6 bg-red-500/5 border border-red-500/20 rounded-3xl text-red-400">
          <Info className="w-5 h-5" />
          <p>{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
          {sections &&
            Object.entries(sections)
              .filter(([, sectionName]) => sectionName.trim() !== "")
              .map(([sectionId, sectionName], idx) => (
                <SectionCard
                  key={sectionId}
                  index={idx}
                  sectionId={sectionId}
                  sectionName={sectionName}
                  editionId={editionId.replace(/\s+/g, "")}
                />
              ))}
        </div>
      )}
    </div>
  );
};

export default SectionsPage;
