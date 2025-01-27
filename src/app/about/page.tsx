"use client";

import Loading from "@/components/ui/Loading";
import React, { useState, useEffect } from "react";

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-8 bg-light-beige text-white rounded-xl">
      <h1 className="text-4xl sm:text-5xl font-bold font-serif text-center text-dark-gray mb-8">
        About SahihVerse
      </h1>

      <p className="text-lg sm:text-xl font-normal font-lato text-dark-gray leading-relaxed mb-6">
        <strong className="font-bold font-lato text-dark-green">
          SahihVerse
        </strong>{" "}
        is a web application dedicated to providing an immersive and
        user-friendly experience for exploring Islamic texts. The app focuses on
        making the Quran and Hadiths accessible, with a clean and intuitive
        interface that offers translations in Arabic and English.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold font-serif text-dark-gray mb-4">
        Key Features:
      </h2>
      <ul className="list-disc pl-6 space-y-4 text-dark-gray">
        <li>
          <strong>Chapters of the Quran:</strong> The app offers easy navigation
          through all the chapters of the Quran, with each Surah displayed in
          Arabic, English. Click on any Surah to explore its verses in detail.
        </li>
        <li>
          <strong>Collection of Hadiths:</strong> A section dedicated to
          Hadiths, with authentic sayings of the Prophet Muhammad (PBUH),
          organized for easy exploration.
        </li>
        <li>
          <strong>Responsive Design:</strong> Fully optimized for mobile and
          desktop devices, ensuring a smooth user experience on any screen size.
        </li>
        <li>
          <strong>Open Source Project:</strong> SahihVerse is an open-source
          project, available for contributions on{" "}
          <a
            href="https://github.com/DannielLima/nextjs-SahihVerse"
            className="text-blue-400 hover:text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </li>
      </ul>

      <h2 className="text-2xl sm:text-3xl font-bold font-serif text-dark-gray mt-6 mb-4">
        Technologies Used:
      </h2>
      <ul className="list-disc pl-6 space-y-4 text-dark-gray">
        <li>
          <strong>Next.js:</strong> A React-based framework for building fast
          and scalable web applications.
        </li>
        <li>
          <strong>Tailwind CSS:</strong> A utility-first CSS framework for fast,
          customizable styling.
        </li>
        <li>
          <strong>TypeScript:</strong> A statically typed superset of JavaScript
          for a better development experience and fewer errors.
        </li>
      </ul>

      <h2 className="text-2xl sm:text-3xl font-bold font-serif text-dark-gray mt-6 mb-4">
        Project Repository:
      </h2>
      <p className="text-lg sm:text-xl font-normal font-lato text-dark-gray leading-relaxed mb-6">
        You can access the source code for this project on GitHub:{" "}
        <a
          href="https://github.com/DannielLima/nextjs-SahihVerse"
          className="text-blue-400 hover:text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          SahihVerse on GitHub
        </a>
        .
      </p>
    </div>
  );
};

export default About;
