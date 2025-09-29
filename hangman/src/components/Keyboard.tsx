type Props = {
  onGuess: (letter: string) => void;
  used: Set<string>;
  correct: Set<string>;
  disabled?: boolean;
};

const ROWS = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

export default function Keyboard({ onGuess, used, correct, disabled }: Props) {
  return (
    <div
      className="
        sticky bottom-2 z-10
        bg-slate-900/70 backdrop-blur
        border border-slate-800 rounded-2xl
        p-3 md:p-4
        shadow-2xl
      "
      role="group"
      aria-label="Teclado de letras"
    >
      <div className="flex flex-col gap-2 items-center">
        {ROWS.map((row, i) => (
          <div
            key={row}
            className={`grid gap-2 w-full
              ${i === 0 ? "grid-cols-10" : i === 1 ? "grid-cols-9" : "grid-cols-7"}
              sm:max-w-xl
            `}
          >
            {row.split("").map((ch) => {
              const upper = ch.toUpperCase();
              const isUsed = used.has(upper);
              const isCorrect = correct.has(upper);

              return (
                <button
                  key={ch}
                  disabled={disabled || isUsed}
                  onClick={() => onGuess(upper)}
                  className={[
                    "h-12 sm:h-12 md:h-12 rounded-xl font-semibold uppercase transition ring-1 ring-slate-700",
                    "text-sm sm:text-base",
                    isUsed
                      ? isCorrect
                        ? "bg-emerald-600/30 text-emerald-200 cursor-not-allowed"
                        : "bg-rose-600/30 text-rose-200 cursor-not-allowed"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-100 active:translate-y-[1px]",
                  ].join(" ")}
                  aria-label={`Letra ${upper}`}
                >
                  {upper}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
