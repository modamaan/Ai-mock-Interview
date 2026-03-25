"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Log to an error monitoring service here (e.g. Sentry)
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-bold text-red-500">Something went wrong</h1>
      <p className="text-gray-500 mt-3 max-w-md">
        An unexpected error occurred. You can try again or go back to the dashboard.
      </p>
      <div className="flex gap-4 mt-6">
        <Button onClick={reset}>Try again</Button>
        <Link href="/dashboard">
          <Button variant="outline">Go to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
