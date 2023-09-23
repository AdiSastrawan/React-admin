import React, { Suspense, useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/axiosPrivate";
import Spinner from "../../../components/Spinner";
import { Link, useLocation, useParams } from "react-router-dom";
import HeaderOutlet from "../../../features/Header";
import DetailComponent from "../../../features/DetailComponent";
import Button from "../../../components/Button";

function DetailProduct() {
  const location = useLocation();
  const from = location.state.from.pathname || "/";
  return (
    <div className="px-2">
      <Button className="bg-gray-500 text-black px-3 ">
        <Link to={from}>{"<"}</Link>
      </Button>
      <HeaderOutlet>Detail Product</HeaderOutlet>
      <DetailComponent />
    </div>
  );
}

export default DetailProduct;
