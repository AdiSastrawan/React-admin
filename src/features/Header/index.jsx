import React, { Children } from "react";

function HeaderOutlet({ children, className = "" }) {
  return (
    <div className={"w-full " + className}>
      <h1 className="text-black font-bold text-4xl pt-2 pb-2 ">{children}</h1>
      <div className="w-full h-[1px] bg-gray-500 mb-5"></div>
    </div>
  );
}

export default HeaderOutlet;
