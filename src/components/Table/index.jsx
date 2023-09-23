import React from "react";

function Table({ header = [], rows = [], children }) {
  return (
    <table className="border w-full table-auto table border-secondary border-collapse bg-background">
      <thead className="bg-primary  text-white ">
        <tr>
          {header.map((h, i) => {
            return (
              <th className="table-cell border-x-2 px-1 py-2 border-secondary" key={i}>
                {h}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="border  border-white">{children}</tbody>
    </table>
  );
}

export default Table;
