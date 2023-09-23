import React from "react";

function Input({ type = "text", value = "", onChange = undefined, name, accept, placeholder, required, className = "", px = "2", py = "2" }) {
  return (
    <input
      type={type}
      defaultValue={value}
      value={value}
      onChange={onChange}
      accept={accept}
      name={name}
      placeholder={placeholder}
      required={required}
      className={className + ` px-${px} rounded-md py-${py} outline-none text-black  focus-visible:outline-accent `}
    />
  );
}

export default Input;
