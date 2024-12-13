import './styles/globals.css';
import Header from '../components/Header';
import ThemeToggle from '../components/ThemeToggle';

export const metadata = {
  title: 'SahihVerse',
  description: 'Quran app built with Next.js and Tailwind CSS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-gray-900 text-white">
        <Header />
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
