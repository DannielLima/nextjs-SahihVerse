"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Edition {
  name: string;
  mainName: string;
  language: string;
}

const fetchEditions = async (): Promise<Edition[]> => {
  const res = await fetch(
    "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.min.json"
  );
  const data = await res.json();
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
    .filter((edition: Edition) => edition.language.toLowerCase() === "english");
};

const HadithPage = () => {
  const [editions, setEditions] = useState<Edition[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadEditions = async () => {
      setLoading(true);
      const data = await fetchEditions();
      setEditions(data);
      setLoading(false);
    };
    loadEditions();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold font-serif mb-6 text-center md:text-5xl">
        Books
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {editions.map((edition) => (
            <Link
              href={`/hadith/${edition.name}`}
              key={edition.name}
              className="bg-light-beige border-2 border-dark-green p-6 rounded-lg text-center shadow-lg hover:bg-pastel-green transition-transform transform"
            >
              <h2 className="font-semibold text-lg">{edition.mainName}</h2>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HadithPage;
