import React, { Children } from "react";
import Button from "../../components/Button";
import { Link, useLocation } from "react-router-dom";

function HeaderOutlet({ children, className = "" }) {
  return (
    <div className={"w-full " + className}>
      <h1 className="text-black font-bold text-4xl pt-2 ">{children}</h1>
      <div className="w-full h-[1px] bg-gray-500 mb-5"></div>
    </div>
  );
}

export default HeaderOutlet;
