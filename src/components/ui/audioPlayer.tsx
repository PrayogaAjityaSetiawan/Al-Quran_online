"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { gsap } from "gsap";

export default function AudioPlayer({ audioUrl, isPlaying, onPlay, onEnded }) {
  const audioRef = useRef(null);
  const buttonRef = useRef(null);
  
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Animasi tombol saat diklik
  const animateButton = () => {
    gsap.to(buttonRef.current, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && !playing) {
      audio.play();
      setPlaying(true);
    } else if (!isPlaying && playing) {
      // Hanya pause, JANGAN reset progress
      audio.pause();
      setPlaying(false);
    }
  }, [isPlaying, playing]);

  // Reset audio HANYA saat ganti ayat (URL berubah)
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      setProgress(0);
      setPlaying(false);
      
      // Auto play jika isPlaying true
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
      const progressPercent = (audio.currentTime / audio.duration) * 100;
      setProgress(progressPercent);
    }
  };

  const handleEnded = () => {
    setPlaying(false);
    setProgress(0);
    onEnded();
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-3">
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={handleEnded}
          onTimeUpdate={handleTimeUpdate}
          preload="metadata"
        />
        <button
          ref={buttonRef}
          onClick={togglePlay}
          className="p-2 rounded-full bg-[#aee155] hover:bg-[#b8933d] transition-colors flex-shrink-0"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <Pause size={20} className="text-white" />
          ) : (
            <Play size={20} className="text-white" />
          )}
        </button>
        
        {/* Progress Bar - Selalu tampil dan tidak reset saat pause */}
        <div className="flex-1 h-2 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#aee155] transition-all duration-200 ease-linear"
            style={{ 
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}