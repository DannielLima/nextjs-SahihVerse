"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Book } from "lucide-react";

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
  const [error, setError] = useState<string | null>(null);

  const cleanHadithText = (text: string): string => {
    const cleanedText = text.replace(/\*\*[^a-zA-Z0-9]*\*\*/g, "").trim();
    return cleanedText.replace(/\n\s*\n/g, "\n").trim();
  };

  const isValidHadith = (text: string): boolean => {
    const cleaned = cleanHadithText(text);
    return (
      cleaned.length > 0 &&
      !/^hadith\s*$/i.test(cleaned) &&
      !/^\s*\*\*\s*hadith\s*\*\*\s*$/i.test(cleaned) &&
      cleaned !== "**" &&
      cleaned !== "*****"
    );
  };

  useEffect(() => {
    fetchEditions();
  }, []);

  const fetchEditions = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.min.json"
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

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
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch editions";
      setError(errorMessage);
      console.error("Error fetching editions:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHadiths = async (editionId: string, sectionNo?: number) => {
    try {
      setLoading(true);
      setError(null);
      setSelectedEdition(editionId);

      const sectionPart = sectionNo ? `/sections/${sectionNo}` : "";
      const res = await fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${editionId}${sectionPart}.json`
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.metadata?.sections) {
        setSections(data.metadata.sections);
      }

      const cleanedHadiths = (data.hadiths || [])
        .filter((hadith: Hadith) => isValidHadith(hadith.text))
        .map((hadith: Hadith) => ({
          ...hadith,
          text: cleanHadithText(hadith.text),
        }));

      setHadiths(cleanedHadiths);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch hadiths";
      setError(errorMessage);
      console.error("Error fetching hadiths:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setSelectedEdition(null);
    setSections(null);
    setHadiths([]);
    setError(null);
  };

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <Card className="max-w-lg mx-auto">
          <CardContent className="pt-6">
            <div className="text-red-600 mb-4">
              <p>{error}</p>
            </div>
            <Button
              onClick={selectedEdition ? handleBack : fetchEditions}
              variant="secondary"
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold font-serif mb-6 text-center md:text-5xl">
          Hadith
        </h1>
      </div>

      {!selectedEdition ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-40 rounded-xl" />
              ))
            : editions.map((edition, index) => (
                <Card
                  onClick={() => fetchHadiths(edition.name)}
                  key={`${edition.name}-${index}`}
                  className="bg-light-beige hover:shadow-lg transition-shadow duration-300 border-2 border-dark-green rounded-lg cursor-pointer"
                >
                  <CardHeader className="p-4">
                    <CardTitle className="flex items-center gap-2">
                      <Book className="h-5 w-5 text-green-600" />
                      <span className="text-lg font-semibold text-gray-800">
                        {edition.mainName || "Unknown"}
                      </span>
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8 relative">
            <Button
              onClick={handleBack}
              variant="outline"
              className="bg-dark-green hover:bg-dark-gray absolute left-0"
            >
              Back
            </Button>
            <h2 className="text-2xl font-bold text-gray-800 text-center w-full">
              {editions.find((edition) => edition.name === selectedEdition)
                ?.mainName || "Unknown"}
            </h2>
          </div>

          {sections && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                Books
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(sections).map(([sectionNo, sectionName]) => (
                  <Button
                    key={sectionNo}
                    onClick={() =>
                      fetchHadiths(selectedEdition, parseInt(sectionNo))
                    }
                    variant="outline"
                    className="h-auto py-3 px-4 text-left justify-start font-semibold border border-gray-300 rounded-md bg-light-beige text-gray-800 hover:bg-dark-green hover:text-white transition-colors duration-200"
                  >
                    <span className="text-green-600 font-medium mr-2">
                      {sectionNo}.
                    </span>
                    {sectionName}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {loading ? (
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-40 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {hadiths.map((hadith, index) => (
                <Card
                  key={`${hadith.hadithNumber}-${index}`}
                  className="overflow-hidden shadow-lg"
                >
                  <CardHeader className="bg-dark-green text-white p-4">
                    <CardTitle className="text-xl font-semibold">
                      Hadith {hadith.hadithNumber}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 bg-light-beige">
                    <p className="text-dark-gray leading-relaxed text-lg">
                      {hadith.text}
                    </p>
                  </CardContent>
                </Card>
              ))}
              {hadiths.length === 0 && !loading && (
                <div className="text-center text-gray-600 py-8">
                  No hadiths found in this section
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HadithPage;
