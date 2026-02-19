
import React, { Suspense } from "react"
import Sidebar from "@/components/Sidebar"
import { surat } from "@/types/surat"
import CardSuratSkeleton from "@/components/cardSuratSkeleton"


export default async function Layout( { children}: { children: React.ReactNode } ) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/v2/surat`, { cache: 'force-cache' })
    const resData = await res.json()
    const data: surat[] = resData.data


    
  return (
    <div className="min-h-screen mt-24">
        <aside className="hidden md:block w-[30%]  fixed top-24 bottom-0 overflow-y-scroll px-4">
            <div className="flex flex-col gap-2">   
                <Suspense fallback={<CardSuratSkeleton />}>
                    <Sidebar  
                        data={data} 
                    />
                </Suspense>
            </div>
        </aside>
        <main className="w-full md:w-[70%]  md:ml-[30%]">
            {children}
        </main>
    </div>
  )
}
