"use client";
import Link from "next/link";
import { useBadgeAnimation } from "@/hooks/useBadgeAnimation";

const messages = [
  "Platform Al-Qur'an Online",
  "Selamat Menjalankan Ibadah Puasa 🌙",
];

export default function Hero() {
  const { textRef, index } = useBadgeAnimation(messages, 3000);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-20 pt-20 relative overflow-hidden dark:bg-[#0f1a0e]">

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#254F22]/5 dark:bg-[#A3DC9A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl w-full flex flex-col items-center text-center gap-6 relative z-10">

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#254F22]/20 dark:border-[#A3DC9A]/20 bg-[#254F22] dark:bg-[#A3DC9A]/10 text-white dark:text-[#A3DC9A] overflow-hidden shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 dark:bg-[#A3DC9A] animate-pulse" />
          <span ref={textRef} className="text-sm font-medium tracking-wide">
            {messages[index]}
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-[#254F22] dark:text-[#e8f5e4]">
          Baca Al-Qur'an
          <br />
          <span className="font-light italic text-[#254F22]/80 dark:text-[#A3DC9A]">
            dengan Cara yang
          </span>
          <br />
          Lebih Bermakna
        </h1>

        <p className="text-base md:text-lg text-[#254F22]/70 dark:text-[#e8f5e4]/60 max-w-xl leading-relaxed">
          Akses 30 juz Al-Qur'an lengkap dengan terjemahan Indonesia
          dan audio tilawah terbaik.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          <Link
            href="/alquran"
            className="px-8 py-3 bg-[#254F22] dark:bg-[#A3DC9A] text-white dark:text-[#0f1a0e] text-sm font-semibold rounded-full hover:bg-[#1a3a18] dark:hover:bg-[#8fcf85] transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Baca Sekarang
          </Link>
        </div>

      </div>
    </section>
  );
}