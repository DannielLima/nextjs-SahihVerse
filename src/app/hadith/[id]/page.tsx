"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Section {
  [key: string]: string;
}

const fetchSections = async (id: string): Promise<Section | null> => {
  const res = await fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${id}.json`
  );
  const data = await res.json();
  return data.metadata?.sections || null;
};

const SectionsPage = () => {
  const params = useParams();
  const id = (params.id as string).replace(/\s+/g, "");
  const [sections, setSections] = useState<Section | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSections = async () => {
      setLoading(true);
      const data = await fetchSections(id);
      setSections(data);
      setLoading(false);
    };
    loadSections();
  }, [id]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold font-serif mb-6 text-center md:text-5xl">Sections</h1>
      {loading ? (
        <p>Loading...</p>
      ) : sections ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(sections)
            .filter(([, sectionName]) => sectionName.trim() !== "")
            .map(([sectionId, sectionName]) => (
              <Link
                href={`/hadith/${id}/${sectionId.replace(/\s+/g, "")}`}
                key={sectionId}
                className="bg-light-beige border-2 border-dark-green p-6 rounded-lg text-center shadow-lg hover:bg-pastel-green transition-transform transform"
              >
                <h2>{sectionName}</h2>
              </Link>
            ))}
        </div>
      ) : (
        <p>No sections found.</p>
      )}
    </div>
  );
};

export default SectionsPage;
