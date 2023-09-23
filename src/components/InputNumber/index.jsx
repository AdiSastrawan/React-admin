import React from 'react'

function InputNumber({}) {
  return (
    <input
    type="number"
    value={value}
    onChange={onChange}
    accept={accept}
    name={name}
    placeholder={placeholder}
    required={required}
    className={className + ` px-${px} rounded-md py-${py} outline-none text-black  focus-visible:outline-accent `}
  />
  )
}

export default InputNumber
