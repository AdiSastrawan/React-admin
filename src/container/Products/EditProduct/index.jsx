import React, { Suspense, useEffect, useRef, useState } from "react";
import HeaderOutlet from "../../../features/Header";
import Input from "../../../components/Input";
import Label from "../../../components/Label";
import Button from "../../../components/Button";
import StockElement from "../../../features/StockElement";
import useAxiosPrivate from "../../../hooks/axiosPrivate";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import Select from "../../../components/Select";

const getType = async (setType, axiosClient) => {
  try {
    const response = await axiosClient.get("/types");
    setType(response.data.data);
  } catch (error) {
    console.log(error);
  }
};

const getProduct = async (setPayload, id, axiosClient, setIsFetch) => {
  try {
    const response = await axiosClient.get(`/products/${id}`);
    setPayload((prev) => {
      let tmp = { ...prev };
      tmp.name = response.data.name;
      tmp.price = response.data.price;
      tmp.type = response.data.type._id;
      tmp.desc = response?.data.desc;
      tmp.stock = [...response.data.stock];
      tmp.image = response?.data.image;
      return tmp;
    });
  } catch (error) {
    console.log(error);
  } finally {
    setIsFetch(false);
  }
};
const sendData = async (formData, setLoading, navigate, id, axiosClient) => {
  try {
    await axiosClient.put(`/products/${id}`, formData, {
      headers: { "content-type": "multipart/form-data" },
    });
    navigate("/products");
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};
const getSize = async (setSize, axiosClient) => {
  try {
    const response = await axiosClient.get("/size");
    setSize(response.data.data);
  } catch (error) {
    console.log(error);
  }
};
function EditProduct() {
  const { id } = useParams();
  const axiosClient = useAxiosPrivate();
  const [type, setType] = useState([]);
  const [size, setSize] = useState([]);
  const [isDrag, setIsDrag] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isFetch, setIsFetch] = useState(true);
  const [payload, setPayload] = useState({ name: "", image: {}, type: "", price: 0, stock: [{ size_id: null, quantity: 0 }], desc: "" });
  const location = useLocation();
  const from = location.state.from.pathname || "/";
  const deleteHandler = (i) => {
    setPayload((prev) => {
      let tmp = { ...prev };
      tmp.stock.splice(i, 1);
      return tmp;
    });
  };
  const imageRef = useRef();
  useEffect(() => {
    getProduct(setPayload, id, axiosClient, setIsFetch);
    getType(setType, axiosClient);
    getSize(setSize, axiosClient);
  }, []);

  const changeHandler = (e, key) => {
    setPayload((prev) => {
      let temp = { ...prev };
      temp[key] = key == "image" ? e.target.files[0] : e.target.value;
      return temp;
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("type", payload.type);
    formData.append("desc", payload.desc);
    formData.append("image", payload.image);
    formData.append("stock", JSON.stringify(payload.stock));
    formData.append("price", payload.price);

    setLoading(true);
    sendData(formData, setLoading, navigate, id, axiosClient);
  };
  const dropHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPayload((prev) => {
      let tmp = { ...prev };
      tmp.image = e.dataTransfer.files[0];
      return tmp;
    });
    setIsDrag(false);
    setPreviewImage(URL.createObjectURL(e.dataTransfer.files[0]));
  };
  return (
    <div
      className="mx-4 my-2 p-3 rounded-md bg-secondary"
      onDragOver={(e) => {
        e.preventDefault();
        setIsDrag(true);
      }}
    >
      <Button
        onClick={() => {
          navigate(from);
        }}
        className="bg-gray-500 text-black px-3 "
      >
        {"<"}
      </Button>
      <HeaderOutlet>Edit Product</HeaderOutlet>
      {isFetch ? (
        <div className="w-full min-h-screen flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <form onSubmit={submitHandler} className="grid grid-cols-2 gap-2" action="">
          <div className="flex flex-col space-y-2">
            <Label>Product Name</Label>
            <Input
              type="text"
              name="product"
              py="2"
              onChange={(e) => {
                changeHandler(e, "name");
              }}
              placeholder="Product Name"
              value={payload.name}
            />
            <Label>Type</Label>
            <Select
              className="capitalize px-2"
              onChange={(e) => {
                changeHandler(e, "type");
              }}
              name="type"
              id=""
            >
              {type.map((t, i) => {
                if (t._id == payload.type) {
                  return (
                    <option key={i} className="capitalize" selected value={t._id}>
                      {t.name}
                    </option>
                  );
                }
                return (
                  <option key={i} className="capitalize" value={t._id}>
                    {t.name}
                  </option>
                );
              })}
            </Select>
            <Label>Description</Label>
            <textarea
              name="description"
              onChange={(e) => {
                changeHandler(e, "desc");
              }}
              id=""
              cols="20"
              rows="5"
              value={payload?.desc}
            ></textarea>
            <Label>Image</Label>
            <div
              className={`bg-background relative flex group justify-center py-2 cursor-pointer transition-colors hover:bg-secondary rounded-md`}
              onClick={() => {
                imageRef.current.click();
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDrag(true);
              }}
              onDrop={dropHandler}
            >
              <div className={`bg-primary flex items-center text-center justify-center ${isDrag ? "opacity-80 text-xl z-[9999]" : "opacity-0 text-base z-[-400]"} transition-all  w-full h-full absolute  text-white `}>Drop here</div>
              <img className="h-60 group-hover:scale-105 group-hover:shadow-xl transition-all object-contain" src={previewImage == "" ? import.meta.env.VITE_BASE_URL + "/" + payload?.image : previewImage} alt={payload?.name} />
              <input
                hidden
                ref={imageRef}
                type="file"
                id="image"
                name="image"
                onChange={(e) => {
                  setPreviewImage((prev) => {
                    changeHandler(e, "image");
                    console.log(URL.createObjectURL(e.target.files[0]));
                    return URL.createObjectURL(e.target.files[0]);
                  });
                }}
                accept={"image/jpeg,image/png,image/gif"}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Label>Price</Label>
            <Input
              type="number"
              name="product"
              onChange={(e) => {
                changeHandler(e, "price");
              }}
              value={payload.price}
            />
            <Label>Stock</Label>
            <div className="w-full bg-background">
              <div className="grid grid-cols-2 gap-2 px-2">
                <Label>Size</Label>
                <Label>Quantity</Label>
              </div>
              {payload.stock.map((row, i) => {
                return <StockElement update={true} key={i} ind={i} size={size} deleteHandler={deleteHandler} payload={payload} setPayload={setPayload} />;
                //   return row;
              })}
            </div>
            <Button disabled={loading} className="bg-accent" type="submit">
              {loading ? <Spinner /> : "Submit"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default EditProduct;
