// hooks/useSearch.ts
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { surat } from '@/types/surat';

export function useSearch(data: surat[], delay = 500) {
  const [search, setSearch] = useState('');
  const [debouncedSearch, { isPending }] = useDebounce(search, delay);

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

  return { search, setSearch, debouncedSearch, isPending, filtered };
}