import React, { useState } from "react";
import Input from "../../../components/Input";
import Label from "../../../components/Label";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/axiosPrivate";
import Spinner from "../../../components/Spinner";

const addSize = async (axiosClient, setLoading, data, navigate) => {
  try {
    await axiosClient.post("/size", data);
    navigate("/sizes");
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

function AddContent() {
  const [name, setName] = useState("");
  const axiosClient = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    addSize(axiosClient, setLoading, { name }, navigate);
  };
  return (
    <div className="bg-background p-4 rounded-md">
      <form onSubmit={submitHandler} className=" flex flex-col space-y-2  " action="">
        <Label>Name</Label>
        <Input
          value={name}
          className=""
          onChange={(e) => {
            setName(e.target.value);
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

export default AddContent;
