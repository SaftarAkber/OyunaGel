import { OpenGame } from "@/lib/types";
import GameCard from "./GameCard";

export default function OpenGamesSection({ games }: { games: OpenGame[] }) {
  return (
    <section className="mx-auto  max-w-16xl px-16 gap-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
        Açıq oyunlar
      </p>
      <h2 className="mt-2 font-display text-3xl font-bold text-ink">
        Bu gün və sabah üçün qoşula biləcəyin oyunlar
      </h2>
      <p className="mt-2 text-sm text-ink/50">
        Aktiv filtr: Bütün idman növləri • Bakı
      </p>

      <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          type="button"
          className="rounded-lg border border-indigo-900 px-8 py-3 text-sm font-semibold text-indigo-900 transition-colors hover:bg-indigo-900/5"
        >
          Daha çox
        </button>
      </div>
    </section>
  );
}
