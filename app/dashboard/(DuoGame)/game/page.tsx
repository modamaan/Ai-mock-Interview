import React from "react";
import Image from "next/image";
import {Button} from "@/components/ui/button"
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";

const GameDashboard = () => {
  return (
    <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center">
      <div className="relative w-[240px h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
        <Image src="/logo.svg" width={100} height={90} alt="Game" />
      </div>
      <div className="flex flex-col items-center gap-4 max-w-[330px] ">
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center">
          Learn, Practice, and master new technologies with techo
        </h1>
        <SignedIn>
          <Button size="lg" variant="secondary" className="w-1/2" asChild>
            <Link href="/dashboard/learn">Continue Learning</Link>
          </Button>
        </SignedIn>
      </div>
    </div>
  );
};

export default GameDashboard;
