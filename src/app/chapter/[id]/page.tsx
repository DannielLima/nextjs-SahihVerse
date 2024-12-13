"use client";

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type QuranChapter = {
  name: string;
  transliteration: string;
  type: string;
  total_verses: number;
  verses: Array<{
    id: number;
    text: string;
    transliteration: string;
    translation?: string;
  }>;
};

const fetchChapter = async (chapterId: string) => {
  const response = await fetch(`https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/en/${chapterId}.json`);

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
    return <div>Loading chapter...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-extrabold">{chapter.name}</h1>
      <h2 className="text-xl text-gray-500">{chapter.transliteration}</h2>
      <p>{`Type of revelation: ${chapter.type}`}</p>
      <p>{`Verses: ${chapter.total_verses}`}</p>

      <h3 className="mt-4 text-2xl font-semibold">Verses:</h3>
      <ul className="mt-2">
        {chapter.verses.map((verse) => (
          <li key={verse.id} className="mb-2">
            <p className="text-lg">{verse.text}</p>
            <p className="text-lg"> {verse.transliteration}</p>
            
            {verse.translation && (
              <p className="text-lg">{verse.translation}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuranChapterPage;
