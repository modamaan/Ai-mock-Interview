"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function DashboardError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <h2 className="text-2xl font-bold text-red-500">Something went wrong!</h2>
      <p className="text-gray-500 mt-2 max-w-sm">
        {error?.message || "An unexpected error occurred. Please try again."}
      </p>
      <div className="flex gap-4 mt-6">
        <Button onClick={reset}>Try again</Button>
        <Button variant="outline" onClick={() => (window.location.href = "/dashboard")}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
