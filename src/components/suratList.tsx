'use client';

import CardSurat from '@/components/cardSurat';
import CardSuratSkeleton from '@/components/cardSuratSkeleton';
import SearchInput from '@/components/searchInput';
import { useSearch } from '@/hooks/useSearch';
import { surat } from '@/types/surat';

export default function SuratList({ data }: { data: surat[] }) {
  const { search, setSearch, debouncedSearch, isPending, filtered } = useSearch(data);

  return (
    <>
      <div className="max-w-[600px] mx-auto mb-6">
        <SearchInput
          value={search}
          onChange={setSearch}
          isPending={isPending()}
        />
      </div>

      {debouncedSearch && !isPending() && (
        <p className="text-xs text-[#254F22]/40 dark:text-[#A3DC9A]/40 -mt-4 mb-5 px-1 max-w-[600px] mx-auto">
          Ditemukan{' '}
          <span className="font-semibold text-[#254F22] dark:text-[#A3DC9A]">{filtered.length}</span>{' '}
          surat untuk &quot;{debouncedSearch}&quot;
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 w-full p-2 md:p-4">
        {isPending() ? (
          Array.from({ length: 12 }).map((_, i) => <CardSuratSkeleton key={i} />)
        ) : filtered.length > 0 ? (
          filtered.map((s) => (
            <CardSurat key={s.nomor} surat={s} active={false} />
          ))
        ) : (
          <p className="col-span-full text-center text-sm text-[#254F22]/40 dark:text-[#A3DC9A]/40 py-10">
            Surat tidak ditemukan
          </p>
        )}
      </div>
    </>
  );
}