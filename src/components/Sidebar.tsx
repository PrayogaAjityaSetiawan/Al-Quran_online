"use client"
import React  from "react"
import { useParams } from "next/navigation"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import CardSurat from "./cardSurat"
import { surat } from "@/types/surat"
import { memo } from "react"

const Sidebar = ({ data }: { data: surat[] }) => {
  const params = useParams()
  const activeSurat = Number(params?.id)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    gsap.fromTo(
      containerRef.current.children,
      {
        opacity: 0,
        x: -20,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1, 
        ease: "power2.out",
      }
    )
  }, [])

  return (
    <div ref={containerRef} className="flex flex-col gap-2">
      {data.map((surat) => {
        const isActive = activeSurat === surat.nomor

        return (
          <div key={surat.nomor}>
            <CardSurat
              surat={surat}
              active={isActive}
            />
          </div>
        )
      })}
    </div>
  )
}

export default memo(Sidebar)
