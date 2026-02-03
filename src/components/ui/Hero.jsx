"use client";

import React, { useEffect, useState } from "react";

const Hero = () => {
  const [bookmarks, setBookmarks] = useState([]);

  // Ambil bookmark dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem("ayat-bookmarks");
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="min-h-screen flex  flex-col justify-center pt-28 max-w-4xl mx-auto text-center md:px-20">
      {/* BADGE */}
      <div className="inline-flex w-fit mx-auto items-center gap-2 px-4 py-2 rounded-full border mb-6 animate-fade-in bg-[#aee15f] text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
        </svg>
        <span className="text-sm font-medium">
          Platform Al-Qur'an Online
        </span>
      </div>

      {/* TITLE */}
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-[#254F22]">
        Baca Al-Qur'an dengan Cara yang Lebih Bermakna
      </h1>

      <p className="text-lg md:text-xl text-[#254F22] mb-10 max-w-2xl mx-auto">
        Akses 30 juz Al-Qur'an lengkap dengan terjemahan Indonesia dan audio
        tilawah terbaik.
      </p>

      {/* ================= BOOKMARK RESULT ================= */}
      {bookmarks.length > 0 && (
        <div className="mt-8 bg-white/70 backdrop-blur rounded-xl p-6 shadow">
          <h2 className="text-lg font-semibold mb-4 text-left">
            🔖 Ayat Tersimpan
          </h2>

          <div className="flex flex-col gap-4 max-h-[260px] overflow-y-auto">
            {bookmarks.map((ayat) => (
              <div
                key={ayat.nomorAyat}
                className="border rounded-lg p-4 text-left hover:bg-gray-50 transition"
              >
                <p
                  dir="rtl"
                  className="text-xl leading-loose mb-2 text-right"
                >
                  {ayat.teksArab}
                </p>

                <p className="text-sm italic text-[#436b07] mb-1">
                  Ayat {ayat.nomorAyat}
                </p>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {ayat.teksIndonesia}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* KALAU BELUM ADA BOOKMARK */}
      {bookmarks.length === 0 && (
        <p className="text-sm text-gray-400 mt-8">
          Belum ada ayat yang disimpan ✨
        </p>
      )}
    </div>
  );
};

export default Hero;
