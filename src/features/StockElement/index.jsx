import { Suspense, useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import useAxiosPrivate from "../../hooks/axiosPrivate";
import Spinner from "../../components/Spinner";
import Select from "../../components/Select";

function StockElement({ deleteHandler, ind, setPayload, payload, size, update = false }) {
  return (
    <div id={ind} className="grid grid-cols-2 gap-2 px-2 py-2">
      <Select
        onChange={(e) =>
          setPayload((prev) => {
            let temp = { ...prev };
            temp.stock[ind].size_id = e.target.value;
            return temp;
          })
        }
        name="size"
        id=""
        value={payload.stock[ind].size_id?._id ? payload.stock[ind].size_id._id : payload.stock[ind].size_id}
      >
        <option disabled value="" selected>
          ---Select Size ---
        </option>

        {size.map((s, i) => {
          return (
            <option key={i} value={s._id} disabled={update}>
              {s.name}
            </option>
          );
        })}
      </Select>
      <div className="flex ">
        <Input
          type="number"
          onChange={(e) =>
            setPayload((prev) => {
              console.log(e.target.value);
              let temp = { ...prev };
              temp.stock[ind].quantity = e.target.value;
              return temp;
            })
          }
          value={payload.stock[ind].quantity}
        />
        {!update && (
          <div className="flex items-center">
            <Button onClick={deleteHandler.bind(this, ind)} className="bg-gray-500 ml-1 py-0" type="button">
              -
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StockElement;
