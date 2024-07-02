"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
const Header = ({ logo }) => {
  const [isUserButtonLoaded, setUserButtonLoaded] = useState(false);

  const SkeletonLoader = () => (
    <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setUserButtonLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, []);
  return (
    <div className=" bg-secondary shadow-sm ">
      <div className="w-[80%] m-auto flex gap-4 items-center justify-between">
        <a href="/dashboard">
          <Image src={logo} width={80} height={80} alt="logo" />
        </a>
        <ul className="hidden md:flex gap-6">
          <a href="/dashboard">
            <li
              className={`hover:text-black hover:font-bold transition-all cursor-pointer ${
                path == "/dashboard" && "text-black font-bold"
              }`}
            >
              Dashboard
            </li>
          </a>

          <li
            className={`hover:text-black hover:font-bold transition-all cursor-pointer ${
              path == "/dashboard/questions" && "text-black font-bold"
            }`}
          >
            Questions
          </li>
          <a href="/dashboard/upgrade">
            <li
              className={`hover:text-black hover:font-bold transition-all cursor-pointer ${
                path == "/dashboard/upgrade" && "text-black font-bold"
              }`}
            >
              Upgrade
            </li>
          </a>

          <a href="/dashboard/howit">
            <li
              className={`hover:text-black hover:font-bold transition-all cursor-pointer ${
                path == "/dashboard/how" && "text-black font-bold"
              }`}
            >
              How it works?
            </li>
          </a>
        </ul>
        {isUserButtonLoaded ? <UserButton /> : <SkeletonLoader />}
      </div>
    </div>
  );
};

export default Header;
