import React, { Suspense, useEffect, useState } from "react";
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

const getProduct = async (setPayload, id, axiosClient) => {
  try {
    const response = await axiosClient.get(`/products/${id}`);
    setPayload((prev) => {
      let tmp = { ...prev };
      tmp.name = response.data.name;
      tmp.price = response.data.price;
      tmp.type = response.data.type._id;
      tmp.desc = response?.data.desc;
      tmp.stock = [...response.data.stock];
      return tmp;
    });
  } catch (error) {
    console.log(error);
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
function EditProduct() {
  const { id } = useParams();
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
    console.log(from);
    console.log(location);
  };
  useEffect(() => {
    getProduct(setPayload, id, axiosClient);
    getType(setType, axiosClient);
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
    console.log(formData.get("stock"));

    setLoading(true);
    sendData(formData, setLoading, navigate, id, axiosClient);
  };

  return (
    <div className="mx-4 my-2 p-3 rounded-md bg-secondary">
      <Button className="bg-gray-500 text-black px-3 ">
        <Link to={from}>{"<"}</Link>
      </Button>
      <HeaderOutlet>Edit Product</HeaderOutlet>
      <Suspense fallback={<Spinner />}>
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
              value={payload?.desc}
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
      </Suspense>
      <Button onClick={test}>Test</Button>
    </div>
  );
}

export default EditProduct;
