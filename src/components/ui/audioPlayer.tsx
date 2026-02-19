"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { gsap } from "gsap";

export default function AudioPlayer({ audioUrl, isPlaying, onPlay, onEnded }) {
  const audioRef = useRef(null);
  const buttonRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const animateButton = () => {
    gsap.to(buttonRef.current, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && !playing) {
      audio.play();
      setPlaying(true);
    } else if (!isPlaying && playing) {
      audio.pause();
      setPlaying(false);
    }
  }, [isPlaying, playing]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      setProgress(0);
      setPlaying(false);

      if (isPlaying) {
        audio.play();
        setPlaying(true);
      }
    }
  }, [audioUrl]);

  const togglePlay = () => {
    animateButton();
    onPlay();
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      setProgress((audio.currentTime / audio.duration) * 100);
    }
  };

  const handleEnded = () => {
    setPlaying(false);
    setProgress(0);
    onEnded();
  };

  return (
    <div className="flex items-center gap-3 w-full">
      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
        preload="metadata"
      />

      {/* Tombol Play/Pause */}
      <button
        ref={buttonRef}
        onClick={togglePlay}
        className="p-2.5 rounded-full bg-[#254F22] dark:bg-[#A3DC9A] hover:bg-[#1a3a18] dark:hover:bg-[#8fcf85] transition-colors flex-shrink-0 shadow-sm"
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing ? (
          <Pause size={18} className="text-white dark:text-[#0f1a0e]" />
        ) : (
          <Play size={18} className="text-white dark:text-[#0f1a0e]" />
        )}
      </button>

      {/* Progress Bar */}
      <div className="flex-1 h-1.5 bg-[#254F22]/10 dark:bg-[#A3DC9A]/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#254F22] dark:bg-[#A3DC9A] rounded-full transition-all duration-200 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}