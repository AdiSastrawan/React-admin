import Button from "../../components/Button";

function Pagination({ display = 10, totalData, currentPage, setPage, className = "" }) {
  const pageHandler = (i) => {
    console.log(i);
    setPage(() => {
      return i;
    });
  };
  // const paginateElement = () => {
  //   let element = [];
  //   // console.log(totalData);
  //   let totalPages = Math.abs(totalData / display);

  //   for (let i = 0; i < totalPages; i++) {
  //     console.log(totalPages);
  //     if (currentPage == 1) {
  //       element.push(
  //         <Button onClick={pageHandler.bind(this, i + 1)} className={currentPage == i + 1 && `bg-primary`} key={i}>
  //           {i + 1}
  //         </Button>
  //       );
  //     }
  //   }
  //   return element;
  // };
  let maxPageNumbers = 5;
  function getPageNumbers() {
    const pageNumbers = [];
    let lastPage = Math.abs(Math.round(totalData / display));
    if (lastPage <= maxPageNumbers) {
      // If total pages is less than or equal to maxPageNumbers, show all page numbers
      for (let i = 1; i <= lastPage; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show current page and surrounding page numbers with "..." sign
      const halfMaxPageNumbers = Math.floor(maxPageNumbers / 2);

      let startPage = Math.max(1, parseInt(currentPage) - halfMaxPageNumbers);
      let endPage = Math.min(parseInt(currentPage) + halfMaxPageNumbers, lastPage);
      if (startPage <= 1) {
        startPage = 1;
        endPage = Math.min(maxPageNumbers, lastPage);
      }

      if (endPage >= lastPage) {
        endPage = lastPage;
        startPage = Math.max(1, lastPage - maxPageNumbers + 1);
      }
      console.log(endPage);
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (startPage > 2) {
        pageNumbers.unshift("...");
        pageNumbers.unshift(1);
      } else if (startPage === 2) {
        pageNumbers.unshift(1);
      }

      if (endPage < lastPage - 1) {
        pageNumbers.push("...");
        pageNumbers.push(lastPage);
      } else if (endPage === lastPage - 1) {
        pageNumbers.push(lastPage);
      }
    }

    return pageNumbers;
  }
  const pageNumbers = getPageNumbers();
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
      {pageNumbers.map((e, i) => {
        return (
          <Button disabled={e == "..."} onClick={pageHandler.bind(this, e)} className={currentPage == e && `bg-primary`} key={i}>
            {e}
          </Button>
        );
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
