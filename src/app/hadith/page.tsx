"use client";

import React, { useState, useEffect } from "react";

interface Edition {
  name: string;
  mainName: string;
  book: string;
  author: string;
  language: string;
  link: string;
  comments?: string;
}

interface Collection {
  name: string;
  book: string;
  author: string;
  language: string;
  link: string;
  comments?: string;
}

interface EditionEntry {
  name: string;
  collection: Collection[];
}

interface Hadith {
  hadithNumber: string;
  text: string;
}

interface Section {
  [key: string]: string;
}

const HadithPage = () => {
  const [editions, setEditions] = useState<Edition[]>([]);
  const [selectedEdition, setSelectedEdition] = useState<string | null>(null);
  const [hadiths, setHadiths] = useState<Hadith[]>([]);
  const [sections, setSections] = useState<Section | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEditions = async () => {
      try {
        const res = await fetch(
          "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.min.json"
        );
        const data: Record<string, EditionEntry> = await res.json();

        const collections = Object.entries(data).flatMap(([, entry]) =>
          entry.collection.map((collection) => ({
            ...collection,
            mainName: entry.name,
          }))
        );

        const filteredEditions = collections.filter(
          (edition) => edition.language.toLowerCase() === "english"
        );

        setEditions(filteredEditions);
      } catch (error) {
        console.error("Error fetching editions:", error);
      }
    };

    fetchEditions();
  }, []);

  const fetchHadiths = async (editionId: string, sectionNo?: number) => {
    setLoading(true);
    setSelectedEdition(editionId);
    try {
      const sectionPart = sectionNo ? `/sections/${sectionNo}` : "";
      const res = await fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${editionId}${sectionPart}.json`
      );
      const data = await res.json();

      if (data.metadata?.sections) {
        setSections(data.metadata.sections);
      }

      setHadiths(data.hadiths || []);
    } catch (error) {
      console.error("Error fetching hadiths:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold font-serif mb-6 text-center md:text-5xl">
        Hadith Collections
      </h1>

      {!selectedEdition ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {editions.map((edition, index) => (
            <button
              key={`${edition.name}-${index}`}
              onClick={() => fetchHadiths(edition.name)}
              className="bg-light-beige border-2 border-dark-green p-4 rounded-lg shadow-md text-center hover:bg-pastel-green transition-all"
            >
              <p className="text-xl font-semibold">
                {edition.mainName || "Unknown"}
              </p>
            </button>
          ))}
        </div>
      ) : (
        <>
          <button
            onClick={() => setSelectedEdition(null)}
            className="mb-4 px-4 py-2 bg-light-beige border-2 border-dark-green rounded-lg shadow-md hover:bg-pastel-green transition-all"
          >
            Back to Editions
          </button>
          <h2 className="text-2xl font-bold mb-4 text-center">
            {editions.find((edition) => edition.name === selectedEdition)?.mainName || "Unknown"}
          </h2>

          {sections && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              {Object.entries(sections).map(([sectionNo, sectionName]) => (
                <button
                  key={sectionNo}
                  onClick={() => fetchHadiths(selectedEdition!, parseInt(sectionNo))}
                  className="bg-light-beige border-2 border-dark-green p-4 rounded-lg shadow-md text-center hover:bg-pastel-green transition-all"
                >
                  <p className="text-xl font-semibold">{sectionName}</p>
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : (
            <div className="space-y-4">
              {hadiths.map((hadith, index) => (
                <div key={`${hadith.hadithNumber}-${index}`} className="p-6 border rounded-lg">
                  <p className="text-gray-700 leading-relaxed">{hadith.text}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HadithPage;
