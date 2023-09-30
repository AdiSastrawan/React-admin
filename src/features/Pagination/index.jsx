import React from "react";
import Button from "../../components/Button";

function Pagination({ display = 10, totalData, currentPage, setPage, className = "" }) {
  const pageHandler = (i) => {
    setPage((prev) => {
      return i;
    });
  };
  const paginateElement = () => {
    let element = [];
    // console.log(totalData);
    let totalPages = Math.abs(totalData / display);

    for (let i = 0; i < totalPages; i++) {
      console.log(totalPages);
      if (currentPage == 1) {
        element.push(
          <Button onClick={pageHandler.bind(this, i + 1)} className={currentPage == i + 1 && `bg-primary`} key={i}>
            {i + 1}
          </Button>
        );
      }
    }
    return element;
  };
  return (
    <div className={"flex gap-1 justify-end " + className}>
      <Button
        disabled={currentPage < 2}
        onClick={() => {
          setPage((prev) => {
            return prev - 1;
          });
        }}
        className="bg-primary"
      >
        {"<"}
      </Button>
      {paginateElement().map((e, i) => {
        return e;
      })}
      <Button
        disabled={currentPage > Math.abs(totalData / display)}
        onClick={() => {
          setPage((prev) => {
            return prev + 1;
          });
        }}
        className="bg-primary"
      >
        {">"}
      </Button>
    </div>
  );
}

export default Pagination;
