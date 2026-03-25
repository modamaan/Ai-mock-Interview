
import Sidebar from "@/components/Sidebar";
import React from "react";


type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children}: Props) => {
  return (
    <div className="flex">
      
      <Sidebar className="hidden lg:flex" />
      <main className="h-[100vh] w-full ">
        <div className=" h-[100vh] max-w-[1056px]">
          {children}</div>
      </main>
    </div>
  );
};

export default MainLayout;
