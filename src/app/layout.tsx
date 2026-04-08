import "./styles/globals.css";
import Header from "../components/Header";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata = {
  title: "SahihVerse",
  description:
    "Next-generation Quran & Hadith platform built for spiritual clarity.",
  icons: {
    icon: "/img/favicon.svg",
    shortcut: "/img/favicon.svg",
    apple: "/img/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} scroll-smooth`}
    >
      <body className="bg-[#0F1115] text-[#F3F4F6] antialiased selection:bg-[#00E676]/30">
        <div className="relative z-50">
          <Header />
        </div>
        <main className="min-h-screen flex flex-col">{children}</main>
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#00E676]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#1DE9B6]/5 rounded-full blur-[100px]" />
        </div>
      </body>
    </html>
  );
}
