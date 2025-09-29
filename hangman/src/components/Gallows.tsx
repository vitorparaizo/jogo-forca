type Props = {
  errors: number; // 0..6
};

export default function Gallows({ errors }: Props) {
  return (
    <div className="w-full flex items-center justify-center">
      <svg
        viewBox="0 0 200 220"
        className="w-full max-w-xs sm:max-w-sm md:max-w-md drop-shadow-xl"
        aria-label={`Forca: ${errors} erro(s)`}
      >
        <line x1="10" y1="210" x2="190" y2="210" stroke="#94a3b8" strokeWidth="8" />
        <line x1="50" y1="210" x2="50" y2="20" stroke="#94a3b8" strokeWidth="8" />
        <line x1="47" y1="20" x2="130" y2="20" stroke="#94a3b8" strokeWidth="8" />
        <line x1="130" y1="20" x2="130" y2="50" stroke="#94a3b8" strokeWidth="6" />

        {errors > 0 && (
          <circle cx="130" cy="70" r="20" fill="none" stroke="#e11d48" strokeWidth="5" />
        )}
        {errors > 1 && <line x1="130" y1="90" x2="130" y2="140" stroke="#e11d48" strokeWidth="5" />}
        {errors > 2 && <line x1="130" y1="110" x2="105" y2="125" stroke="#e11d48" strokeWidth="5" />}
        {errors > 3 && <line x1="130" y1="110" x2="155" y2="125" stroke="#e11d48" strokeWidth="5" />}
        {errors > 4 && <line x1="130" y1="140" x2="112" y2="175" stroke="#e11d48" strokeWidth="5" />}
        {errors > 5 && <line x1="130" y1="140" x2="148" y2="175" stroke="#e11d48" strokeWidth="5" />}
      </svg>
    </div>
  );
}
