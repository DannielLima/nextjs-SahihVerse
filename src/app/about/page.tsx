import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto p-8 bg-gray-900 text-white rounded-xl shadow-lg">
      <h1 className="text-5xl font-extrabold text-center text-white mb-8">About SahihVerse</h1>

      <p className="text-lg text-gray-300 leading-relaxed mb-6">
        <strong className="font-semibold">SahihVerse</strong> is a web application dedicated to providing an immersive and user-friendly experience for exploring Islamic texts. The app focuses on making the Quran and Hadiths accessible, with a clean and intuitive interface that offers translations in Arabic and English, as well as transliterations of the names of the Surahs.
      </p>

      <h2 className="text-3xl font-semibold text-white mb-4">Key Features:</h2>
      <ul className="list-disc pl-6 space-y-4 text-gray-400">
        <li>
          <strong>Chapters of the Quran:</strong> The app offers easy navigation through all the chapters of the Quran, with each Surah displayed in Arabic, English, and transliteration. Click on any Surah to explore its verses in detail.
        </li>
        <li>
          <strong>Collection of Hadiths:</strong> A section dedicated to Hadiths, with authentic sayings of the Prophet Muhammad (SWT), organized for easy exploration.
        </li>
        <li>
          <strong>Responsive Design:</strong> Fully optimized for mobile and desktop devices, ensuring a smooth user experience on any screen size.
        </li>
        <li>
          <strong>Open Source Project:</strong> SahihVerse is an open-source project, available for contributions on <a href="https://github.com/DannielLima/SahihVerse" className="text-blue-400 hover:text-blue-500 hover:underline">GitHub</a>.
        </li>
      </ul>

      <h2 className="text-3xl font-semibold text-white mt-6 mb-4">Technologies Used:</h2>
      <ul className="list-disc pl-6 space-y-4 text-gray-400">
        <li><strong>Next.js:</strong> A React-based framework for building fast and scalable web applications.</li>
        <li><strong>Tailwind CSS:</strong> A utility-first CSS framework for fast, customizable styling.</li>
        <li><strong>TypeScript:</strong> A statically typed superset of JavaScript for a better development experience and fewer errors.</li>
      </ul>

      <h2 className="text-3xl font-semibold text-white mt-6 mb-4">Project Repository:</h2>
      <p>
        You can access the source code for this project on GitHub: <a href="https://github.com/DannielLima/SahihVerse" className="text-blue-400 hover:text-blue-500 hover:underline">SahihVerse on GitHub</a>.
      </p>
    </div>
  );
};

export default About;
