// components/SearchInput.tsx
"use client";

import { Search, X } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  isPending?: boolean;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  isPending = false,
  placeholder = "Cari surat...",
}: SearchInputProps) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        {isPending ? (
          <svg className="w-4 h-4 text-[#254F22] dark:text-[#A3DC9A] animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          <Search size={16} className="text-[#254F22]/50 dark:text-[#A3DC9A]/50" />
        )}
      </div>

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-11 pr-10 py-3 bg-white dark:bg-[#1a3318]/40 border border-[#254F22]/15 dark:border-[#A3DC9A]/15 rounded-2xl text-sm text-[#254F22] dark:text-[#e8f5e4] placeholder:text-[#254F22]/30 dark:placeholder:text-[#A3DC9A]/30 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#254F22]/20 dark:focus:ring-[#A3DC9A]/20 focus:border-[#254F22]/40 dark:focus:border-[#A3DC9A]/40"
      />

      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-3 flex items-center text-[#254F22]/30 dark:text-[#A3DC9A]/30 hover:text-[#254F22] dark:hover:text-[#A3DC9A] transition-colors"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}