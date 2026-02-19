"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { X } from "lucide-react";
import CardAyat from "./cardAyat";
import AudioPlayer from "./ui/audioPlayer";

gsap.registerPlugin(ScrollToPlugin);


export default function AyatListClient({ ayatList }) {
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const cardsRef = useRef([]);


  useEffect(() => {
    if (currentPlayingIndex === null) return;

    const card = cardsRef.current[currentPlayingIndex];
    if (!card) return;

    gsap.to(card, {
      scale: 1.02,
      borderColor: "#aee15f",
      backgroundColor: "rgba(174, 225, 95, 0.5)",
      duration: 0.3,
    });

    gsap.to(window, {
      duration: 0.8,
      scrollTo: { y: card, offsetY: 100 },
      ease: "power2.inOut",
    });

    return () => {
      gsap.to(card, {
        scale: 1,
        backgroundColor: "#ffffff",
        borderColor: "#e5e7eb",
        duration: 0.2,
      });
    };
  }, [currentPlayingIndex]);



  const handlePlay = useCallback((index) => {
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

  const currentAyat =
    currentPlayingIndex !== null ? ayatList[currentPlayingIndex] : null;
  const audioUrl = currentAyat?.audio?.["02"] ?? null;


  return (
    <>
      <div className="relative flex flex-col w-full">
        {ayatList.map((ayat, index) => (
          <CardAyat
            key={ayat.nomorAyat}
            ayat={ayat}
            index={index}
            ref={(el) => (cardsRef.current[index] = el)}
            currentPlayingIndex={currentPlayingIndex}
            onPlay={handlePlay}
          />
        ))}
      </div>


      {currentPlayingIndex !== null && audioUrl && (
        <div className="fixed bottom-0 left-0 right-0 backdrop-blur-md bg-white/20 z-50">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
            <AudioPlayer
              audioUrl={audioUrl}
              isPlaying={!isPaused}
              onPlay={() => handlePlay(currentPlayingIndex)}
              onEnded={handleAudioEnd}
            />

            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-[#aee15f]"
            >
              <X size={22} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
