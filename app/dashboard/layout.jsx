import React from "react";
import Header from "./_components/Header";
import logo from '../../public/logo.svg'

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Header logo={logo} />
      <div className="mx-5 md:mx-20 lg:mx-36" >
      {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
