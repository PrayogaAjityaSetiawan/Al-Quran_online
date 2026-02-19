import CardSuratSkeleton from "@/components/cardSuratSkeleton";

export default function Loading() {
  return (
    <div className="w-full flex flex-col items-center pt-24 max-w-6xl mx-auto">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 w-full p-2 md:p-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <CardSuratSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
