import React from "react";

function Option({ children, className = "" }) {
  return <option className={` ${className}`}>{children}</option>;
}

export default Option;
