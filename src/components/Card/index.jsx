import React from "react";

function Card({ children, className = "" }) {
  return <div className={` bg-background rounded-md min-h-[160px] min-w-[200px] p-4 space-y-2 ${className}`}>{children}</div>;
}

export default Card;
