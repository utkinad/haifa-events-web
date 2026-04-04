"use client";

import { useState, useEffect } from "react";

// SHA-256 хэш PIN-кода
// Текущий PIN: 1234 → сменить через NEXT_PUBLIC_PIN_HASH при билде
const PIN_HASH =
  process.env.NEXT_PUBLIC_PIN_HASH ||
  "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4";

async function sha256(str: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(str)
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

export default function PinGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [checking, setChecking] = useState(true);
  const [pin, setPin]           = useState("");
  const [shake, setShake]       = useState(false);

  useEffect(() => {
    if (getCookie("ea_v1") === "granted") setUnlocked(true);
    setChecking(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hash = await sha256(pin);
    if (hash === PIN_HASH) {
      setCookie("ea_v1", "granted", 30);
      setUnlocked(true);
    } else {
      setShake(true);
      setPin("");
      setTimeout(() => setShake(false), 600);
    }
  };

  if (checking)  return null;
  if (unlocked)  return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#1A1A2E] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="flex items-end gap-1.5">
            {["#99CCFF","#FFC200","#31CDCF","#FF6B6B","#4CAF82"].map((color, i) => (
              <span
                key={i}
                className="inline-block rounded-full"
                style={{
                  backgroundColor: color,
                  width: 12,
                  height: 12,
                  animation: `bounce 1.2s ease-in-out ${i * 0.15}s infinite`,
                }}
              />
            ))}
          </span>
          <span className="font-extrabold text-xl tracking-tight text-white leading-none">
            haifa<span style={{ color: "#31CDCF" }}>.</span>events
          </span>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className={`bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm ${shake ? "animate-[shake_0.5s_ease]" : ""}`}
        >
          <p className="text-white/60 text-sm text-center mb-6">
            Сайт в разработке — доступ по PIN
          </p>

          <input
            type="password"
            inputMode="numeric"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Введите PIN"
            autoFocus
            className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white text-center text-lg tracking-widest placeholder-white/30 focus:outline-none focus:border-[#31CDCF]/60 mb-4"
          />

          <button
            type="submit"
            className="w-full bg-[#31CDCF] hover:bg-[#28b5b7] text-[#1A1A2E] font-bold py-3 rounded-xl transition-colors"
          >
            Войти
          </button>
        </form>
      </div>

      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-8px); }
          40%      { transform: translateX(8px); }
          60%      { transform: translateX(-5px); }
          80%      { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}
