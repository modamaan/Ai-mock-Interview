"use client"
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from 'next/navigation';

type Props = {
  title: string;
};

const GameHeader = ({ title }: Props) => {
  const pathname = usePathname();
  return (
    <div className="sticky top-0 bg-white pb-3 lg:pt-[28px] lg:mt-[-19px] flex items-center justify-between border-b-2 text-neutral-400 lg:z-50">
      <Link href={`${pathname === "/dashboard/courses" ? "/courses" : "/dashboard/courses"}`}>
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-5 w-5 stroke-2 text-neutral-400" />
        </Button>
      </Link>
      <h1 className="font-bold text-lg">{title}</h1>
      <div/>
    </div>
  );
};

export default GameHeader;
