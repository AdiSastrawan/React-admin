import { useEffect, useRef, useState } from "react"
import Table from "../../components/Table"
import useAxiosPrivate from "../../hooks/axiosPrivate"
import { Button, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Spinner } from "@chakra-ui/react"
import Td from "../../components/Table/Tabledata"
import HeaderOutlet from "../../features/Header"
import { Link, useLocation, useSearchParams } from "react-router-dom"
import Pagination from "../../features/Pagination"
import Select from "../../components/Select"
import { AddIcon, DeleteIcon, EditIcon, InfoIcon } from "@chakra-ui/icons"

const fetchData = async (setData, axiosPrivate, setLoading, page = 1, search, type, controller) => {
  try {
    const response = await axiosPrivate.get(`/products?page=${page}${search ? "&search=" + search : ""}${type ? "&type=" + type : ""}`, {
      signal: controller.signal,
    })
    setData(response.data)
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}
const fetchTypes = async (setTypes, axiosPrivate) => {
  try {
    const response = await axiosPrivate.get(`/types`)
    console.log(response.data)
    setTypes(response.data.data)
  } catch (error) {
    console.log(error)
  }
}
const deleteData = async (id, axiosPrivate, onClose) => {
  try {
    await axiosPrivate.delete(`/products/${id}`)
    onClose()
  } catch (error) {
    console.log(error)
  }
}
function sumArray(data) {
  let sum = 0
  if (data.length < 1) {
    return 0
  }
  for (let i = 0; i < data.length; i++) {
    sum += data[i].quantity
  }
  return sum
}

function Product() {
  const [data, setData] = useState([])
  const [types, setTypes] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const axiosPrivate = useAxiosPrivate()
  const [loading, setLoading] = useState(true)
  const cancelRef = useRef()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [trigger, setTrigger] = useState(false)
  const location = useLocation()
  useEffect(() => {
    const controller = new AbortController()
    fetchData(setData, axiosPrivate, setLoading, searchParams.get("page"), searchParams.get("keyword"), searchParams.get("sort"), controller)
    return () => {
      controller.abort()
    }
  }, [trigger])
  const searchHandler = (e) => {
    let tmp = new URLSearchParams(location.search)
    console.log(tmp)

    tmp.set(e.target.name, e.target.value)
    tmp.set("page", 1)

    setSearchParams(tmp)
  }
  useEffect(() => {
    console.log("search" + searchParams.get("keyword"))
    const controller = new AbortController()
    const sentSearch = setTimeout(() => {
      fetchData(setData, axiosPrivate, setLoading, searchParams.get("page"), searchParams.get("keyword"), searchParams.get("sort"), controller)
    }, 500)
    return () => {
      clearTimeout(sentSearch)
      controller.abort()
    }
  }, [searchParams, deleteData])
  useEffect(() => {
    fetchTypes(setTypes, axiosPrivate)
  }, [])
  const deleteProduct = (id, e) => {
    setTrigger((prev) => {
      return !prev
    })
    deleteData(id, axiosPrivate, onClose)
  }
  return (
    <div className="mx-4 h-fit">
      <HeaderOutlet>Data Products</HeaderOutlet>

      <div className="w-full flex items-center justify-between py-2 px-2">
        <div className="space-x-2">
          <input type="text" value={searchParams.get("keyword")} onChange={searchHandler} placeholder="Search product" className="focus:outline-accent border-2 rounded-md w-64  border-secondary px-2 py-1" name="keyword" />
          <Select value={searchParams.get("sort")} onChange={searchHandler} className="py-1 capitalize px-2 border-secondary border-2 min-w-fit" name={"sort"}>
            <option value={""} selected>
              All
            </option>
            {types.map((type, i) => {
              return (
                <option className="capitalize" key={i} value={type._id}>
                  {type.name}
                </option>
              )
            })}
          </Select>
        </div>
        <div>
          <Link to="add-product" state={{ from: location }}>
            <Button colorScheme="green" gap={2}>
              <AddIcon color={"white"} /> Add Product
            </Button>
          </Link>
        </div>
      </div>
      <Table header={["Product Name", "Type", "Image", "Price", "Stock", "Action"]}>
        {loading ? (
          <div className=" mx-4 h-screen w-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          data?.data?.map((r, i) => {
            return (
              <>
                <tr className="table-row " key={i}>
                  <Td>{r.name}</Td>
                  <Td>{r.type?.name}</Td>
                  <Td>
                    {console.log(r.image)}
                    <img className="h-20 w-20 object-contain " src={import.meta.env.VITE_BASE_URL + `/${Array.isArray(r.image) ? r.image[0] : r.image}`} alt={r.name} />
                  </Td>
                  <Td>{r.price}</Td>
                  <Td>{sumArray(r.stock)}</Td>
                  <Td>
                    {
                      <div className="space-x-2 text-base">
                        <Button colorScheme="blue">
                          <Link to={`${r._id}`} state={{ from: location }}>
                            <InfoIcon color={"white"} />
                          </Link>
                        </Button>
                        <Button colorScheme="red" onClick={onOpen}>
                          <DeleteIcon color={"white"} />
                        </Button>{" "}
                        <Button colorScheme="yellow">
                          <Link to={`edit-product/${r._id}`} state={{ from: location }}>
                            <EditIcon color={"white"} />
                          </Link>
                        </Button>
                      </div>
                    }
                  </Td>
                </tr>
                <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Product
                      </AlertDialogHeader>

                      <AlertDialogBody>Are you sure?</AlertDialogBody>

                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose} mr={2}>
                          Cancel
                        </Button>
                        <Button colorScheme="red" disabled={loading} onClick={deleteProduct.bind(this, r._id)} ml={3}>
                          {loading ? <Spinner /> : "Delete"}
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
              </>
            )
          })
        )}
      </Table>
      {data.data?.length < 1 && <h1 className="text-2xl text-black font-bold text-center">{"There's no data"}</h1>}
      <Pagination className="my-4" totalData={data.totalData} display={data.displayPage} currentPage={data.current} />
    </div>
  )
}

export default Product
