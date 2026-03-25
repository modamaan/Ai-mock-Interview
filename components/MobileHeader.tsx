import React from "react";
import MobileSidebar from "./MobileSidebar";

const MobileHeader = () => {
  return (
    <nav className="lg:hidden px-6 h-[50px] flex items-center bg-yellow-500 border-b w-full z-50">
      <MobileSidebar/>
    </nav>
  );
};

export default MobileHeader;
