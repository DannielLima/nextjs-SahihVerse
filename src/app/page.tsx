"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="bg-light-beige text-dark-gray">
      <section className="text-center mt-16 mb-12">
        <motion.h1
          className="text-5xl font-bold font-serif mb-4 leading-tight relative"
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Quran <br /> & Hadith
        </motion.h1>

        <motion.p
          className="text-xl font-lato"
          initial={{ y: -40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          In one place
        </motion.p>
      </section>

      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mt-12 space-y-10 md:space-y-0 md:space-x-10 px-4">
        <motion.section
          className="w-full md:w-1/2 flex justify-center"
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <img
            src="/img/mosque.png"
            alt="Mosque"
            className="rounded-lg shadow-lg max-w-full"
          />
        </motion.section>

        <div className="w-full md:w-1/2 flex flex-col md:flex-row items-center justify-center md:justify-evenly space-y-8 md:space-y-0">
          <motion.section
            className="flex flex-col items-center text-center space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="bg-emerald-300 p-4 rounded-full flex items-center justify-center shadow-md">
              <p className="w-32 h-32 text-white font-arabic flex items-center justify-center text-2xl">
                قُرْءان
              </p>
            </div>
            <Link href="/quran" legacyBehavior>
              <a className="mt-2 px-6 py-3 text-dark-gray font-semibold font-nunito bg-emerald-200 rounded-md shadow hover:bg-emerald-300 transition">
                Read Quran
              </a>
            </Link>
          </motion.section>

          <motion.section
            className="flex flex-col items-center text-center space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="bg-rose-300 p-4 rounded-full flex items-center justify-center shadow-md">
              <p className="w-32 h-32 text-white font-arabic flex items-center justify-center text-2xl">
                مُحَمَّد
              </p>
            </div>
            <Link href="/hadith" legacyBehavior>
              <a className="mt-2 px-6 py-3 text-dark-gray font-semibold font-nunito bg-rose-200 rounded-md shadow hover:bg-rose-300 transition">
                Read Hadith
              </a>
            </Link>
          </motion.section>
        </div>
      </div>

      <div className="mt-20 flex flex-col md:flex-row items-center max-w-6xl mx-auto px-4 space-y-12 md:space-y-0 md:space-x-12">
        <motion.section
          className="md:w-1/2"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl font-bold font-serif mb-6 leading-snug text-center md:text-left">
            What is Islam?
          </h1>
          <motion.p
            className="text-lg font-lato mb-6 leading-relaxed"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Islam is a religion of peace, love, and compassion that inspires
            millions around the world. Rooted in the belief in one God, Allah,
            it teaches kindness, justice, and mercy to all living beings. The
            word "Islam" itself means submission to God's will, reflecting a way
            of life that encourages harmony, mutual respect, and understanding.
          </motion.p>
          <motion.p
            className="text-lg font-lato leading-relaxed"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Through its teachings, Islam calls for love for neighbors, care for
            the less fortunate, and striving for a better, more equitable world.
            It is not just a religion but a source of guidance that enriches
            lives and fosters a deep connection with the Creator and humanity.
          </motion.p>
        </motion.section>

        <motion.section
          className="md:w-1/2"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <img
            src="/img/muslim.png"
            alt="Muslim"
            className="rounded-lg shadow-lg w-full"
          />
        </motion.section>
      </div>
    </div>
  );
}
