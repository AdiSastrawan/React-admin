import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/axiosPrivate";
import { useNavigate, useParams } from "react-router-dom";
import Label from "../../../components/Label";
import Button from "../../../components/Button";
import Spinner from "../../../components/Spinner";
import Input from "../../../components/Input";

const updateSize = async (axiosClient, setLoading, data, navigate, id) => {
  try {
    await axiosClient.put(`/size/${id}`, data);
    navigate("/sizes");
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
const fetchSize = async (axiosClient, setData, setLoading, id) => {
  try {
    const response = await axiosClient.get(`/size/${id}`);
    setData(response.data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
function EditContent() {
  const { id } = useParams();
  const [data, setData] = useState({ _id: id, name: "" });
  const axiosClient = useAxiosPrivate();
  const [isFetch, setIsFetch] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchSize(axiosClient, setData, setIsFetch, id);
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    updateSize(axiosClient, setLoading, data, navigate, id);
  };
  if (isFetch) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="bg-background p-4 rounded-md ">
      <form onSubmit={submitHandler} className=" flex flex-col space-y-2  " action="">
        <Label>Name</Label>
        <Input
          value={data.name}
          className=""
          onChange={(e) => {
            setData((prev) => {
              let tmp = { ...prev };
              tmp.name = e.target.value;
              return tmp;
            });
          }}
          type="text"
        />
        <Button disabled={loading} type="submit">
          {loading ? <Spinner /> : "Submit"}
        </Button>
      </form>
    </div>
  );
}

export default EditContent;
