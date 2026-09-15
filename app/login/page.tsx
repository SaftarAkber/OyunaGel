"use client";

import { signIn } from "next-auth/react";
import Header from "@/app/components/Header";
import GoogleIcon from "@/app/components/GoogleIcon";

export default function LoginPage() {
  const handleGoogleSignIn = () => {
    // Uğurlu daxil olmadan sonra istifadəçini ana səhifəyə (home) yönləndirir
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <main className="flex min-h-screen flex-col">
      <Header showLogin={false} showNav />

      <section
        className="relative flex flex-1 items-center justify-center bg-cover bg-center px-6 py-24"
        style={{ backgroundImage: "url('/bg.png')" }}
      >
        <div className="flex w-full max-w-lg flex-col items-center text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Xoş gəlmisiniz
          </p>

          <h1 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">
            Hesabınıza daxil olun
          </h1>

          <p className="mt-4 text-base text-white/80">
            Ad, soyad və nömrə istənilmir — yalnız email və şifrə.
          </p>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="mt-10 flex w-full items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 text-sm font-medium text-ink shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            <GoogleIcon />
            Google ilə davam et
          </button>
        </div>
      </section>
    </main>
  );
}
