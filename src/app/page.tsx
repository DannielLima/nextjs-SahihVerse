"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {

  return (
    <div className="bg-light-beige text-dark-gray overflow-hidden">
      <section className="text-center text-white mt-16 mb-12 relative h-[calc(50vh)] flex items-center justify-center">
        <motion.div
          className="absolute inset-0 z-0 w-full h-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/img/bg-home.jpg"
            alt="Islam"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
            priority={true}
          />
        </motion.div>

        <div className="relative z-10">
          <motion.h1
            className="text-5xl font-bold font-serif mb-4 leading-tight"
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Quran <br /> & Hadith
          </motion.h1>

          <motion.p
            className="text-xl font-semibold font-lato"
            initial={{ y: -40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            In one place
          </motion.p>
        </div>
      </section>

      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mt-12 space-y-10 md:space-y-0 md:space-x-10 px-4">
        <motion.section
          className="w-full md:w-1/2 flex justify-center"
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Image
            src="/img/quran-manuscript.jpg"
            alt="Quran-Manuscript"
            width={500}
            height={500}
            className="rounded-lg shadow-lg max-w-full pointer-events-none"
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
            <Image
              src="/img/quran.jpg"
              alt="Quran"
              width={100}
              height={100}
              className="shadow-md rounded-md pointer-events-none"
            />
            <p className="text-lg text-dark-gray mt-2">
              Embrace the wisdom of the Quran, the word of Allah.
            </p>
            <Link href="/quran" legacyBehavior>
              <a className="mt-4 px-6 py-3 text-dark-gray font-semibold font-nunito bg-green-200 rounded-md shadow hover:bg-green-200 transition transform hover:scale-105">
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
            <Image
              src="/img/hadith.png"
              alt="Hadith"
              width={125}
              height={125}
              className="rounded-md pointer-events-none"
            />
            <p className="text-lg text-dark-gray mt-2">
              Seek knowledge from the sayings of the Prophet (PBUH).
            </p>
            <Link href="/hadith" legacyBehavior>
              <a className="mt-4 px-6 py-3 text-dark-gray font-semibold font-nunito bg-green-200 rounded-md shadow hover:bg-green-200 transition transform hover:scale-105">
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
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Islam is a religion of peace, love, and compassion that inspires
            millions around the world. Rooted in the belief in one God, Allah,
            it teaches kindness, justice, and mercy to all living beings. The
            word &quot;Islam&quot; itself means submission to God&apos;s will,
            reflecting a way of life that encourages harmony, mutual respect,
            and understanding.
          </motion.p>
          <motion.p
            className="text-lg font-lato leading-relaxed"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
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
          transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Image
            src="/img/muslim.jpg"
            alt="Muslim"
            width={500}
            height={500}
            className="rounded-lg shadow-lg w-full pointer-events-none"
          />
        </motion.section>
      </div>
    </div>
  );
}
