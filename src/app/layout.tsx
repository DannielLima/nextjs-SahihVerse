import "./styles/globals.css";
import Header from "../components/Header";

export const metadata = {
  title: "SahihVerse",
  description: "Quran app built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-light-beige text-dark-gray">
        <Header />
        <main className="container mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
