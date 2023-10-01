import React, { Suspense, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderOutlet from "../../../features/Header";
import DetailComponent from "../../../features/DetailComponent";
import Button from "../../../components/Button";

function DetailProduct() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state.from.pathname || "/";
  return (
    <div className="px-2 bg-secondary mx-2 py-3 rounded-md min-h-full">
      <Button
        onClick={() => {
          navigate(from);
        }}
        className="bg-gray-500 text-black px-3 "
      >
        {"<"}
      </Button>
      <HeaderOutlet>Detail Product</HeaderOutlet>
      <DetailComponent />
    </div>
  );
}

export default DetailProduct;
