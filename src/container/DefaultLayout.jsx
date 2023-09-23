import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Topbar from "../components/Topbar";

function DefaultLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar />

      <div className="w-full flex flex-col h-screen">
        <Topbar />
        <div className=" h-screen overflow-y-auto py-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
