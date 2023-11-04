import React from "react"
import { NavLink, useLocation } from "react-router-dom"

function Navlist({ className, to, children, bgActive = "accent", bgPending = "secondary" }) {
  const location = useLocation()
  return (
    <NavLink
      to={to}
      state={{ from: location }}
      className={({ isActive }) => {
        return isActive ? ` ${"bg-" + bgActive} p-5 hover:bg-accent transition-colors  ${className}` : `  p-5 hover:bg-accent transition-colors  ${className}`
      }}
    >
      {children}
    </NavLink>
  )
}

export default Navlist
