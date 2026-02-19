import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Amiri } from "next/font/google";
import { MapPin, BookText } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { surat } from '@/types/surat';

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
});

const CardSurat = ({ surat, active }: { surat: surat, active: boolean }) => {
  return (
    <Card className={`
      transition-all duration-200 cursor-pointer rounded-2xl border-0 shadow-sm
      ${active
        ? 'bg-[#254F22] scale-[1.02] shadow-md'
        : 'bg-[#254F22] dark:bg-[#1a3318] hover:scale-[1.02] hover:shadow-md'
      }
    `}>
      <Link href={`/alquran/${surat.nomor}`}>
        <CardContent className="flex justify-between items-center py-2 px-2">
          <div className="flex items-center gap-3 w-[75%]">
            <div className="relative w-[44px] h-[44px] flex-shrink-0 flex items-center justify-center">
              <Image
                src="/noAyatbaru.png"
                alt="decorative circle"
                fill
                className="object-contain"
              />
              <span className={`${amiri.className} absolute text-[12px] text-white font-semibold`}>
                {surat.nomor}
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[13px] text-white/90 font-medium">
                {surat.arti}
              </span>
              <div className="flex gap-1.5">
                <div className="bg-white/10 border border-white/10 py-0.5 px-2.5 rounded-full flex items-center gap-1">
                  <MapPin strokeWidth={1.5} size={11} className="text-white/70" />
                  <span className="text-[11px] text-white/80">{surat.tempatTurun}</span>
                </div>
                <div className="bg-white/10 border border-white/10 py-0.5 px-2.5 rounded-full flex items-center gap-1">
                  <BookText strokeWidth={1.5} size={11} className="text-white/70" />
                  <span className="text-[11px] text-white/80">{surat.jumlahAyat} Ayat</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-0.5">
            <h1 className={`${amiri.className} text-[26px] font-bold text-[#C9A24D]`}>
              {surat.nama}
            </h1>
            <span className="text-[11px] text-white/60 italic tracking-wide">
              {surat.namaLatin}
            </span>
          </div>

        </CardContent>
      </Link>
    </Card>
  );
};

export default CardSurat;