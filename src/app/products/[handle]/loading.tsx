import Skeleton from "@/components/ui/Skeleton";

export default function ProductLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Gallery */}
        <div>
          <Skeleton className="aspect-square rounded-xl mb-4" />
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="w-16 h-16 lg:w-20 lg:h-20 rounded-lg" />
            ))}
          </div>
        </div>
        {/* Info */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-20" />
          <div className="space-y-2 pt-4">
            <Skeleton className="h-4 w-16" />
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="w-16 h-10 rounded-lg" />
              ))}
            </div>
          </div>
          <Skeleton className="h-12 w-full rounded-md mt-6" />
        </div>
      </div>
    </div>
  );
}
