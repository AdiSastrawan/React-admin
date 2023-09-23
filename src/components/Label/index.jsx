import React, { Children } from "react";

function Label({ children, className = "" }) {
  return (
    <label className={" text-lg font-medium " + className} htmlFor="">
      {children}
    </label>
  );
}

export default Label;
