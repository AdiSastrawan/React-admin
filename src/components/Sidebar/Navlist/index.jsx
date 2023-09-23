import React from "react";
import { NavLink } from "react-router-dom";

function Navlist({ className, to, children, bgActive = "accent", bgPending = "secondary" }) {
  return (
    <NavLink to={to} className={`p-5 hover:bg-accent transition-colors  ${className}`}>
      {children}
    </NavLink>
  );
}

export default Navlist;
