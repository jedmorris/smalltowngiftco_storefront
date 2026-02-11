import Skeleton from "@/components/ui/Skeleton";

export default function CollectionLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <Skeleton className="h-10 w-48 mx-auto mb-3" />
        <Skeleton className="h-4 w-64 mx-auto" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="aspect-square rounded-xl mb-3" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
