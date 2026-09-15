"use client";

import { useState } from "react";
import Link from "next/link";
import { FeaturedGame } from "@/lib/types";
import Avatar from "./Avatar";

const TRACK_WIDTH_PERCENT = 122;
const TRACK_OFFSET_PERCENT = (TRACK_WIDTH_PERCENT - 100) / 2;

function FeaturedCard({
  game,
  emphasis = true,
}: {
  game: FeaturedGame;
  emphasis?: boolean;
}) {
  const visiblePlayers = game.players.slice(0, 3);
  const extraCount = game.currentPlayers - visiblePlayers.length;
  const progressPct = (game.currentPlayers / game.maxPlayers) * 100;


  return (
    <div
      className={`flex h-full w-full shrink-0 flex-col rounded-2xl border border-white/10 shadow-2xl shadow-black/50 backdrop-blur-sm ${
        emphasis ? "p-7" : "p-6"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-medium rounded-xl bg-white p-1 text-[#E8A33D]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#E8A33D]" />
          {game.dateLabel}
        </span>
        <span className="flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white">
          {game.sportLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <h3
          className={`font-display font-bold text-white ${
            emphasis ? "text-xl" : "text-lg"
          }`}
        >
          {game.title}
        </h3>
        <p className="mt-1 text-sm text-white/70">{game.location}</p>

        <div className="mt-4 flex items-baseline gap-1">
          <span className={`font-bold text-white ${emphasis ? "text-4xl" : "text-3xl"}`}>
            {game.currentPlayers}
          </span>
          <span className="text-sm text-white/70">
            / {game.maxPlayers} iştirakçı
          </span>
        </div>
      </div>


      <div className="mt-1">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-amber-400"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex -space-x-2">
            {visiblePlayers.map((player) => (
              <Avatar
                key={player.id}
                player={player}
                className="border-2 border-indigo-900"
              />
            ))}
            {extraCount > 0 && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-900 bg-emerald-100 text-xs font-semibold text-emerald-700">
                +{extraCount}
              </div>
            )}
          </div>

          <button
            type="button"
            className="rounded-lg bg-white px-5 py-2 text-sm font-medium text-ink transition-colors hover:bg-white/90"
          >
            Qoşul
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Hero({ games }: { games: FeaturedGame[] }) {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((current) => (current === 0 ? games.length - 1 : current - 1));
  const next = () =>
    setIndex((current) => (current === games.length - 1 ? 0 : current + 1));

  const leftGame = games[(index - 1 + games.length) % games.length];
  const centerGame = games[index];
  const rightGame = games[(index + 1) % games.length];

  return (
    <section
      className="relative overflow-hidden bg-cover bg-center pb-20 pt-16 text-center"
      style={{
        backgroundImage:
          "url('/bg.png')",
      }}
    >
      <div className="relative px-6">
        <h1 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
          Sevdiyin idmanı seç, meydança{" "}
          <span className="text-amber-400">tap</span>, oyuna qoşul
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base text-white/80">
          Bakı daxilində yüzlərlə aktiv oyun və meydança. Komanda yoldaşlarını
          tap və professional atmosferdə idman et.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/oyunlar"
            className="rounded-lg bg-amber-400 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-amber-300"
          >
            Açıq oyunlara bax
          </Link>
          <Link
            href="/yarat"
            className="rounded-lg border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Oyun yarat
          </Link>
        </div>
      </div>

      <div className="relative mt-14 w-full text-left overflow-hidden">
        <div
          className="grid grid-cols-1 items-center gap-10 sm:grid-cols-[0.82fr_1.4fr_0.82fr]"
          style={{
            width: `${TRACK_WIDTH_PERCENT}%`,
            marginLeft: `-${TRACK_OFFSET_PERCENT}%`,
          }}
        >
          <div className="hidden h-[260px] w-full sm:block">
            <FeaturedCard game={leftGame} emphasis={false} />
          </div>

          <div className="h-[360px] w-full">
            <FeaturedCard game={centerGame} emphasis />
          </div>

          <div className="hidden h-[260px] w-full sm:block">
            <FeaturedCard game={rightGame} emphasis={false} />
          </div>
        </div>

        {/* Not: bu fade-lər ARTIQ arxa fonu deyil, yalnız kart kənarlarının
            kəsilməsini yumşaltır — background section-un öz style-ındadır,
            bunlar onun üzərinə əlavə yerli bir effektdir. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-28 bg-gradient-to-r from-indigo-950/70 via-indigo-950/25 to-transparent sm:block md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-28 bg-gradient-to-l from-indigo-950/70 via-indigo-950/25 to-transparent sm:block md:w-40" />
      </div>

      <div className="relative mt-8 flex items-center justify-center gap-4 px-6">
        <button
          type="button"
          onClick={prev}
          aria-label="Əvvəlki"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors text-baseline hover:bg-white/20"
        >
          ‹
        </button>

        <div className="flex items-center gap-2">
          {games.map((game, i) => (
            <button
              key={game.id}
              type="button"
              aria-label={`${i + 1}-ci slayda keç`}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === index ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Növbəti"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          ›
        </button>
      </div>
    </section>
  );
}