import { Skeleton } from "@/components/ui/skeleton";

export default function StartInterviewLoading() {
  return (
    <div className="my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Question panel skeleton */}
        <div className="flex flex-col p-5 border rounded-lg bg-secondary gap-4">
          <div className="flex gap-3 mb-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-7 w-16 rounded-full" />
            ))}
          </div>
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-5 w-5" />
        </div>
        {/* Record section skeleton */}
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-64 w-full max-w-[30rem] rounded-lg" />
          <div className="flex gap-4">
            <Skeleton className="h-10 w-36 rounded-lg" />
            <Skeleton className="h-10 w-36 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
