"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="bg-light-beige text-dark-gray overflow-hidden">
      <section className="relative flex items-center justify-center h-[50vh] text-center text-white mt-16 mb-12">
        <motion.div
          className="absolute inset-0 w-full h-full z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/img/bg-home.jpg"
            alt="Islam"
            fill
            className="object-cover rounded-lg"
            priority
          />
        </motion.div>
        <div className="relative z-10">
          <motion.h1
            className="text-5xl font-bold font-serif mb-4"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Quran & Hadith
          </motion.h1>
          <motion.p
            className="text-xl font-semibold font-lato"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            In one place
          </motion.p>
        </div>
      </section>

      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mt-12 px-4 space-y-10 md:space-y-0 md:space-x-10">
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Image
            src="/img/quran-manuscript.jpg"
            alt="Quran Manuscript"
            width={500}
            height={500}
            className="rounded-lg shadow-lg pointer-events-none"
          />
        </motion.div>

        <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10">
          {[
            {
              src: "/img/quran.jpg",
              alt: "Quran",
              text: "Embrace the wisdom of the Quran, the word of Allah.",
              link: "/quran",
              btnText: "Read Quran",
            },
            {
              src: "/img/hadith.png",
              alt: "Hadith",
              text: "Seek knowledge from the sayings of the Prophet (PBUH).",
              link: "/hadith",
              btnText: "Read Hadith",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.25, duration: 1 }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={100}
                height={100}
                className="rounded-md shadow-md pointer-events-none"
              />
              <p className="text-lg text-dark-gray">{item.text}</p>
              <Link href={item.link} legacyBehavior>
                <a className="mt-4 px-6 py-3 text-dark-gray font-semibold font-serif hover:text-dark-green rounded-md transition transform hover:scale-105 flex flex-col items-center">
                  {item.btnText}
                  <span className="block w-16 h-1 mt-2 bg-gradient-to-r from-dark-gray via-gray-500 to-dark-gray rounded-full"></span>
                </a>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-20 flex flex-col md:flex-row items-center max-w-6xl mx-auto px-4 space-y-12 md:space-y-0 md:space-x-12">
        <motion.div
          className="md:w-1/2"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-4xl font-bold font-serif mb-6 text-center md:text-left">
            What is Islam?
          </h1>
          {[
            `Islam is a religion of peace, love, and compassion that inspires
            millions around the world. Rooted in the belief in one God, Allah,
            it teaches kindness, justice, and mercy to all living beings. The
            word "Islam" itself means submission to God's will,
            reflecting a way of life that encourages harmony, mutual respect,
            and understanding.`,
            `Through its teachings, Islam calls for love for neighbors, care for
            the less fortunate, and striving for a better, more equitable world.
            It is not just a religion but a source of guidance that enriches
            lives and fosters a deep connection with the Creator and humanity.`,
          ].map((text, index) => (
            <motion.p
              key={index}
              className="text-lg font-lato mb-6 leading-relaxed"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1,
                delay: 0.5 + index * 0.5,
                ease: "easeOut",
              }}
            >
              {text}
            </motion.p>
          ))}
        </motion.div>

        <motion.div
          className="md:w-1/2"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
        >
          <Image
            src="/img/muslim.jpg"
            alt="Muslim"
            width={500}
            height={500}
            className="rounded-lg shadow-lg w-full pointer-events-none"
          />
        </motion.div>
      </div>

      <footer className="relative bg-light-beige text-white py-12 mt-20">
        <motion.div
          className="absolute inset-0 z-0 w-full h-full pointer-events-none"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="rounded-lg absolute inset-0 bg-black opacity-35 z-10"></div>
          <Image
            src="/img/people.jpg"
            alt="People"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg pointer-events-none"
            priority
          />
        </motion.div>
        <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center space-y-6">
          <motion.div
            className="flex justify-center space-x-6 mt-6"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Link
              href="https://github.com/DannielLima/SahihVerse"
              className="text-lg font-extrabold font-serif text-white hover:text-dark-green transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </Link>
            <Link
              href="https://github.com/semarketir/quranjson"
              className="text-lg font-extrabold font-serif text-white hover:text-dark-green transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Quran API
            </Link>
            <Link
              href="/"
              className="text-lg font-extrabold font-serif text-white hover:text-dark-green transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hadith API
            </Link>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
