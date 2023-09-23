import React from "react";

function Select({ children, className = "", onChange, value, name, id }) {
  return (
    <select name={name} id={id} className={`bg-white text-black rounded-md outline-accent ${className}`} onChange={onChange} value={value}>
      {children}
    </select>
  );
}

export default Select;
