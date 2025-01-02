"use client";

import Loading from "@/components/ui/Loading";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Hadith {
  hadithNumber: string;
  text: string;
}

const fetchHadiths = async (
  id: string,
  sectionId: string
): Promise<Hadith[]> => {
  try {
    const response = await fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${id}/sections/${sectionId}.json`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch hadiths.");
    }

    const data = await response.json();
    return (data.hadiths || []).filter(
      (hadith: Hadith) => hadith.text.trim().length > 0
    );
  } catch (error) {
    console.error("Error fetching hadiths:", error);
    return [];
  }
};

const HadithCard: React.FC<{ hadith: Hadith }> = ({ hadith }) => (
  <div className="p-4 border rounded shadow-sm hover:shadow-md transition-shadow">
    <h2 className="font-semibold text-lg mb-2">{hadith.hadithNumber}</h2>
    <p>{hadith.text}</p>
  </div>
);

const HadithsPage: React.FC = () => {
  const params = useParams();
  const id = params.id as string;
  const sectionId = (params.sectionId as string).replace(/\s+/g, "");
  const [hadiths, setHadiths] = useState<Hadith[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHadiths = async () => {
      setLoading(true);
      setError(null);

      const data = await fetchHadiths(id, sectionId);
      if (data.length === 0) {
        setError("No hadiths found.");
      }
      setHadiths(data);
      setLoading(false);
    };

    loadHadiths();
  }, [id, sectionId]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold font-serif mb-6 text-center md:text-5xl">
        Hadiths
      </h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="space-y-4">
          {hadiths.map((hadith, index) => (
            <HadithCard
              key={`${hadith.hadithNumber}-${index}`}
              hadith={hadith}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HadithsPage;
