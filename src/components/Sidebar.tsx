"use client"

import { useRef } from "react"
import { useParams } from "next/navigation"
import CardSurat from "./cardSurat"
import { surat } from "@/types/surat"

type Props = {
  data: surat[]
}

const Sidebar = ({ data }: Props) => {
  const params = useParams()
  const activeSurat = Number(params?.id)
  const containerRef = useRef<HTMLDivElement | null>(null)

  return (
    <div ref={containerRef} className="flex flex-col gap-2">
      {data.map((surat) => {
        const isActive = activeSurat === surat.nomor

        return (
          <div key={surat.nomor}>
            <CardSurat surat={surat} active={isActive} />
          </div>
        )
      })}
    </div>
  )
}

export default Sidebar
