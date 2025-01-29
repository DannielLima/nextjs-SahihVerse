"use client";

import Loading from "@/components/ui/Loading";
import React, { useState, useEffect } from "react";

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-8 bg-light-beige text-white rounded-xl">
      <h1 className="text-5xl font-bold font-serif text-center text-dark-gray mb-10">
        About SahihVerse
      </h1>

      <p className="text-lg sm:text-xl font-light font-lato text-dark-gray leading-relaxed mb-8">
        <strong className="font-semibold text-dark-green">SahihVerse</strong> is
        a web application dedicated to providing an immersive and user-friendly
        experience for exploring Islamic texts. The app focuses on making the
        Quran and Hadiths accessible, with a clean and intuitive interface that
        offers translations in Arabic and English.
      </p>

      <h2 className="text-3xl font-bold font-serif text-dark-gray mb-6">
        Key Features:
      </h2>
      <ul className="list-disc pl-6 space-y-4 text-dark-gray text-lg">
        <li>
          <strong>Chapters of the Quran:</strong> Easily navigate all Surahs,
          available in Arabic and English.
        </li>
        <li>
          <strong>Collection of Hadiths:</strong> Explore authentic sayings of
          Prophet Muhammad (PBUH), categorized for easy access.
        </li>
        <li>
          <strong>Responsive Design:</strong> Optimized for mobile and desktop,
          ensuring a seamless experience.
        </li>
        <li>
          <strong>Open Source Project:</strong> Contribute on{" "}
          <a
            href="https://github.com/DannielLima/nextjs-SahihVerse"
            className="text-blue-500 hover:text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </li>
      </ul>

      <h2 className="text-3xl font-bold font-serif text-dark-gray mt-8 mb-6">
        Technologies Used:
      </h2>
      <ul className="list-disc pl-6 space-y-4 text-dark-gray text-lg">
        <li>
          <strong>Next.js:</strong> Fast and scalable React-based framework.
        </li>
        <li>
          <strong>Tailwind CSS:</strong> Utility-first styling for quick
          customization.
        </li>
        <li>
          <strong>TypeScript:</strong> Ensures better development experience and
          fewer errors.
        </li>
      </ul>

      <h2 className="text-3xl font-bold font-serif text-dark-gray mt-8 mb-6">
        Project Repository:
      </h2>
      <p className="text-lg font-light text-dark-gray leading-relaxed">
        Access the source code on GitHub:{" "}
        <a
          href="https://github.com/DannielLima/nextjs-SahihVerse"
          className="text-blue-500 hover:text-blue-600 underline"
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
