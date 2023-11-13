import React, { useRef, useState } from "react"
import HeaderOutlet from "../../../features/Header"
import Input from "../../../components/Input"
import Label from "../../../components/Label"
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Spinner, useDisclosure } from "@chakra-ui/react"
import useAxiosPrivate from "../../../hooks/axiosPrivate"
import { useNavigate } from "react-router-dom"

const createAdmin = async (axiosPrivate, payload, navigate, setLoading) => {
  try {
    const response = await axiosPrivate.post("/superuser/admin", payload)
    console.log("berhasil")
    navigate("/list-admin")
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

function AddAdmin() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const axiosPrivate = useAxiosPrivate()
  const usernameRef = useRef()
  const passwordRef = useRef()
  const cancelRef = useRef()
  const onCreateHandler = () => {
    setLoading(true)
    createAdmin(axiosPrivate, { username: usernameRef.current.value, password: passwordRef.current.value }, navigate, setLoading)
  }
  return (
    <div className="mx-4 h-fit">
      <HeaderOutlet>Add Admin</HeaderOutlet>
      <div className="w-full bg-background p-2 rounded-md space-y-2 ">
        <Label>Username</Label>
        <input type="text" ref={usernameRef} name="username" className="w-full px-2 rounded-md py-2 outline-none text-black  focus-visible:outline-accent" />
        <Label>Password</Label>
        <input type="password" ref={passwordRef} name="password" className="w-full px-2 rounded-md py-2 outline-none text-black  focus-visible:outline-accent" />
        <button onClick={onOpen} disabled={loading} className="px-4 py-1 bg-accent  text-white rounded-md text-xl ">
          Create
        </button>
      </div>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Create Costumer
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" disabled={loading} onClick={onCreateHandler} ml={3}>
                {loading ? <Spinner /> : "Create"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  )
}

export default AddAdmin
