import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GlobalNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-7xl font-bold text-gray-200">404</h1>
      <h2 className="text-2xl font-semibold mt-4 text-gray-800">Page not found</h2>
      <p className="text-gray-500 mt-2">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/dashboard" className="mt-6">
        <Button>Go to Dashboard</Button>
      </Link>
    </div>
  );
}
