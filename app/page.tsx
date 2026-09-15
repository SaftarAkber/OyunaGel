import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import SportCategoryTabs from "@/app/components/SportCategoryTabs";
import OpenGamesSection from "@/app/components/OpenGamesSection";
import Footer from "@/app/components/Footer";
import { featuredGames, openGames, sportCategories } from "@/lib/mock-data";

// TODO(backend): bu səhifə server component-dir — backend API hazır olanda
// yuxarıdakı mock-data importunu real fetch çağırışları ilə əvəz et.
// Ətraflı: README.md → "Backend API gələndə" bölməsi.

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />

      <Hero games={featuredGames}/>

      <section className="mx-auto mt-10 w-full max-w-6xl px-6">
        <SportCategoryTabs categories={sportCategories} />
      </section>

      <OpenGamesSection games={openGames} />

      <Footer />
    </main>
  );
}
