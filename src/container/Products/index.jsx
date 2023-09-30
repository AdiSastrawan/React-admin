import React, { Suspense, useEffect, useState } from "react";
import Table from "../../components/Table";
import Button from "../../components/Button";
import useAxiosPrivate from "../../hooks/axiosPrivate";
import Spinner from "../../components/Spinner";
import Td from "../../components/Table/Tabledata";
import HeaderOutlet from "../../features/Header";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Pagination from "../../features/Pagination";

const fetchData = async (setData, axiosPrivate, setLoading, page = 1) => {
  try {
    const response = await axiosPrivate.get(`/products?page=${page}`);
    console.log(response.data);
    setData(response.data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
const deleteData = async (id, axiosPrivate) => {
  try {
    const response = await axiosPrivate.delete(`/products/${id}`);
  } catch (error) {
    console.log(error);
  }
};
function sumArray(data) {
  let sum = 0;
  if (data.length < 1) {
    return 0;
  }
  for (let i = 0; i < data.length; i++) {
    sum += data[i].quantity;
  }
  return sum;
}

function Product() {
  const [data, setData] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(false);
  const [page, setPage] = useState(1);
  const location = useLocation();
  useEffect(() => {
    fetchData(setData, axiosPrivate, setLoading, page);
  }, [trigger, page]);
  const deleteProduct = (id) => {
    setTrigger((prev) => {
      return !prev;
    });
    deleteData(id, axiosPrivate);
  };
  return loading ? (
    <div className="h-screen w-full flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <div className="mx-4 h-fit">
      <HeaderOutlet>Data Products</HeaderOutlet>
      <div className="w-full flex flex-row-reverse py-2">
        <div>
          <Link to="add-product" state={{ from: location }}>
            <Button className="bg-green-600">Add Product</Button>
          </Link>
        </div>
      </div>
      <Table header={["Product Name", "Type", "Image", "Price", "Stock", "Action"]}>
        {data.data.map((r, i) => {
          return (
            <tr className="table-row " key={i}>
              <Td>{r.name}</Td>
              <Td>{r.type?.name}</Td>
              <Td>
                <img className="h-20 w-20 object-contain " src={import.meta.env.VITE_BASE_URL + `/` + r.image} alt={r.name} />
              </Td>
              <Td>{r.price}</Td>
              <Td>{sumArray(r.stock)}</Td>
              <Td>
                {
                  <div className="space-x-2 text-base">
                    <Button className="text-base ">
                      <Link to={`${r._id}`} state={{ from: location }}>
                        Detail
                      </Link>
                    </Button>
                    <Button className="bg-red-700 text-base" onClick={deleteProduct.bind(this, r._id)}>
                      Delete
                    </Button>{" "}
                    <Button className="text-base bg-yellow-700">
                      <Link to={`edit-product/${r._id}`} state={{ from: location }}>
                        Edit
                      </Link>
                    </Button>
                  </div>
                }
              </Td>
            </tr>
          );
        })}
      </Table>
      {data.length < 1 && <h1 className="text-2xl text-black font-bold text-center">There's no data yet</h1>}
      <Pagination className="my-4" totalData={data.totalData} setPage={setPage} display={data.displayPage} currentPage={data.current} />
    </div>
  );
}

export default Product;
