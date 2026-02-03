"use client";

import Image from "next/image";
import { Amiri } from "next/font/google";
import AudioPlayer from "./ui/audioPlayer";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { X, Bookmark, Play } from "lucide-react"; // ⬅️ TAMBAH BOOKMARK
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

gsap.registerPlugin(ScrollToPlugin);

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export default function AyatListClient({ ayatList }) {
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const cardsRef = useRef([]);

  
  useEffect(() => {
    const saved = localStorage.getItem("ayat-bookmarks");
    if (saved) setBookmarks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("ayat-bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const isBookmarked = (nomorAyat) =>
    bookmarks.some((b) => b.nomorAyat === nomorAyat);

  const toggleBookmark = (ayat) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.nomorAyat === ayat.nomorAyat);
      return exists
        ? prev.filter((b) => b.nomorAyat !== ayat.nomorAyat)
        : [...prev, ayat]; 
    });
  };

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        if (currentPlayingIndex === index) {
          gsap.to(card, {
            scale: 1.02,
            borderColor: "#aee15f",
            backgroundColor: "rgba(174, 225, 95, 0.5)",
            duration: 0.3,
            ease: "power2.out"
          });

          gsap.to(window, {
            duration: 0.8,
            scrollTo: {
              y: card,
              offsetY: 100
            },
            ease: "power2.inOut"
          });
        } else {
          gsap.to(card, {
            scale: 1,
            backgroundColor: "#ffffff",
            borderColor: "#e5e7eb",
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }
    });
  }, [currentPlayingIndex]);

  const handleAudioEnd = (currentIndex) => {
    if (currentIndex < ayatList.length - 1) {
      setCurrentPlayingIndex(currentIndex + 1);
      setIsPaused(false);
    } else {
      setCurrentPlayingIndex(null);
      setIsPaused(false);
    }
  };

  const handlePlay = (index) => {
    if (currentPlayingIndex === index) {
      setIsPaused(!isPaused);
    } else {
      setCurrentPlayingIndex(index);
      setIsPaused(false);
    }
  };

  const handleClose = () => {
    setCurrentPlayingIndex(null);
    setIsPaused(false);
  };

  const currentAyat =
    currentPlayingIndex !== null ? ayatList[currentPlayingIndex] : null;
  const audioUrl = currentAyat?.audio ? currentAyat.audio["02"] : null;

  return (
    <>
      <div className="flex flex-col w-full">
        {ayatList.map((ayat, index) => (
          <div
            key={ayat.nomorAyat}
            ref={(el) => (cardsRef.current[index] = el)}
            className="relative mb-4 border border-gray-200 p-4 rounded-lg transition-all cursor-pointer"
            onClick={() => handlePlay(index)}
          >
            
            <div className="flex flex-col md:flex-row items-start md:justify-end gap-4 mb-2">
              <div className="flex items-center gap-2 md:w-[20%]">
                <div className="relative w-[55px] h-[55px] flex-shrink-0">
                  <Image src="/noAyat.png" alt="nomor ayat" fill />
                  <span
                    className={`${amiri.className} absolute inset-0 flex items-center justify-center text-[12px] text-[#C9A24D] font-semibold`}
                  >
                    {ayat.nomorAyat}
                  </span>
                </div>
                {currentPlayingIndex === index ? (
                  <div className="flex items-center gap-1 text-[#aee15f]">
                    <div className="w-1 h-4 bg-white rounded-full animate-pulse" />
                    <div className="w-1 h-6 bg-white rounded-full animate-pulse" />
                    <div className="w-1 h-4 bg-white rounded-full animate-pulse" />
                  </div>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Play strokeWidth={1} />
                    </TooltipTrigger>
                    <TooltipContent >
                      Putar Ayat Ini
                    </TooltipContent>
                  </Tooltip>
                )}
                <Tooltip>
                <TooltipTrigger asChild>  
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); 
                          toggleBookmark(ayat);
                        }}
                        
                      >
                        <Bookmark
                        
                          strokeWidth={1}
                          className={
                            isBookmarked(ayat.nomorAyat)
                              ? "text-[#aee15f] fill-[#aee15f]"
                              : "text-black"
                          }
                        />
                      </button>
                </TooltipTrigger>
                <TooltipContent>
                  {isBookmarked(ayat.nomorAyat) ? "Hapus Bookmark" : "Tambah Bookmark"}
                </TooltipContent>
              </Tooltip>
              </div>

              <div className="md:w-[80%] w-full">
                <p
                  dir="rtl"
                  className={`${amiri.className} text-[20px] md:text-[24px] leading-loose `}
                >
                  {ayat.teksArab}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-[#436b07] italic text-[14px]">
                {ayat.teksLatin}
              </p>
              <p className="text-gray-600 text-[14px] text-justify">
                {ayat.teksIndonesia}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* AUDIO PLAYER BAWAH (ASLI, GA DISENTUH) */}
      {currentPlayingIndex !== null && audioUrl && (
        <div className="w-full fixed bottom-0 left-0 right-0 backdrop-blur-md bg-white/20 z-50">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <AudioPlayer
                audioUrl={audioUrl}
                ayatNomor={currentAyat.nomorAyat}
                isPlaying={!isPaused}
                onPlay={() => handlePlay(currentPlayingIndex)}
                onEnded={() => handleAudioEnd(currentPlayingIndex)}
              />

              <button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-[#aee15f]"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
