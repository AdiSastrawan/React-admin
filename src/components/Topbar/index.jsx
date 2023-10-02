import React, { useState } from "react";
import Logout from "../../features/Logout";
import decodeToken from "../../formatter/decodeToken";
import useAuth from "../../hooks/useAuth";

function Topbar() {
  const { auth } = useAuth();
  const { name } = decodeToken(auth.accessToken);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen && (
        <div
          onClick={() => {
            setIsOpen(false);
          }}
          className="fixed inset-0 z-[9999] bg-black/25"
        ></div>
      )}

      <div className="w-full  flex flex-row-reverse bg-primary  py-3 px-6">
        <div
          className={`relative bg-accent  z-[999999] text-lg text-white w-[100px] text-center   cursor-pointer flex flex-col  ${isOpen ? "rounded-t-md" : "rounded-md"}`}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <h1 className="px-5 py-1 rounded-md capitalize cursor-pointer ">{name}</h1>
          <Logout className={`text-base bg-none py-1 px-3 w-full border-t-secondary border-t rounded-b-md  transition-all ${isOpen ? "opacity-100 z-[999999] translate-y-8" : "opacity-0 -z-[999999]"}  absolute `} />
        </div>
      </div>
    </>
  );
}

export default Topbar;
