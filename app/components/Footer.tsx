import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#141A16] px-6 py-12 text-white/70">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 sm:flex-row">
        <div className="max-w-sm">
          <p className="font-display text-xl font-bold text-white-[37%] ">
            OyunaGəl
          </p>
          <p className="mt-3 text-sm">
            Azərbaycanın ən böyük idman koordinasiya platforması. Birlikdə
            oynayaq.
          </p>
        </div>

        <nav className="flex gap-8 text-sm">
          <Link href="/haqqimizda" className="hover:text-white">
            Haqqımızda
          </Link>
          <Link href="/qaydalar" className="hover:text-white">
            Qaydalar
          </Link>
          <Link href="/mexfilik" className="hover:text-white">
            Məxfilik
          </Link>
          <Link href="/elaqe" className="hover:text-white">
            Əlaqə
          </Link>
        </nav>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-center text-xs">
        © {new Date().getFullYear()} OyunaGəl. Bütün hüquqlar qorunur.
      </div>
    </footer>
  );
}
