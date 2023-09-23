import React from "react";

function NavLists({ className, children }) {
  return <ul className={"text-white/95 flex flex-col  " + className}>{children}</ul>;
}

export default NavLists;
