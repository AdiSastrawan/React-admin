import React, { Suspense, useEffect, useState } from "react";
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
  const test = () => {
    console.log(payload);
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
  }, []);
  const addHandler = () => {
    let tmp = [...payload.stock];
    tmp.push({ size_id: null, quantity: tmp.length });
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
    <div className="mx-4 my-2 p-3 rounded-md bg-secondary">
      <Button className="bg-gray-500 text-black px-3 ">
        <Link to={from}>{"<"}</Link>
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
          ></textarea>
          <Label>Image</Label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={(e) => {
              changeHandler(e, "image");
            }}
            accept={"image/jpeg,image/png,image/gif"}
          />
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
      <Button onClick={test}>Test</Button>
    </div>
  );
}

export default AddProduct;
