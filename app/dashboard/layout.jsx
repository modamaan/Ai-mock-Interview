"use client";
import React,{useEffect} from "react";
import { Toaster } from "@/components/ui/sonner"
import Header from "./_components/Header";
import {usePathname} from 'next/navigation'
import logo from "../../public/logo.svg";
import { createContext, useState } from "react";
export const WebCamContext = createContext();

const DashboardLayout = ({ children }) => {
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  // noMargin && !noMargin ? 'mx-5 md:mx-20 lg:mx-36' : ''
  const pathname = usePathname()

  return (
    <div>
      <Toaster/>
        <Header logo={logo} />
        <div className={
        pathname !== '/dashboard/learn' && pathname !== '/dashboard/courses' 
        ? 'mx-5 md:mx-20 lg:mx-36' 
        : ''
    }>
          <WebCamContext.Provider value={{ webCamEnabled, setWebCamEnabled }}>
            {children}
          </WebCamContext.Provider>
        </div>
    </div>
  );
};

export default DashboardLayout;
