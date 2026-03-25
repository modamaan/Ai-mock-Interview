import { Skeleton } from "@/components/ui/skeleton";

export default function InterviewDetailLoading() {
  return (
    <div className="my-10">
      <Skeleton className="h-8 w-56 mx-auto mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-4">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-5 w-1/2" />
          </div>
          <Skeleton className="h-28 rounded-lg" />
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton className="h-72 rounded-lg" />
          <Skeleton className="h-10 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
