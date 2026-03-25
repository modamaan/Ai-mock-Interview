"use client"
import React from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type Props = {
  label: string;
  iconSrc: string;
  href: string;
};

const SideBarItem = ({ label, iconSrc, href }: Props) => {
  const pathname = usePathname();
  console.log("pathname",href);
  
  const active = pathname === href;
  return (
    <Button
      variant={active ? "primaryOutline" : "primary"}
      className="justify-start h-[52px] mr-2 lg:mr-0 "
      asChild
    >
      <Link href={href}>
        <Image
          src={iconSrc}
          alt={label}
          className="mr-3 lg:mr-5"
          height={32}
          width={32}
        />
        {label}
      </Link>
    </Button>
  );
};

export default SideBarItem;
