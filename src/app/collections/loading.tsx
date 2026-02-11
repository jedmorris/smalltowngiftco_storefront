import Skeleton from "@/components/ui/Skeleton";

export default function CollectionsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <Skeleton className="h-10 w-56 mx-auto mb-3" />
        <Skeleton className="h-4 w-72 mx-auto" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[4/5] rounded-xl" />
        ))}
      </div>
    </div>
  );
}
