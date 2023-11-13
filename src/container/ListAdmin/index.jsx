import React, { useEffect, useRef, useState } from "react"
import HeaderOutlet from "../../features/Header"
import Table from "../../components/Table"
import useAxiosPrivate from "../../hooks/axiosPrivate"
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Spinner, useDisclosure } from "@chakra-ui/react"
import Pagination from "../../features/Pagination"
import { Link, useLocation, useSearchParams } from "react-router-dom"
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"

const getListAdmin = async (axiosCLient, setData, setLoading, page, search) => {
  try {
    const response = await axiosCLient.get(`/superuser/list-admin?page=${page}${search ? "&search=" + search : ""}`)
    setData(response.data)
    console.log(response.data)
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}
const deleteAdmin = async (axiosCLient, id, setLoading, onClose) => {
  try {
    console.log(id)
    const response = await axiosCLient.delete(`/superuser/admin/${id}`)
    onClose()
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}
function ListAdmin() {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const cancelRef = useRef()
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const axiosClient = useAxiosPrivate()
  const options = { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }
  const searchHandler = (e) => {
    let tmp = new URLSearchParams(location.search)
    tmp.set(e.target.name, e.target.value)
    tmp.set("page", 1)
    setSearchParams(tmp, { replace: true })
  }
  useEffect(() => {
    getListAdmin(axiosClient, setData, setLoading, searchParams.get("page"), searchParams.get("keyword"))
  }, [loading])
  useEffect(() => {
    let timeOut = setTimeout(() => {
      getListAdmin(axiosClient, setData, setLoading, searchParams.get("page"), searchParams.get("keyword"))
    }, 500)
    return () => {
      clearTimeout(timeOut)
    }
  }, [setSearchParams])
  const onDelete = (e, id) => {
    setLoading(true)
    deleteAdmin(axiosClient, id, setLoading, onClose)
  }
  return (
    <div className="mx-4 h-fit">
      <HeaderOutlet>List Admin</HeaderOutlet>
      <div className="w-full flex items-center justify-between py-2 px-2">
        <div className="space-x-2">
          <input type="text" value={searchParams.get("keyword")} name={"keyword"} onChange={searchHandler} placeholder="Search user" className="focus:outline-accent border-2 rounded-md w-64  border-secondary px-2 py-1" />
        </div>
        <div>
          <Link to="add-admin" state={{ from: location }}>
            <Button colorScheme="green" className="bg-green-600">
              Add Admin
            </Button>
          </Link>
        </div>
      </div>
      <Table header={["Username", "Email", "Created at", "Action"]}>
        {data?.data?.map((dt, i) => {
          return (
            <>
              <tr className="" key={i}>
                <td className="text-center py-2">{dt.username}</td>
                <td className="text-center">{dt.email}</td>
                <td className="text-center">{new Date(dt.created_at).toLocaleString(undefined, options)}</td>
                <td className="text-center">
                  <div className="flex gap-2">
                    <Link to={"edit-admin/" + dt._id} className="bg-yellow-500 rounded-md px-4 py-2 flex items-center">
                      <EditIcon color={"white"} />
                    </Link>
                    <button onClick={onOpen} className="bg-red-700 rounded-md px-4 py-2 flex items-center">
                      <DeleteIcon color={"white"} />
                    </button>
                  </div>
                </td>
              </tr>
              <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Edit Admin
                    </AlertDialogHeader>

                    <AlertDialogBody>Are you sure?</AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose} mr={2}>
                        Cancel
                      </Button>
                      <Button
                        colorScheme="red"
                        disabled={loading}
                        onClick={(e) => {
                          console.log(dt._id)
                          onDelete(e, dt._id)
                        }}
                        ml={3}
                      >
                        {loading ? <Spinner /> : "Delete"}
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </>
          )
        })}
      </Table>
      {/* {console.log(data.current)} */}
      <Pagination currentPage={data?.current} totalData={data.totalData} display={data.displayPage} />
    </div>
  )
}

export default ListAdmin
