import Link from "next/link";
import { Moon } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/config";
import LoginButton from "./LoginButton";

/**
 * /login — Google sign-in for mosque admins.
 *
 * The TV does NOT use this page (it pairs with a code instead). This is purely
 * the admin entry point. When Supabase isn't configured we show a friendly
 * setup notice rather than a broken button.
 */
export const metadata = { title: "Sign in · MasjidOS 26" };

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-midnight-950 px-5">
      <div className="pointer-events-none absolute inset-0 bg-radial-gold" />
      <div className="arabesque pointer-events-none absolute inset-0 opacity-[0.04]" />

      <div className="relative w-full max-w-md rounded-3xl glass p-8 text-center shadow-card">
        <Link href="/" className="mx-auto inline-flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 text-midnight-950 shadow-glow">
            <Moon className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-white">
            MasjidOS<span className="text-gold-400"> 26</span>
          </span>
        </Link>

        <h1 className="mt-8 font-display text-2xl font-bold text-white">Selamat datang kembali</h1>
        <p className="mt-2 text-sm text-white/60">
          Log masuk untuk mengurus paparan masjid anda.
        </p>

        {isSupabaseConfigured ? (
          <div className="mt-8">
            <LoginButton />
            <p className="mt-4 text-xs text-white/40">
              Untuk TV: buka <span className="font-mono text-gold-400/80">/tv</span> pada skrin dan
              pasangkan dengan kod.
            </p>
          </div>
        ) : (
          <SetupNotice />
        )}

        <Link href="/" className="mt-8 inline-block text-xs text-white/50 transition hover:text-white/80">
          ← Kembali ke laman utama
        </Link>
      </div>
    </main>
  );
}

function SetupNotice() {
  return (
    <div className="mt-8 rounded-2xl border border-gold-500/30 bg-gold-500/5 p-5 text-left">
      <p className="text-sm font-semibold text-gold-400">Backend belum disambung</p>
      <p className="mt-2 text-xs leading-relaxed text-white/60">
        Tetapkan kunci Supabase dalam <span className="font-mono">.env.local</span> (lihat{" "}
        <span className="font-mono">.env.example</span>) untuk mengaktifkan log masuk Google,
        penyegerakan masa nyata, dan pangkalan data.
      </p>
    </div>
  );
}
