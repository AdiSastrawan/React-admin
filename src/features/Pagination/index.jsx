import { useLocation, useSearchParams } from "react-router-dom"
import Button from "../../components/Button"

function Pagination({ display = 10, totalData, currentPage, className = "" }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const pageHandler = (i) => {
    const tmp = new URLSearchParams(location.search)
    tmp.set("page", i)
    setSearchParams(tmp)
  }

  let maxPageNumbers = 5
  function getPageNumbers() {
    const pageNumbers = []
    console.log(totalData)
    console.log(Math.round(totalData / display))
    let lastPage = Math.abs(Math.round(totalData / display)) == 0 ? 1 : Math.abs(Math.ceil(totalData / display))
    console.log(lastPage)
    if (lastPage <= maxPageNumbers) {
      // If total pages is less than or equal to maxPageNumbers, show all page numbers
      for (let i = 1; i <= lastPage; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Show current page and surrounding page numbers with "..." sign
      const halfMaxPageNumbers = Math.floor(maxPageNumbers / 2)

      let startPage = Math.max(1, parseInt(currentPage) - halfMaxPageNumbers)
      console.log(currentPage)
      let endPage = Math.min(parseInt(currentPage) + halfMaxPageNumbers, parseInt(lastPage))
      if (startPage <= 1) {
        startPage = 1
        endPage = Math.min(maxPageNumbers, lastPage)
      }

      if (endPage >= lastPage) {
        endPage = lastPage
        startPage = Math.max(1, lastPage - maxPageNumbers + 1)
      }
      console.log(endPage)
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }

      if (startPage > 2) {
        pageNumbers.unshift("...")
        pageNumbers.unshift(1)
      } else if (startPage === 2) {
        pageNumbers.unshift(1)
      }

      if (endPage < lastPage - 1) {
        pageNumbers.push("...")
        pageNumbers.push(lastPage)
      } else if (endPage === lastPage - 1) {
        pageNumbers.push(lastPage)
      }
    }

    return pageNumbers
  }
  const pageNumbers = getPageNumbers()
  return (
    <div className={"flex gap-1 justify-end " + className}>
      <Button
        disabled={currentPage < 2}
        onClick={() => {
          const tmp = new URLSearchParams(location.search)
          let value = tmp.get("page") ? +tmp?.get("page") - 1 : 1
          tmp.set("page", value)
          setSearchParams(tmp)
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
        )
      })}
      <Button
        disabled={currentPage > Math.round(totalData / display)}
        onClick={() => {
          const tmp = new URLSearchParams(location.search)
          let value = tmp.get("page") ? +tmp?.get("page") + 1 : 1
          tmp.set("page", value)
          setSearchParams(tmp)
        }}
        className="bg-primary"
      >
        {">"}
      </Button>
    </div>
  )
}

export default Pagination
