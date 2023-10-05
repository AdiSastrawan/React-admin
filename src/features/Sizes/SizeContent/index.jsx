import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { Link, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/axiosPrivate";
import Spinner from "../../../components/Spinner";
import Card from "../../../components/Card";

const fetchSizes = async (setData, axiosClient, setIsFetch) => {
  try {
    const response = await axiosClient.get("/size");
    console.log(response.data);
    setData(response.data);
  } catch (error) {
    console.log(error);
  } finally {
    setIsFetch(false);
  }
};
function SizeContent() {
  const axiosClient = useAxiosPrivate();
  const [sizes, setSizes] = useState([]);
  const location = useLocation();
  const [isFetch, setIsFetch] = useState(true);
  useEffect(() => {
    fetchSizes(setSizes, axiosClient, setIsFetch);
  }, []);
  if (isFetch) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  const onClickDeleteHandler = (id) => {};
  return (
    <>
      <div className="flex justify-end px-3 pb-3">
        <Link to="add-size">
          <Button className="bg-green-600">Add Size</Button>
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {sizes.map((size, i) => {
          return (
            <Card className="  cursor-pointer" key={i}>
              <div className="w-full flex justify-center items-center ">
                <h2 className="font-bold  text-xl capitalize text-center ">{size.name}</h2>
              </div>

              <Link className=" flex justify-center" to={`edit-size/${size._id}`}>
                <Button>Edit</Button>
              </Link>
            </Card>
          );
        })}
      </div>
    </>
  );
}

export default SizeContent;
