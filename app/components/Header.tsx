"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

interface HeaderProps {
  /** Show the outlined "Daxil ol" (sign in) button for guests. Hide it on the login page itself. */
  showLogin?: boolean;
  /** Show the "Açıq oyunlar" nav link, underlined as active. */
  showNav?: boolean;
}

export default function Header({
  showLogin = true,
  showNav = false,
}: HeaderProps) {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  return (
    <header className="mx-0 flex items-center justify-between border-b border-white/10 bg-white px-8 py-4 sm:mx-5 md:mx-10 lg:mx-20">
      <div className="flex items-center gap-10">
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-tight text-ink"
        >
          OyunaGəl
        </Link>

        {showNav && (
          <nav>
            <Link
              href="/oyunlar"
              className="border-b-2 border-ink pb-1 text-sm font-medium text-ink"
            >
              Açıq oyunlar
            </Link>
          </nav>
        )}
      </div>

      <div className="flex items-center gap-3">
        {isLoading ? null : session?.user ? (
          <>
            <div className="flex items-center gap-2">
              {session.user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={session.user.image}
                  alt={session.user.name ?? "İstifadəçi"}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-800 text-xs font-semibold text-white">
                  {session.user.name?.[0]?.toUpperCase() ?? "İ"}
                </div>
              )}
              <span className="hidden text-sm font-medium text-ink sm:inline">
                {session.user.name}
              </span>
            </div>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="rounded-lg border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink/5"
            >
              Çıxış
            </button>
          </>
        ) : (
          showLogin && (
            <Link
              href="/login"
              className="rounded-lg border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink/5"
            >
              Daxil ol
            </Link>
          )
        )}

        <Link
          href="/yarat"
          className="rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink/90"
        >
          Oyun yarat
        </Link>
      </div>
    </header>
  );
}
