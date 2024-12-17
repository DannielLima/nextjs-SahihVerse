import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-light-beige text-dark-gray">
      <section className="text-center mt-16 mb-12">
        <h1 className="text-5xl font-bold font-serif mb-4 leading-tight">
          Quran <br /> & Hadith
        </h1>
        <p className="text-xl font-lato">In one place</p>
      </section>

      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mt-12 space-y-10 md:space-y-0 md:space-x-10 px-4">
        <section className="w-full md:w-1/2 flex justify-center">
          <img
            src="/img/mosque.png"
            alt="Mosque"
            className="rounded-lg shadow-lg max-w-full"
          />
        </section>

        <div className="w-full md:w-1/2 flex flex-col md:flex-row items-center justify-center md:justify-evenly space-y-8 md:space-y-0">
          <section className="flex flex-col items-center text-center space-y-4">
            <div className="bg-emerald-300 p-4 rounded-full flex items-center justify-center shadow-md">
              <p className="w-32 h-32 text-white font-arabic flex items-center justify-center text-2xl">
                قُرْءَان
              </p>
            </div>
            <Link href="/quran" legacyBehavior>
              <a className="mt-2 px-6 py-3 text-dark-gray font-semibold font-nunito bg-emerald-200 rounded-md shadow hover:bg-emerald-300 transition">
                Read Quran
              </a>
            </Link>
          </section>

          <section className="flex flex-col items-center text-center space-y-4">
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
          </section>
        </div>
      </div>

      <div className="mt-20 flex flex-col md:flex-row items-center max-w-6xl mx-auto px-4 space-y-12 md:space-y-0 md:space-x-12">
        <section className="md:w-1/2">
          <h1 className="text-4xl font-bold font-serif mb-6 leading-snug text-center md:text-left">
            What is Islam?
          </h1>
          <p className="text-lg font-lato mb-6 leading-relaxed">
            Islam is a religion of peace, love, and compassion that inspires
            millions around the world. Rooted in the belief in one God, Allah,
            it teaches kindness, justice, and mercy to all living beings. The
            word "Islam" itself means submission to God's will, reflecting a way
            of life that encourages harmony, mutual respect, and understanding.
          </p>
          <p className="text-lg font-lato leading-relaxed">
            Through its teachings, Islam calls for love for neighbors, care for
            the less fortunate, and striving for a better, more equitable world.
            It is not just a religion but a source of guidance that enriches
            lives and fosters a deep connection with the Creator and humanity.
          </p>
        </section>

        <section className="md:w-1/2">
          <img
            src="/img/muslim.png"
            alt="Muslim"
            className="rounded-lg shadow-lg w-full"
          />
        </section>
      </div>
    </div>
  );
}
