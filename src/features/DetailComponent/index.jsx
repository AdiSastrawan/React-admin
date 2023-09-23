import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/axiosPrivate";
import Spinner from "../../components/Spinner";
const fetchData = async (axiosClient, setData, id, setLoading) => {
  try {
    const response = await axiosClient.get(`/products/${id}`);
    console.log(response.data);
    setData(response.data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
function DetailComponent() {
  const { id } = useParams();
  const axiosClient = useAxiosPrivate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData(axiosClient, setData, id, setLoading);
  }, []);
  return loading ? (
    <Spinner />
  ) : (
    <div className="w-full h-full flex   rounded-md ">
      <div className="w-1/3 h-full  flex items-center flex-col  ">
        <img className="w-60 object-contain my-4" src={import.meta.env.VITE_BASE_URL + "/" + data.image} alt="" />
        <p className="text-center">{data.desc}</p>
      </div>

      <div className="w-2/3 h-full mx-2">
        <h2 className="font-black text-3xl text-left">{data.name}</h2>
        <table>
          <tbody className="text-xl">
            <tr>
              <td>Price </td>
              <td>: {data.price}</td>
            </tr>
            <tr>
              <td>Type </td>
              <td className="capitalize">: {data.type.name}</td>
            </tr>
            <tr>
              <td>Stock </td>
              <td className="w-full">
                <div className="flex flex-wrap gap-2">
                  <div>:</div>
                  {data.stock.map((st, i) => {
                    return (
                      <div key={i} className="bg-white shadow-lg px-2 py-1 rounded-md">
                        {st.size_id.name} - {st.quantity}
                      </div>
                    );
                  })}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DetailComponent;
