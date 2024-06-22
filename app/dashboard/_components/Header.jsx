"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
const Header = ({ logo }) => {
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, []);
  return (
    <div className=" bg-secondary shadow-sm ">
      <div className="w-[80%] m-auto flex gap-4 items-center justify-between">
        <Image src={logo} width={80} height={80} alt="logo" />
        <ul className="hidden md:flex gap-6">
          <li
            className={`hover:text-black hover:font-bold transition-all cursor-pointer ${
              path == "/dashboard" && "text-black font-bold"
            }`}
          >
            Dashboard
          </li>
          <li
            className={`hover:text-black hover:font-bold transition-all cursor-pointer ${
              path == "/dashboard/questions" && "text-black font-bold"
            }`}
          >
            Questions
          </li>
          <a href="/dashboard/upgrade" >
            <li
              className={`hover:text-black hover:font-bold transition-all cursor-pointer ${
                path == "/dashboard/upgrade" && "text-black font-bold"
              }`}
            >
              Upgrade
            </li>
          </a>

          <li
            className={`hover:text-black hover:font-bold transition-all cursor-pointer ${
              path == "/dashboard/how" && "text-black font-bold"
            }`}
          >
            How it works?
          </li>
        </ul>
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
