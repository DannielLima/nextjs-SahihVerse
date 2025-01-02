"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Loading from "@/components/ui/Loading";

interface Section {
  [key: string]: string;
}

const fetchSections = async (editionId: string): Promise<Section> => {
  try {
    const response = await fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${editionId}.json`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch sections");
    }

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
}> = ({ sectionId, sectionName, editionId }) => (
  <Link
    href={`/hadith/${editionId}/${sectionId.replace(/\s+/g, "")}`}
    key={sectionId}
    className="bg-light-beige border-2 border-dark-green p-6 rounded-lg text-center shadow-lg hover:bg-pastel-green transition-transform transform"
  >
    <h2>{sectionName}</h2>
  </Link>
);

const SectionsPage: React.FC = () => {
  const { id } = useParams();
  const editionId = Array.isArray(id) ? id[0] : id;
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
      setIsLoading(true);
      const cleanedId = editionId.replace(/\s+/g, "");
      const fetchedSections = await fetchSections(cleanedId);

      if (Object.keys(fetchedSections).length === 0) {
        setError("No sections found.");
      } else {
        setSections(fetchedSections);
      }

      setIsLoading(false);
    };

    loadSections();
  }, [editionId]);

  if (isLoading) return <Loading />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold font-serif mb-6 text-center md:text-5xl">
        Sections
      </h1>
      {sections && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(sections)
            .filter(([, sectionName]) => sectionName.trim() !== "")
            .map(([sectionId, sectionName]) => (
              <SectionCard
                key={sectionId}
                sectionId={sectionId}
                sectionName={sectionName}
                editionId={(editionId ?? "").replace(/\s+/g, "")}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default SectionsPage;
