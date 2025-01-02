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
  const res = await fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${id}/sections/${sectionId}.json`
  );
  const data = await res.json();
  return (data.hadiths || []).filter(
    (hadith: Hadith) => hadith.text.trim().length > 0
  );
};

const HadithsPage = () => {
  const params = useParams();
  const id = params.id as string;
  const sectionId = (params.sectionId as string).replace(/\s+/g, "");
  const [hadiths, setHadiths] = useState<Hadith[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHadiths = async () => {
      const delay = setTimeout(() => {
        setLoading(true);
      }, 1000);

      const data = await fetchHadiths(id, sectionId);
      setHadiths(data);
      clearTimeout(delay);
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
      ) : hadiths.length > 0 ? (
        <div className="space-y-4">
          {hadiths.map((hadith, index) => (
            <div
              key={`${hadith.hadithNumber}-${index}`}
              className="p-4 border rounded"
            >
              <h2 className="font-semibold">{hadith.hadithNumber}</h2>
              <p>{hadith.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No hadiths found.</p>
      )}
    </div>
  );
};

export default HadithsPage;
