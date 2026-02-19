import React, { forwardRef } from "react";
import Image from "next/image";
import { Amiri } from "next/font/google";
import { Bookmark, Play } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
});

interface CardAyatProps {
  ayat: any;
  index: number;
  currentPlayingIndex: number | null;
  onPlay: (index: number) => void;
}

const CardAyat = forwardRef<HTMLDivElement, CardAyatProps>(function CardAyat(
  { ayat, index, currentPlayingIndex, onPlay },
  ref
) {
  const isPlaying = currentPlayingIndex === index;

  return (
    <div
      ref={ref}
      onClick={() => onPlay(index)}
      className={`
        relative mb-4 p-5 rounded-2xl transition-all cursor-pointer
        border
        ${isPlaying
          ? "border-[#254F22]/40 bg-[#254F22]/5 dark:bg-[#254F22]/20 shadow-md"
          : "border-[#254F22]/10 bg-white dark:bg-[#1a3318]/40 hover:border-[#254F22]/30 dark:hover:border-[#A3DC9A]/20 hover:shadow-sm"
        }
      `}
    >
      <div className="flex flex-col md:flex-row items-start md:justify-end gap-4 mb-4">

        <div className="flex items-center gap-3 md:w-[20%]">

          <div className="relative w-[48px] h-[48px] flex-shrink-0">
            <Image src="/noAyat.png" alt="nomor ayat" fill />
            <span className={`${amiri.className} absolute inset-0 flex items-center justify-center text-[12px] text-[#C9A24D] font-semibold`}>
              {ayat.nomorAyat}
            </span>
          </div>

          {isPlaying ? (
            <div className="flex items-end gap-[3px] h-6">
              <div className="w-[3px] h-3 bg-[#254F22] dark:bg-[#A3DC9A] rounded-full animate-pulse" />
              <div className="w-[3px] h-5 bg-[#254F22] dark:bg-[#A3DC9A] rounded-full animate-pulse" />
              <div className="w-[3px] h-3 bg-[#254F22] dark:bg-[#A3DC9A] rounded-full animate-pulse" />
            </div>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-1.5 rounded-full hover:bg-[#254F22]/10 dark:hover:bg-[#A3DC9A]/10 transition-colors">
                  <Play
                    strokeWidth={1.5}
                    size={18}
                    className="text-[#254F22] dark:text-[#A3DC9A]"
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>Putar Ayat Ini</TooltipContent>
            </Tooltip>
          )}

          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-1.5 rounded-full hover:bg-[#254F22]/10 dark:hover:bg-[#A3DC9A]/10 transition-colors">
                <Bookmark
                  strokeWidth={1.5}
                  size={18}
                  className="text-[#254F22] dark:text-[#A3DC9A]"
                />
              </button>
            </TooltipTrigger>
            <TooltipContent>Simpan Ayat</TooltipContent>
          </Tooltip>
        </div>

        <div className="md:w-[80%] w-full">
          <p
            dir="rtl"
            className={`${amiri.className} text-[22px] md:text-[26px] leading-loose text-gray-800 dark:text-[#e8f5e4]`}
          >
            {ayat.teksArab}
          </p>
        </div>
      </div>

      <div className="w-full h-px bg-[#254F22]/10 dark:bg-[#A3DC9A]/10 mb-4" />

      <div className="flex flex-col gap-2 px-1">
        <p className="text-[#254F22] dark:text-[#A3DC9A] italic text-[13px] leading-relaxed">
          {ayat.teksLatin}
        </p>
        <p className="text-gray-500 dark:text-[#e8f5e4]/60 text-[13px] leading-relaxed text-justify">
          {ayat.teksIndonesia}
        </p>
      </div>
    </div>
  );
});

export default CardAyat;