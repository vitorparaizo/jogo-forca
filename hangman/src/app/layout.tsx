import "./globals.css"; // <- adicione esta linha
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jogo da Forca",
  description: "Hangman em Next.js + Tailwind (responsivo e moderno)",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} min-h-screen antialiased bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100`}
      >
        <div className="fixed inset-0 pointer-events-none [mask-image:radial-gradient(70%_50%_at_50%_30%,black,transparent)]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.10),transparent_60%)]" />
        </div>
        {children}
      </body>
    </html>
  );
}

