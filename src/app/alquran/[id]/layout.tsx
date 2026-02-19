// app/alquran/layout.tsx
import React, { Suspense } from "react";
import Sidebar from "@/components/Sidebar";
import { surat } from "@/types/surat";
import CardSuratSkeleton from "@/components/cardSuratSkeleton";
import LayoutClient from "@/components/layoutClient";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/v2/surat`, { cache: "force-cache" });
  const resData = await res.json();
  const data: surat[] = resData.data;

  return (
    <div className="min-h-screen mt-24">

      <aside className="hidden md:flex flex-col gap-2 w-[30%] fixed top-24 bottom-0 overflow-y-auto px-4 z-10">
        <Suspense fallback={<CardSuratSkeleton />}>
          <Sidebar data={data} />
        </Suspense>
      </aside>

      <LayoutClient data={data} />

      <main className="w-full md:w-[70%] md:ml-[30%] px-1 md:px-4">
        {children}
      </main>

    </div>
  );
}