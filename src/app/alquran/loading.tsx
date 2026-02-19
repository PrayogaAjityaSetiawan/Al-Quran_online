import CardSuratSkeleton from "@/components/cardSuratSkeleton";

export default function Loading() {
  return (
    <div className="w-full flex flex-col items-center pt-24 max-w-6xl mx-auto">

      {/* Search skeleton */}
      <div className="w-full mb-6 h-10 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 w-full p-2 md:p-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <CardSuratSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
