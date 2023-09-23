import React from "react";
import Logout from "../../features/Logout";

function Topbar() {
  return (
    <div className="w-full  flex flex-row-reverse bg-primary  py-3 px-2">
      <Logout className="text-lg py-1 min-w-[8px]" />
    </div>
  );
}

export default Topbar;
