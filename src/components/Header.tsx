"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { BookOpen, Library, Info } from "lucide-react"; // Ícones para o mobile

const Header = () => {
  const pathname = usePathname();

  const navLinks = [
    { href: "/quran", label: "Quran", icon: BookOpen },
    { href: "/hadith", label: "Hadith", icon: Library },
    { href: "/about", label: "About", icon: Info },
  ];

  return (
    <div className="fixed top-0 left-0 w-full flex justify-center z-[100] px-2 sm:px-4 pt-4 pointer-events-none">
      <motion.header
        className="pointer-events-auto w-full max-w-5xl h-16 flex items-center justify-between px-4 sm:px-6 rounded-full border border-white/10 bg-[#0F1115]/80 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo - Ajustado tamanho no mobile */}
        <Link href="/" className="group flex items-center gap-2 flex-shrink-0">
          <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-tr from-[#00E676] to-[#1DE9B6] rounded-md shadow-[0_0_15px_rgba(0,230,118,0.4)] group-hover:rotate-12 transition-transform" />
          <span className="text-base sm:text-lg font-bold tracking-tighter text-white">
            Sahih<span className="text-[#00E676]">Verse</span>
          </span>
        </Link>

        {/* Navigation - Agora visível em todos os tamanhos, mas com estilos diferentes */}
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`relative px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium transition-colors rounded-full flex items-center gap-2 ${
                  isActive ? "text-white" : "text-stone-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-bg"
                    className="absolute inset-0 bg-white/10 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {/* Ícone visível apenas em telas muito pequenas, texto em telas maiores */}
                <Icon className="w-4 h-4 md:hidden" />
                <span className="hidden md:inline">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* CTA - Escondido no mobile para não amontoar */}
        <div className="hidden sm:flex items-center">
          <Link 
            href="/quran" 
            className="px-4 py-2 text-[10px] sm:text-xs font-bold bg-[#00E676] text-[#0F1115] rounded-full hover:bg-white transition-all duration-300 active:scale-95 whitespace-nowrap"
          >
            START READING
          </Link>
        </div>

        {/* Pequeno ajuste para mobile: se o CTA sumir, o espaçamento se mantém equilibrado */}
      </motion.header>
    </div>
  );
};

export default Header;