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
  { ayat, index, currentPlayingIndex, onPlay, },
  ref
) {
  return (
    <div
      ref={ref}
      className="relative mb-4 border border-gray-200 p-4 rounded-lg transition-all cursor-pointer bg-white"
      onClick={() => onPlay(index)}
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
              <div className="w-1 h-4 bg-[#aee15f] rounded-full animate-pulse" />
              <div className="w-1 h-6 bg-[#aee15f] rounded-full animate-pulse" />
              <div className="w-1 h-4 bg-[#aee15f] rounded-full animate-pulse" />
            </div>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Play strokeWidth={1} />
              </TooltipTrigger>
              <TooltipContent>Putar Ayat Ini</TooltipContent>
            </Tooltip>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                
              >
                <Bookmark
                  strokeWidth={1}
                />
              </button>
            </TooltipTrigger>
            <TooltipContent>    
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="md:w-[80%] w-full">
          <p
            dir="rtl"
            className={`${amiri.className} text-[20px] md:text-[24px] leading-loose`}
          >
            {ayat.teksArab}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-[#254F22] italic text-[14px]">{ayat.teksLatin}</p>
        <p className="text-gray-600 text-[14px] text-justify">
          {ayat.teksIndonesia}
        </p>
      </div>
    </div>
  );
});

export default CardAyat;
