import React, { useEffect, useState } from "react";
import HeaderOutlet from "../../features/Header";
import image1 from "../../assets/1.jpg";
import Card from "../../components/Card";
import useAxiosPrivate from "../../hooks/axiosPrivate";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
const getTypes = async (axiosClient, setLoading, setTypes) => {
  try {
    const response = await axiosClient.get("/types");
    setTypes(response.data.data);
    console.log(response.data.data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
function Types() {
  const [loading, setLoading] = useState(true);
  const [types, setTypes] = useState([]);
  const axiosClient = useAxiosPrivate();
  useEffect(() => {
    getTypes(axiosClient, setLoading, setTypes);
  }, []);
  return (
    <div className="mx-4 my-1">
      <div>
        <HeaderOutlet>Data Types</HeaderOutlet>
        <div className="flex justify-end px-3 pb-3">
          <Link to="add-types">
            <Button className="bg-green-600">Add Types</Button>
          </Link>
        </div>
      </div>
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center ">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {types.map((type, i) => {
            return (
              <Card className="max-h-72 cursor-pointer" key={i}>
                <h2 className="font-bold  text-xl capitalize ">{type.name}</h2>
                <div className="max-w-48 flex justify-center">
                  <img className="rounded-md h-40 object-cover" src={type.image ? import.meta.env.VITE_BASE_URL + "/" + type.image : image1} alt={type.name} />
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Types;
