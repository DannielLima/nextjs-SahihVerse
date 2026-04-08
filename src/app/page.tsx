"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, BookOpenText, Zap, Sparkles } from "lucide-react"; // Opcional, mas recomendado

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const WowButton = ({
  children,
  href = "#",
}: {
  children: React.ReactNode;
  href?: string;
}) => (
  <Link
    href={href}
    className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-0.5 font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95"
  >
    <span className="absolute inset-0 bg-gradient-to-br from-[#00E676] to-[#1DE9B6] opacity-100 group-hover:from-[#1DE9B6] group-hover:to-[#00E676]"></span>
    <span className="relative flex items-center gap-2 rounded-full bg-[#0F1115] px-8 py-3 transition-all duration-300 group-hover:bg-opacity-0">
      {children}
      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
    </span>
  </Link>
);

export default function Home() {
  return (
    <div className="bg-[#0F1115] text-[#F3F4F6] selection:bg-[#00E676]/20 overflow-x-hidden font-sans">
      <section className="relative min-h-[85vh] flex items-center justify-center text-center px-4 pt-16">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#00E676]/10 rounded-full blur-[120px]" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[#1DE9B6]/10 rounded-full blur-[120px]" />
          <motion.div
            className="absolute inset-0 w-full h-full opacity-10 mix-blend-overlay grayscale"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 2 }}
          >
            <Image
              src="/img/bg-home.jpg"
              alt="Islam Mesh"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
        <motion.div
          className="relative z-10 max-w-5xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-[#1A1D24] border border-[#2D3139] shadow-inner"
          >
            <Sparkles className="w-4 h-4 text-[#00E676]" />
            <span className="text-xs font-mono font-medium tracking-widest text-[#A1A7B3] uppercase">
              The Divine Digital Hub
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-extrabold font-serif leading-[1.1] text-white tracking-tighter mb-8"
          >
            All Divine Knowledge, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E676] to-[#1DE9B6]">
              Instantly Accessible.
            </span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-[#A1A7B3] font-light max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Your centralized, high-performance platform for the Holy Quran and
            authentic Hadith. Experience spiritual depth with a seamless, modern
            interface.
          </motion.p>
          <motion.div variants={itemVariants}>
            <WowButton href="/quran">Explore the Platform</WowButton>
          </motion.div>
        </motion.div>
      </section>
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        <motion.div
          className="grid md:grid-cols-2 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {[
            {
              src: "/img/quran.jpg",
              title: "Digital Quran Core",
              text: "Explore the complete Quran with a seamless reader, optimized for spiritual flow and search.",
              link: "/quran",
              icon: <BookOpenText className="w-10 h-10 text-[#00E676]" />,
            },
            {
              src: "/img/hadith.png",
              title: "Hadith Engine",
              text: "Search and verify authentic Hadith (PBUH) from all major collections, powered by speed.",
              link: "/hadith",
              icon: <Zap className="w-10 h-10 text-[#1DE9B6]" />,
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group relative p-10 bg-[#1A1D24]/60 backdrop-blur-xl rounded-3xl border border-[#2D3139] hover:border-[#00E676]/30 transition-all duration-500 overflow-hidden shadow-2xl shadow-black/30"
            >
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[#00E676]/0 to-[#1DE9B6]/0 opacity-0 group-hover:from-[#00E676]/10 group-hover:to-[#1DE9B6]/10 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative z-10 flex flex-col h-full gap-8">
                <div className="flex items-center gap-6">
                  <div className="p-4 rounded-2xl bg-[#0F1115] border border-[#2D3139] shadow-inner">
                    {item.icon}
                  </div>
                  <h3 className="text-3xl font-bold font-sans text-white tracking-tight">
                    {item.title}
                  </h3>
                </div>
                <p className="text-lg text-[#A1A7B3] leading-relaxed flex-grow">
                  {item.text}
                </p>
                <Link
                  href={item.link}
                  className="inline-flex items-center gap-2.5 text-[#00E676] font-semibold text-lg group-hover:gap-4 transition-all"
                >
                  Launch {item.title} <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="relative mt-20 p-2 bg-[#1A1D24] rounded-[40px] border border-[#2D3139] shadow-3xl shadow-black/50 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-transparent to-transparent z-10" />
          <Image
            src="/img/quran-manuscript.jpg"
            alt="Authentic Manuscript View"
            width={1200}
            height={600}
            className="rounded-[36px] object-cover h-[400px] w-full transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-10 left-10 z-20 max-w-lg">
            <span className="text-[#00E676] font-mono text-sm mb-2 block">
              Feature: Historical View
            </span>
            <h4 className="text-3xl font-bold text-white mb-3">
              Ancient Wisdom, Modern Access
            </h4>
            <p className="text-[#A1A7B3]">
              View high-definition manuscripts alongside digital text for
              unparalleled study.
            </p>
          </div>
        </motion.div>
      </section>
      <section className="bg-[#1A1D24] py-24 md:py-32 border-t border-[#2D3139] relative">
        <div className="absolute inset-0 z-0 overflow-hidden opacity-30 grayscale mix-blend-soft-light">
          <Image
            src="/img/muslim.jpg"
            alt="Community Mesh"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 tracking-tighter">
              What is <span className="text-[#00E676]">Islam</span>? <br />
              <span className="font-light text-[#A1A7B3]">
                A Platform for Peace.
              </span>
            </h2>
            <div className="space-y-6 text-lg text-[#A1A7B3] leading-relaxed">
              <p>
                Islam is a religion of peace, love, and compassion that inspires
                millions. Rooted in the belief in one God, it teaches kindness,
                justice, and mercy to all living beings.
              </p>
              <p className="border-l-4 border-[#00E676]/30 pl-6 italic">
                The word "Islam" itself means submission to God's will,
                reflecting a way of life that encourages harmony, mutual
                respect, and understanding.
              </p>
            </div>
          </motion.div>
          <div className="h-[300px] bg-[#0F1115] rounded-3xl border border-[#2D3139] flex items-center justify-center">
            <Sparkles className="w-20 h-20 text-[#2D3139]" />
          </div>
        </div>
      </section>
      <footer className="bg-[#0F1115] text-[#A1A7B3] py-20 border-t border-[#2D3139]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 mb-12">
            {[
              { name: "Documentation", url: "#" },
              {
                name: "Github",
                url: "https://github.com/DannielLima/SahihVerse",
              },
              {
                name: "Quran API",
                url: "https://github.com/semarketir/quranjson",
              },
              { name: "Hadith API", url: "/" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.url}
                className="text-lg text-white hover:text-[#00E676] transition-colors font-medium tracking-tight"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <p className="text-sm font-mono border-t border-[#2D3139] pt-10 w-full">
            &copy; {new Date().getFullYear()} SahihVerse. All rights reserved.{" "}
            <br />
            Powered by modern technology, dedicated to divine wisdom.
          </p>
        </div>
      </footer>
    </div>
  );
}
