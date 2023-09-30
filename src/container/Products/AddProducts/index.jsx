import React, { Suspense, useEffect, useRef, useState } from "react";
import HeaderOutlet from "../../../features/Header";
import Input from "../../../components/Input";
import Label from "../../../components/Label";
import Button from "../../../components/Button";
import StockElement from "../../../features/StockElement";
import useAxiosPrivate from "../../../hooks/axiosPrivate";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
const getSize = async (setSize, axiosClient) => {
  try {
    const response = await axiosClient.get("/size");
    setSize(response.data.data);
  } catch (error) {
    console.log(error);
  }
};

const sendData = async (formData, setLoading, navigate, axiosClient) => {
  try {
    await axiosClient.post("/products", formData, {
      headers: { "content-type": "multipart/form-data" },
    });
    navigate("/products");
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

function AddProduct() {
  const axiosClient = useAxiosPrivate();
  const [type, setType] = useState([]);
  const [size, setSize] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [isDrag, setIsDrag] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
  useEffect(() => {
    if (payload.length == 0) {
      setPayload((prev) => {
        let temp = { ...prev };
        temp.stock[0] = { size_id: null, quantity: temp.length };
        return temp;
      });
    }
    getType(setType, axiosClient);
    getSize(setSize, axiosClient);
  }, []);
  const dropHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDrag(false);
    setPayload((prev) => {
      let tmp = { ...prev };
      tmp.image = e.dataTransfer.files[0];
      return tmp;
    });
    setPreviewImage(URL.createObjectURL(e.dataTransfer.files[0]));
  };
  const imageRef = useRef();
  const addHandler = () => {
    let tmp = [...payload.stock];
    tmp.push({ size_id: null, quantity: 0 });
    setPayload((prev) => {
      let temp = { ...prev };
      temp.stock = [...tmp];
      return temp;
    });
  };
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
    console.log(formData.get("type"));

    setLoading(true);
    sendData(formData, setLoading, navigate, axiosClient);
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
      <HeaderOutlet>Add Product</HeaderOutlet>
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
          <Suspense fallback={<h1>...</h1>}>
            <Select
              className="capitalize px-2 py-2"
              onChange={(e) => {
                changeHandler(e, "type");
              }}
              name="type"
              id=""
            >
              <option disabled value="" selected>
                ---Select Type ---
              </option>
              {type.map((t, i) => {
                return (
                  <option key={i} className="capitalize" value={t._id}>
                    {t.name}
                  </option>
                );
              })}
            </Select>
          </Suspense>
          <Label>Description</Label>
          <textarea
            name="description"
            onChange={(e) => {
              changeHandler(e, "desc");
            }}
            id=""
            cols="20"
            rows="5"
            className="outline-accent p-1"
          ></textarea>
          <Label>Image</Label>
          <div
            className={`${isDrag ? "bg-accent" : "bg-background"} relative flex group justify-center py-2 cursor-pointer transition-colors hover:bg-secondary rounded-md`}
            onClick={() => {
              imageRef.current.click();
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDrag(true);
            }}
            onDrop={dropHandler}
          >
            {previewImage ? (
              <>
                <div className={`bg-primary flex items-center text-center justify-center ${isDrag ? "opacity-80 text-xl z-[9999]" : "opacity-0 text-base z-[-400]"} transition-all  w-full h-full absolute  text-white `}>Drop here</div>
                <img
                  className={` ${isDrag && "scale-95 opacity-70"} h-40 group-hover:scale-105 group-hover:shadow-xl transition-all object-contain`}
                  src={previewImage == "" ? import.meta.env.VITE_BASE_URL + "/" + payload?.image : previewImage}
                  alt={payload?.name}
                />
              </>
            ) : (
              <div className={`flex justify-center ${isDrag && "text-xl font-medium"} group-hover:text-xl transition-all group-hover:font-medium items-center h-40`}>
                <h2>{isDrag ? "Drop the image here" : "Click here to add image or Drop the image"}</h2>
              </div>
            )}

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
            {payload?.stock.map((row, i) => {
              return <StockElement key={i} ind={i} size={size} deleteHandler={deleteHandler} setPayload={setPayload} payload={payload} />;
              //   return row;
            })}
            <Button className="bg-green-500 ml-2 my-1 text-base" type="button" onClick={addHandler}>
              Tambah
            </Button>
          </div>
          <Button disabled={loading} className="bg-accent" type="submit">
            {loading ? <Spinner /> : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
