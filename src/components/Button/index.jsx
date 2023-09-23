function Button({ type = "button", onClick, disabled = false, className = "", backgroundColor = "accent", textColor = "white", py = "2", px = "2", children }) {
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={` bg-${backgroundColor} rounded-md py-${py} px-${px} text-xl  text-${textColor} ` + className}>
      {children}
    </button>
  );
}

export default Button;
