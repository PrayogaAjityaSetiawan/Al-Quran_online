import { Card, CardContent } from "@/components/ui/card";

export default function CardSuratSkeleton() {
  return (
    <Card className="bg-[#254F22]/20 text-white animate-pulse">
      <CardContent className="flex justify-between items-start">
        <div className="flex w-[70%]">
          <div className="relative w-[50px] h-[50px] flex items-center justify-center">
            <div className="w-[50px] h-[50px] rounded-full bg-white/20" />
          </div>
          <div className="ml-2 flex flex-col gap-2">
            <div className="h-3 w-24 bg-white/20 rounded" />
            <div className="flex gap-1 mt-1">
              <div className="h-5 w-14 bg-white/20 rounded-full" />
              <div className="h-5 w-12 bg-white/20 rounded-full" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="h-6 w-16 bg-white/20 rounded" />
          <div className="h-3 w-20 bg-white/20 rounded" />
        </div>
      </CardContent>
    </Card>
  );
}
