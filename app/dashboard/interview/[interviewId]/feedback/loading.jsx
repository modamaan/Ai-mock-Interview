import { Skeleton } from "@/components/ui/skeleton";

export default function FeedbackLoading() {
  return (
    <div className="p-10">
      <Skeleton className="h-9 w-64 mb-3" />
      <Skeleton className="h-7 w-80 mb-3" />
      <Skeleton className="h-6 w-56 mb-2" />
      <Skeleton className="h-5 w-96 mb-8" />
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-10 rounded-lg mt-7" />
      ))}
      <Skeleton className="h-10 w-28 rounded-lg mt-6" />
    </div>
  );
}
