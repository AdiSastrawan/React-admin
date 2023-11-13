import React, { useState } from "react";
import HeaderOutlet from "../../../features/Header";
import Label from "../../../components/Label";
import Input from "../../../components/Input";
import Dropinput from "../../../components/Dropinput";
import Button from "../../../components/Button";
import useAxiosPrivate from "../../../hooks/axiosPrivate";
import Spinner from "../../../components/Spinner";
import { useNavigate } from "react-router-dom";

const sentTypes = async (axiosClient, formData, setLoading, navigate) => {
  try {
    await axiosClient.post("/types", formData, {
      headers: { "content-type": "multipart/form-data" },
    });
    navigate("/types");
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
function AddTypes() {
  const axiosClient = useAxiosPrivate();
  const [isDrag, setIsDrag] = useState(false);
  const [payload, setPayload] = useState({ name: "", image: undefined });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(payload);
    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("image", payload.image);
    sentTypes(axiosClient, formData, setLoading, navigate);
    // setLoading(false);
  };
  return (
    <div className="mx-4">
      <HeaderOutlet>Add Types</HeaderOutlet>
      <div>
        <form onSubmit={onSubmitHandler} action="" className="bg-secondary p-4 rounded-md flex flex-col gap-2">
          <Label>Name</Label>
          <Input
            type="text"
            value={payload.name}
            onChange={(e) => {
              setPayload((prev) => {
                let tmp = { ...prev };
                tmp.name = e.target.value;
                return tmp;
              });
            }}
          />
          <Label>Image</Label>
          <Dropinput setIsDrag={setIsDrag} isDrag={isDrag} payload={payload} setPayload={setPayload} />
          <Button disabled={loading} type="submit" className="mt-2">
            {loading ? <Spinner /> : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddTypes;
