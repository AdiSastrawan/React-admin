import React, { useEffect, useRef, useState } from "react"
import HeaderOutlet from "../../../features/Header"
import Label from "../../../components/Label"
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Checkbox, Spinner, useDisclosure } from "@chakra-ui/react"
import { useNavigate, useParams } from "react-router-dom"
import useAxiosPrivate from "../../../hooks/axiosPrivate"
import useFetchAPI from "../../../hooks/useFetchAPI"

const editUser = async (axiosPrivate, payload, id, navigate, setLoading) => {
  try {
    await axiosPrivate.put(`/superuser/admin/${id}`, payload)
    navigate("/list-admin")
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}
const getData = async (axiosPrivate, setPayload, id) => {
  try {
    const response = await axiosPrivate.get(`/superuser/admin/${id}`)
    setPayload((prev) => {
      let tmp = { ...prev }
      tmp.username = response.data?.username
      return tmp
    })
  } catch (error) {
    console.log(error)
  }
}
function EditAdmin() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()
  const usernameRef = useRef()
  const passwordRef = useRef()
  const axiosPrivate = useAxiosPrivate()
  const confirmPasswordRef = useRef()
  const [errors, setErrors] = useState({ username: { message: "" }, password: { message: "" }, confirmPassword: { message: "" } })
  const cancelRef = useRef()
  const [toggle, setToggle] = useState(false)
  const [payload, setPayload] = useState({
    username: "",
    password: "",
  })
  useEffect(() => {
    getData(axiosPrivate, setPayload, id)
  }, [])
  const onEditHandler = () => {
    setLoading(true)
    setErrors({ username: { message: "" }, password: { message: "" }, confirmPassword: { message: "" } })

    if (confirmPasswordRef.current.value !== passwordRef.current.value) {
      setErrors((prev) => {
        let tmp = { ...prev }
        tmp.confirmPassword.message = "Confirm password must be the same as the password"
        return tmp
      })
      return 0
    }

    editUser(axiosPrivate, payload, id, navigate, setLoading)
  }
  return (
    <div className="h-fit mx-4">
      <HeaderOutlet>Edit Admin</HeaderOutlet>
      <div className="w-full bg-background p-2 rounded-md space-y-2 ">
        <Label>Username</Label>
        <input
          type="text"
          ref={usernameRef}
          onChange={(e) => {
            setPayload((prev) => {
              let tmp = { ...prev }
              tmp.username = e.target.value
              return tmp
            })
          }}
          value={payload?.username}
          name="username"
          className="w-full px-2 rounded-md py-2 outline-none text-black  focus-visible:outline-accent"
        />
        {errors?.username?.message && <p>{errors?.username?.message}</p>}
        <input
          type="checkbox"
          onChange={() => {
            setToggle((prev) => {
              return !prev
            })
          }}
        />
        <span>Change Password</span>
        <div className={`${toggle ? "opacity-100" : "opacity-25"}`}>
          <Label>Password</Label>
          <input
            disabled={!toggle}
            onChange={(e) => {
              setPayload((prev) => {
                let tmp = { ...prev }
                tmp.password = e.target.value
                return tmp
              })
            }}
            value={payload?.password}
            type="password"
            ref={passwordRef}
            name="password"
            className="w-full px-2 rounded-md py-2 outline-none text-black  focus-visible:outline-accent"
          />
          {errors?.password?.message && <p>{errors?.password?.message}</p>}
          <Label> Confirm Password</Label>
          <input disabled={!toggle} type="password" ref={confirmPasswordRef} name="confirm_password" className="w-full px-2 rounded-md py-2 outline-none text-black  focus-visible:outline-accent" />
          {errors?.confirmPassword.message && <p>{errors?.confirmPassword.message}</p>}
        </div>
        <button onClick={onOpen} className="bg-yellow-500 px-4 py-2 text-white rounded-md ">
          Edit
        </button>
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Edit Admin
              </AlertDialogHeader>

              <AlertDialogBody>Are you sure?</AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="blue" disabled={loading} onClick={onEditHandler} ml={3}>
                  {loading ? <Spinner /> : "Edit"}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </div>
    </div>
  )
}

export default EditAdmin
