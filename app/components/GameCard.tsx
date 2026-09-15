import { OpenGame } from "@/lib/types";
import Avatar from "./Avatar";

const levelStyles: Record<OpenGame["level"], string> = {
  Başlanğıc: "bg-emerald-700 text-white",
  "Orta səviyyə": "bg-amber-700 text-white",
  Yüksək: "bg-blue-700 text-white",
};

export default function GameCard({ game }: { game: OpenGame }) {
  const spotsLeft = game.maxPlayers - game.currentPlayers;
  const progressPct = (game.currentPlayers / game.maxPlayers) * 100;

  return (
    <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
      <div className="relative h-56 w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={game.imageUrl}
          alt={game.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute right-2 top-3 flex gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${levelStyles[game.level]}`}
          >
            {game.level}
          </span>
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink">
            {game.sportLabel}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-ink">
          {game.title}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-ink/60">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          {game.location}
        </p>
        <p className="mt-1 flex items-center gap-3 text-sm text-ink/60">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-4 inline-block mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              />
            </svg>
            {game.dateLabel}
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-4 inline-block mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            {game.timeLabel}
          </span>
        </p>

        <div className="mt-4 flex items-center justify-between text-xs font-medium">
          <span className="text-ink/60">
            {game.currentPlayers}/{game.maxPlayers} oyunçu
          </span>
          <span className="text-emerald-600">{spotsLeft} yer qalıb</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-black/5">
          <div
            className="h-full rounded-full bg-emerald-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar player={game.host} />
            <span className="text-sm text-ink/80">{game.host.name}</span>
          </div>
          <button
            type="button"
            className="rounded-lg bg-indigo-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-900/90"
          >
            Qoşul
          </button>
        </div>
      </div>
    </div>
  );
}
