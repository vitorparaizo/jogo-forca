
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { WORDS } from "@/lib/words";
import Keyboard from "./Keyboard";
import Gallows from "./Gallows";

const MAX_ERRORS = 6;

function pickRandomWord() {
  const idx = Math.floor(Math.random() * WORDS.length);
  return WORDS[idx];
}

export default function Hangman() {
  const [secret, setSecret] = useState<string>(pickRandomWord);
  const [used, setUsed] = useState<Set<string>>(new Set());
  const [correct, setCorrect] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState<number>(0);

  const masked = useMemo(() => {
    return secret
      .split("")
      .map((ch) => (correct.has(ch) ? ch : "_"))
      .join(" ");
  }, [secret, correct]);

  const hasWon = useMemo(() => secret.split("").every((ch) => correct.has(ch)), [secret, correct]);
  const hasLost = errors >= MAX_ERRORS;
  const remaining = MAX_ERRORS - errors;

  const handleGuess = useCallback(
    (letter: string) => {
      if (hasWon || hasLost) return;
      if (used.has(letter)) return;

      setUsed((prev) => new Set(prev).add(letter));
      if (secret.includes(letter)) setCorrect((prev) => new Set(prev).add(letter));
      else setErrors((e) => e + 1);
    },
    [hasWon, hasLost, used, secret]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const ch = e.key.toUpperCase();
      if (/^[A-Z]$/.test(ch)) {
        e.preventDefault();
        handleGuess(ch);
      }
      if ((hasWon || hasLost) && e.key === "Enter") onReset();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleGuess, hasWon, hasLost]);

  const onReset = () => {
    setSecret(pickRandomWord());
    setUsed(new Set());
    setCorrect(new Set());
    setErrors(0);
  };

  const triedCorrect = Array.from(used).filter((l) => correct.has(l)).sort();
  const triedWrong = Array.from(used).filter((l) => !correct.has(l)).sort();

  return (
    <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
      {/* Card: Forca + Palavra */}
      <section
        className="
        lg:col-span-2
        bg-slate-900/60 border border-slate-800 rounded-2xl
        p-5 md:p-6 shadow-xl
      "
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center h-9 w-9 rounded-xl bg-slate-800 ring-1 ring-slate-700 text-sm font-bold">
              {remaining}
            </span>
            <div className="text-sm text-slate-300">
              Tentativas restantes <span className="text-slate-500">/ {MAX_ERRORS}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onReset}
              className="inline-flex items-center gap-2 bg-slate-100 text-slate-900 font-semibold px-4 py-2 rounded-xl hover:bg-white transition shadow-sm"
            >
              🔁 Reiniciar
            </button>
          </div>
        </div>

        <div className="mt-4 md:mt-6">
          <Gallows errors={errors} />
        </div>

        <div
          className="
            mt-6 md:mt-8
            mx-auto max-w-2xl
            text-center
            bg-slate-800/60 border border-slate-700 rounded-2xl
            p-4 md:p-5
          "
          aria-live="polite"
        >
          <p className="text-2xl md:text-3xl tracking-[0.3em] md:tracking-[0.4em] font-mono select-none">
            {masked}
          </p>
        </div>

        {(hasWon || hasLost) && (
          <div className="mt-6 text-center">
            {hasWon ? (
              <div className="bg-emerald-900/40 border border-emerald-700 text-emerald-200 rounded-xl px-4 py-3">
                🎉 Parabéns! Você adivinhou: <strong>{secret}</strong>
              </div>
            ) : (
              <div className="bg-rose-900/40 border border-rose-700 text-rose-200 rounded-xl px-4 py-3">
                💀 Fim de jogo! A palavra era: <strong>{secret}</strong>
              </div>
            )}
            <button
              onClick={onReset}
              className="mt-4 inline-flex items-center gap-2 bg-slate-100 text-slate-900 font-semibold px-4 py-2 rounded-xl hover:bg-white transition"
            >
              Jogar novamente
            </button>
          </div>
        )}
      </section>

      {/* Card: Tentativas (✔/❌) */}
      <section
        className="
        bg-slate-900/60 border border-slate-800 rounded-2xl
        p-5 md:p-6 shadow-xl
      "
      >
        <h2 className="text-lg font-semibold mb-4">Histórico de Letras</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <h3 className="text-sm text-slate-400 mb-1">✔️ Letras corretas</h3>
            <div className="min-h-12 bg-emerald-950/40 border border-emerald-800 rounded-xl px-3 py-2">
              {triedCorrect.length ? (
                <p className="tracking-widest font-mono text-emerald-200">
                  {triedCorrect.join(" ")}
                </p>
              ) : (
                <p className="text-slate-500 text-sm">Nenhuma ainda</p>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-sm text-slate-400 mb-1">❌ Letras erradas</h3>
            <div className="min-h-12 bg-rose-950/40 border border-rose-800 rounded-xl px-3 py-2">
              {triedWrong.length ? (
                <p className="tracking-widest font-mono text-rose-200">
                  {triedWrong.join(" ")}
                </p>
              ) : (
                <p className="text-slate-500 text-sm">Nenhuma ainda</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Teclado virtual (fica sticky no mobile) */}
      <section className="lg:col-span-3">
        <Keyboard onGuess={handleGuess} used={used} correct={correct} disabled={hasWon || hasLost} />
      </section>
    </div>
  );
}
