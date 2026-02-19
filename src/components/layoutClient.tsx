"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BookOpenText, X } from "lucide-react";
import { surat } from "@/types/surat";
import { useSearch } from "@/hooks/useSearch";
import SearchInput from "@/components/searchInput";

export default function LayoutClient({ data }: { data: surat[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { search, setSearch, isPending, filtered } = useSearch(data);

  const isDetail = /^\/alquran\/\d+$/.test(pathname);
  if (!isDetail) return null;

  return (
    <>
      {/* Tombol buka drawer */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-40 p-4 rounded-full bg-[#254F22] dark:bg-[#A3DC9A] text-white dark:text-[#0f1a0e] shadow-lg hover:bg-[#1a3a18] dark:hover:bg-[#8fcf85] transition-colors"
        aria-label="Buka daftar surat"
      >
        <BookOpenText size={22} />
      </button>

      {/* Drawer */}
      {drawerOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="absolute top-0 left-0 h-full w-[80%] max-w-[320px] bg-white/95 dark:bg-[#0f1a0e]/95 backdrop-blur-md border-r border-[#254F22]/10 dark:border-[#A3DC9A]/10 shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-[#254F22]/10 dark:border-[#A3DC9A]/10 flex-shrink-0">
              <span className="text-lg font-bold text-[#254F22] dark:text-[#A3DC9A]">Daftar Surat</span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 rounded-full hover:bg-[#254F22]/10 dark:hover:bg-[#A3DC9A]/10 transition-colors"
              >
                <X size={18} className="text-[#254F22] dark:text-[#A3DC9A]" />
              </button>
            </div>

            {/* Search */}
            <div className="px-4 py-3 border-b border-[#254F22]/10 dark:border-[#A3DC9A]/10 flex-shrink-0">
              <SearchInput
                value={search}
                onChange={setSearch}
                isPending={isPending()}
              />
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
              {filtered.length > 0 ? (
                filtered.map((s) => (
                  <button
                    key={s.nomor}
                    onClick={() => {
                      router.push(`/alquran/${s.nomor}`);
                      setDrawerOpen(false);
                      setSearch("");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors text-[#254F22]/70 dark:text-[#e8f5e4]/60 hover:bg-[#254F22]/10 dark:hover:bg-[#A3DC9A]/10"
                  >
                    <span className="w-7 text-center text-xs flex-shrink-0 text-[#254F22]/40 dark:text-[#A3DC9A]/40">{s.nomor}</span>
                    <span className="text-sm font-medium flex-1">{s.namaLatin}</span>
                    <span className="text-base text-[#C9A24D]">{s.nama}</span>
                  </button>
                ))
              ) : (
                <p className="text-center text-sm text-[#254F22]/40 dark:text-[#A3DC9A]/40 py-8">
                  Surat tidak ditemukan
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}