"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Edition {
  name: string;
  mainName: string;
  language: string;
}

const fetchEditions = async (): Promise<Edition[]> => {
  try {
    const response = await fetch(
      "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.min.json"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch editions");
    }

    const data = await response.json();
    return Object.entries(
      data as Record<
        string,
        { name: string; collection: { name: string; language: string }[] }
      >
    )
      .flatMap(([, entry]) =>
        entry.collection.map((collection) => ({
          ...collection,
          mainName: entry.name,
        }))
      )
      .filter(
        (edition: Edition) => edition.language.toLowerCase() === "english"
      );
  } catch (error) {
    console.error("Error fetching editions:", error);
    return [];
  }
};

const EditionCard: React.FC<{ edition: Edition }> = ({ edition }) => (
  <Link
    href={`/hadith/${edition.name}`}
    key={edition.name}
    className="bg-light-beige border-2 border-dark-green p-6 rounded-lg text-center shadow-lg hover:bg-pastel-green transition-transform transform"
  >
    <h2 className="font-semibold text-lg">{edition.mainName}</h2>
  </Link>
);

const HadithPage: React.FC = () => {
  const [editions, setEditions] = useState<Edition[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEditions = async () => {
      setIsLoading(true);
      const data = await fetchEditions();

      if (data.length === 0) {
        setError("No editions available.");
      } else {
        setEditions(data);
        setError(null);
      }

      setIsLoading(false);
    };

    loadEditions();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold font-serif mb-6 text-center md:text-5xl">
        Books
      </h1>
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {editions.map((edition) => (
            <EditionCard key={edition.name} edition={edition} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HadithPage;
