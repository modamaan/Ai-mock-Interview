import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="p-10">
      <Skeleton className="h-8 w-40 mb-2" />
      <Skeleton className="h-5 w-64 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-5">
        <Skeleton className="h-24 rounded-lg" />
      </div>
      <Skeleton className="h-6 w-48 mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
