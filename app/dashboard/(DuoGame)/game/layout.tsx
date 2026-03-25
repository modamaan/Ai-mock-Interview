import React from "react";
import Footer from "./footer";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center">
        {children}
      </main>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default layout;
