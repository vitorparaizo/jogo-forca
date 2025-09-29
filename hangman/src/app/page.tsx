"use client";

import Hangman from "../components/Hangman";

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-8 md:py-12 relative">
      <section className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          🎯 Jogo da Forca
        </h1>
        <p className="text-slate-300 mt-2 md:mt-3 max-w-2xl mx-auto">
          Adivinhe a palavra antes que o boneco seja desenhado. Teclado virtual,
          suporte ao teclado físico e layout otimizado para celular e desktop.
        </p>
      </section>

      <Hangman />
    </main>
  );
}
