"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import CardAyat from "./cardAyat";
import AudioPlayer from "./ui/audioPlayer";

gsap.registerPlugin(ScrollToPlugin);

interface infoSurat {
  namaLatin: string;
  nama: string;
  nomor: number;
}

interface ayatListProps {
  ayatList: any[];
  infoSurat: infoSurat;
}

export default function AyatListClient({ ayatList, infoSurat }: ayatListProps) {
  const router = useRouter();
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const hasPrev = infoSurat.nomor > 1;
  const hasNext = infoSurat.nomor < 114;

  useEffect(() => {
    if (currentPlayingIndex === null) return;

    const card = cardsRef.current[currentPlayingIndex];
    if (!card) return;

    gsap.to(card, {
      scale: 1.01,
      borderColor: "rgba(37, 79, 34, 0.4)",
      backgroundColor: "rgba(37, 79, 34, 0.05)",
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(window, {
      duration: 0.8,
      scrollTo: { y: card, offsetY: 100 },
      ease: "power2.inOut",
    });

    return () => {
      gsap.to(card, {
        scale: 1,
        backgroundColor: "rgba(255, 255, 255, 0)",
        borderColor: "rgba(37, 79, 34, 0.1)",
        duration: 0.2,
      });
    };
  }, [currentPlayingIndex]);

  const handlePlay = useCallback((index: number) => {
    setCurrentPlayingIndex((prev) => {
      if (prev === index) {
        setIsPaused((p) => !p);
        return prev;
      }
      setIsPaused(false);
      return index;
    });
  }, []);

  const handleAudioEnd = useCallback(() => {
    setCurrentPlayingIndex((prev) => {
      if (prev === null || prev >= ayatList.length - 1) return null;
      return prev + 1;
    });
    setIsPaused(false);
  }, [ayatList.length]);

  const handleClose = () => {
    setCurrentPlayingIndex(null);
    setIsPaused(false);
  };

  const currentAyat = currentPlayingIndex !== null ? ayatList[currentPlayingIndex] : null;
  const audioUrl = currentAyat?.audio?.["02"] ?? null;

  return (
    <>
      {/* Header surat */}
      <div className="max-w-4xl mx-auto pb-6">
        <div className="w-full p-6 rounded-2xl bg-[#254F22] text-white text-center space-y-1">
          <p className="text-sm text-white/60">Surat ke-{infoSurat.nomor}</p>
          <h1 className="text-2xl font-bold">{infoSurat.namaLatin}</h1>
          <p className="text-3xl font-bold">{infoSurat.nama}</p>
        </div>
      </div>

      {/* List ayat */}
      <div className="relative flex flex-col w-full">
        {ayatList.map((ayat, index) => (
          <CardAyat
            key={ayat.nomorAyat}
            ayat={ayat}
            index={index}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            currentPlayingIndex={currentPlayingIndex}
            onPlay={handlePlay}
          />
        ))}
      </div>

      {/* Navigasi surat */}
      <div className="max-w-4xl mx-auto flex justify-between items-center gap-4 py-10">
        {hasPrev ? (
          <button
            onClick={() => router.push(`/alquran/${infoSurat.nomor - 1}`)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-[#254F22]/10 dark:border-[#A3DC9A]/10 hover:bg-[#254F22]/5 dark:hover:bg-[#A3DC9A]/5 transition-colors text-[#254F22] dark:text-[#A3DC9A]"
          >
            <ChevronLeft size={18} />
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-[#254F22]/50 dark:text-[#A3DC9A]/50 uppercase tracking-wide">Sebelumnya</span>
              <span className="text-sm font-medium">Surat {infoSurat.nomor - 1}</span>
            </div>
          </button>
        ) : <div />}

        {hasNext ? (
          <button
            onClick={() => router.push(`/alquran/${infoSurat.nomor + 1}`)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-[#254F22]/10 dark:border-[#A3DC9A]/10 hover:bg-[#254F22]/5 dark:hover:bg-[#A3DC9A]/5 transition-colors text-[#254F22] dark:text-[#A3DC9A]"
          >
            <div className="flex flex-col text-right">
              <span className="text-[10px] text-[#254F22]/50 dark:text-[#A3DC9A]/50 uppercase tracking-wide">Selanjutnya</span>
              <span className="text-sm font-medium">Surat {infoSurat.nomor + 1}</span>
            </div>
            <ChevronRight size={18} />
          </button>
        ) : <div />}
      </div>

      {/* Audio Player Bar */}
      {currentPlayingIndex !== null && audioUrl && (
        <div className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-[#0f1a0e]/90 border-t border-[#254F22]/10 dark:border-[#A3DC9A]/10">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
            <div className="flex-shrink-0 hidden sm:flex flex-col">
              <span className="text-[11px] text-[#254F22]/50 dark:text-[#A3DC9A]/50 uppercase tracking-wide">
                Sedang Diputar
              </span>
              <span className="text-[13px] font-medium text-[#254F22] dark:text-[#A3DC9A]">
                Ayat {currentAyat?.nomorAyat}
              </span>
            </div>
            <div className="w-px h-8 bg-[#254F22]/10 dark:bg-[#A3DC9A]/10 hidden sm:block" />
            <div className="flex-1">
              <AudioPlayer
                audioUrl={audioUrl}
                isPlaying={!isPaused}
                onPlay={() => handlePlay(currentPlayingIndex)}
                onEnded={handleAudioEnd}
              />
            </div>
            <button
              onClick={handleClose}
              className="flex-shrink-0 p-2 rounded-full hover:bg-[#254F22]/10 dark:hover:bg-[#A3DC9A]/10 transition-colors"
            >
              <X size={20} className="text-[#254F22] dark:text-[#A3DC9A]" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}