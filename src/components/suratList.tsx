'use client';

import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import CardSurat from '@/components/cardSurat';
import CardSuratSkeleton from '@/components/cardSuratSkeleton';
import { surat } from '@/types/surat';

export default function SuratList({ data }: { data: surat[] }) {
  const [search, setSearch] = useState('');
  const [debouncedSearch, { isPending }] = useDebounce(search, 3000);

  const filtered = !debouncedSearch
    ? data
    : data.filter((s) => {
        const keyword = debouncedSearch.toLowerCase();
        return (
          s.namaLatin.toLowerCase().includes(keyword) ||
          s.nama.toLowerCase().includes(keyword) ||
          s.arti.toLowerCase().includes(keyword) ||
          String(s.nomor).includes(keyword)
        );
      });

  return (
    <>
      {/* Search Bar */}
      <div className="relative max-w-[600px] mx-auto mb-6">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          {isPending() ? (
            <svg
              className="w-4 h-4 text-emerald-500 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 text-emerald-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
          )}
        </div>

        <input
          type="text"
          placeholder="Cari surat (nama / arti / nomor)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-10 py-3 bg-white border border-gray-200 rounded-2xl text-sm text-gray-800 placeholder-gray-400 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 hover:border-gray-300"
        />

        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute inset-y-0 right-3 flex items-center text-gray-300 hover:text-gray-500 transition-colors duration-150"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Result Count */}
      {debouncedSearch && !isPending() && (
        <p className="text-xs text-gray-400 -mt-4 mb-5 px-1">
          Ditemukan{' '}
          <span className="font-semibold text-emerald-500">{filtered.length}</span>{' '}
          surat untuk &quot;{debouncedSearch}&quot;
        </p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 w-full p-2 md:p-4">
        {isPending() ? (
          Array.from({ length: 12 }).map((_, i) => <CardSuratSkeleton key={i} />)
        ) : filtered.length > 0 ? (
          filtered.map((surat) => (
            <CardSurat key={surat.nomor} surat={surat} active={false} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400 py-10">
            Surat tidak ditemukan
          </p>
        )}
      </div>
    </>
  );
}