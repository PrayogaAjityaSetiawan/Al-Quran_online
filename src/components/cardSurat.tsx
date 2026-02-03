import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Amiri } from "next/font/google";
import { MapPin, BookText } from 'lucide-react'
const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
})
import { 
  Card, 
  CardContent 
} from '@/components/ui/card'
const CardSurat = ( {surat, active }: { surat: any, active: boolean} ) => {
  return (
    <div>
        <Card key={surat.id} className={`
    transition-transform cursor-pointer
    ${active 
      ? 'bg-[#254F22] text-white scale-105' 
      : 'bg-[#254F22] text-white hover:scale-105'}
  `}>
                    <Link href={`/alquran/${surat.nomor}`}>
                      <CardContent className="flex justify-between items-start">
                        <div className='flex w-[70%]'>
                          <div className="relative w-[50px] h-[50px] flex items-center justify-center">
                            <Image
                              src="/noAyat.png"
                              alt="decorative circle"
                              fill
                              className="object-contain"
                            />
                            <span className="absolute text-[12px]  text-white font-semibold">
                              {surat.nomor}
                            </span>
                          </div>
                          <div>
                            <span className='text-[12px]'>{surat.arti}</span>
                            <div className='flex gap-1 mt-1'>
                              <div className='bg-[#A3B18A] py-1 px-2 rounded-full flex items-center gap-1'>
                                <MapPin strokeWidth={1} size={12} />
                                <span className='text-[12px] '>{surat.tempatTurun}</span>
                              </div>
                              <div className='bg-[#A3B18A] text-white py-1 px-2 rounded-full flex items-center gap-1'>
                                <BookText strokeWidth={1} size={12}/>
                                <span className='text-[12px]'>{surat.jumlahAyat} </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='flex flex-col text-end '>
                          <h1 className={`${amiri.className} text-[24px] font-bold text-[#C9A24D}`}>{surat.nama}</h1>
                          <span className="text-[12px] text-white italic">{surat.namaLatin}</span>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
    </div>
  )
}

export default CardSurat