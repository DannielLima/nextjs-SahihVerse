"use client";

import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  const arabicText = "بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ";
  
  // Dividimos por palavras para o efeito ficar mais fluido e legível no árabe
  const words = arabicText.split(" ");

  return (
    <div className="fixed inset-0 z-[200] flex flex-col justify-center items-center bg-[#0F1115]">
      {/* Efeito de luz de fundo (Glow) */}
      <div className="absolute w-[300px] h-[300px] bg-[#00E676]/10 blur-[120px] rounded-full animate-pulse" />

      <div className="relative flex flex-col items-center gap-8">
        {/* Texto Árabe Animado */}
        <div className="flex flex-row-reverse justify-center gap-3"> 
          {/* Usamos flex-row-reverse porque o árabe é lido da direita para a esquerda */}
          {words.map((word, wordIndex) => (
            <motion.span
              key={wordIndex}
              initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.8,
                delay: wordIndex * 0.2,
                ease: "easeOut",
              }}
              className="text-4xl md:text-6xl lg:text-7xl font-arabic text-white drop-shadow-[0_0_15px_rgba(0,230,118,0.3)]"
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Linha de progresso minimalista */}
        <div className="relative w-40 h-[1px] bg-white/10 overflow-hidden rounded-full">
          <motion.div
            className="absolute inset-0 bg-[#00E676]"
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Subtexto elegante */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[10px] font-mono text-stone-500 uppercase tracking-[0.6em]"
        >
          Seeking Wisdom
        </motion.span>
      </div>
    </div>
  );
};

export default Loading;