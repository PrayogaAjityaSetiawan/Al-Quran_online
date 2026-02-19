export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-6 mt-24 space-y-6">

      <div className="w-full h-32 rounded-2xl bg-[#254F22]/5 dark:bg-[#A3DC9A]/5 animate-pulse" />

      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl border border-[#254F22]/10 dark:border-[#A3DC9A]/10 bg-[#254F22]/5 dark:bg-[#A3DC9A]/5 animate-pulse space-y-4"
          >

            <div className="flex justify-between items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#254F22]/10 dark:bg-[#A3DC9A]/10" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-full rounded-full bg-[#254F22]/10 dark:bg-[#A3DC9A]/10 ml-auto" />
                <div className="h-4 w-3/4 rounded-full bg-[#254F22]/10 dark:bg-[#A3DC9A]/10 ml-auto" />
              </div>
            </div>

            <div className="w-full h-px bg-[#254F22]/10 dark:bg-[#A3DC9A]/10" />

            <div className="space-y-2">
              <div className="h-3 w-full rounded-full bg-[#254F22]/10 dark:bg-[#A3DC9A]/10" />
              <div className="h-3 w-5/6 rounded-full bg-[#254F22]/10 dark:bg-[#A3DC9A]/10" />
              <div className="h-3 w-4/6 rounded-full bg-[#254F22]/10 dark:bg-[#A3DC9A]/10" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}