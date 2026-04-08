"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Code2, Cpu, Globe2, Sparkles, Layout } from "lucide-react";
import Loading from "@/components/ui/Loading";

const FeatureCard = ({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) => (
  <div className="p-8 bg-[#1A1D24] border border-white/5 rounded-[2rem] hover:border-[#00E676]/30 transition-all duration-500 group">
    <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#0F1115] border border-white/10 text-[#00E676] mb-6 group-hover:scale-110 transition-transform">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
      {title}
    </h3>
    <p className="text-stone-400 leading-relaxed font-light">{desc}</p>
  </div>
);

const TechBadge = ({ label }: { label: string }) => (
  <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-stone-300 text-sm font-mono hover:bg-[#00E676]/10 hover:text-[#00E676] hover:border-[#00E676]/30 transition-all cursor-default">
    {label}
  </span>
);

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-20 min-h-screen">
      <section className="text-center mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00E676]/5 border border-[#00E676]/20 text-[#00E676] text-xs font-mono mb-8"
        >
          <Sparkles className="w-3 h-3" />
          <span>OUR MISSION</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold font-serif text-white tracking-tighter mb-8"
        >
          About <span className="text-stone-500 italic">SahihVerse</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl md:text-2xl text-stone-400 font-light max-w-3xl mx-auto leading-relaxed"
        >
          An immersive digital sanctuary designed to bridge ancient divine
          wisdom with
          <span className="text-white"> cutting-edge technology</span>. Built
          for clarity, speed, and spiritual depth.
        </motion.p>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
        <FeatureCard
          icon={Globe2}
          title="Universal Access"
          desc="Seamlessly navigate the Quran and Hadith with professional translations in Arabic and English."
        />
        <FeatureCard
          icon={Layout}
          title="Modern UI"
          desc="A distraction-free interface optimized for deep study and spiritual reflection across all devices."
        />
        <FeatureCard
          icon={Github}
          title="Open Source"
          desc="A community-driven project built on transparency and collaboration. Join us on GitHub."
        />
      </div>
      <div className="relative p-12 bg-gradient-to-br from-[#1A1D24] to-[#0F1115] border border-white/5 rounded-[3rem] overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Code2 size={120} className="text-white" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-[#1DE9B6] font-mono text-xs mb-6 uppercase tracking-widest">
            <Cpu className="w-4 h-4" />
            <span>Infrastructure</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">
            Built with the <br />
            <span className="text-stone-500">modern stack.</span>
          </h2>
          <div className="flex flex-wrap gap-3 mb-12">
            <TechBadge label="Next.js 15" />
            <TechBadge label="React 19" />
            <TechBadge label="Tailwind CSS" />
            <TechBadge label="TypeScript" />
            <TechBadge label="Framer Motion" />
            <TechBadge label="Lucide Icons" />
          </div>
          <a
            href="https://github.com/DannielLima/nextjs-SahihVerse"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-sm hover:bg-[#00E676] transition-all group"
          >
            <Github className="w-5 h-5" />
            VIEW REPOSITORY
            <Code2 className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
          </a>
        </div>
      </div>
      <footer className="mt-32 text-center border-t border-white/5 pt-12">
        <p className="text-stone-600 font-mono text-xs uppercase tracking-[0.4em]">
          Designed for the Ummah • 2026
        </p>
      </footer>
    </div>
  );
};

export default About;
