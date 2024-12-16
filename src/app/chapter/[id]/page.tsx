"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type QuranChapter = {
  name: string;
  transliteration: string;
  total_verses: number;
  verses: Array<{
    id: number;
    text: string;
    transliteration: string;
    translation?: string;
  }>;
};

const fetchChapter = async (chapterId: string) => {
  const response = await fetch(
    `https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/en/${chapterId}.json`
  );

  if (!response.ok) {
    console.error("Error loading chapter:", response.statusText);
    return null;
  }

  const chapterData = await response.json();
  return chapterData;
};

const QuranChapterPage = () => {
  const { id } = useParams();
  const [chapter, setChapter] = useState<QuranChapter | null>(null);

  useEffect(() => {
    const loadChapter = async () => {
      const chapterId = Array.isArray(id) ? id[0] : id;
      if (chapterId) {
        const chapterData = await fetchChapter(chapterId);
        if (chapterData) {
          setChapter(chapterData);
        }
      }
    };

    loadChapter();
  }, [id]);

  if (!chapter) {
    return <div className="text-center text-gray-400 mt-10">Loading chapter...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 p-6">
      <header className="text-center border-b border-gray-700 pb-6 mb-10">
        <h1 className="text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300 mb-3"
          style={{
            textShadow: "0 0 10px rgba(255, 255, 255, 0.4), 0 0 20px rgba(255, 255, 255, 0.2), 0 0 30px rgba(255, 255, 255, 0.0)"
          }}
        >
          {chapter.name}
        </h1>
        <h2 className="text-xl text-gray-400 italic">{chapter.transliteration}</h2>
        <p className="text-sm text-gray-500">{`Total Verses: ${chapter.total_verses}`}</p>
      </header>

      <section>
        <h3 className="text-2xl font-semibold text-yellow-300 mb-8 text-center">Verses</h3>
        <ul className="space-y-8">
          {chapter.verses.map((verse) => (
            <li
              key={verse.id}
              className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 hover:border-yellow-400 transition-all"
            >
              <div className="text-right mb-4">
                <p className="text-2xl font-serif font-medium text-yellow-300 leading-relaxed">
                  {verse.text}
                </p>
              </div>
              <div className="text-right text-gray-400 mt-2">
                <p className="italic">{verse.transliteration}</p>
                {verse.translation && (
                  <p className="mt-2 text-gray-300">{verse.translation}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default QuranChapterPage;
