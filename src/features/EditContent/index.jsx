import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useAxiosPrivate from "../../hooks/axiosPrivate"
import Spinner from "../../components/Spinner"
import Label from "../../components/Label"
import Button from "../../components/Button"
import HeaderOutlet from "../Header"
import Input from "../../components/Input"
import DropInput from "../../components/Dropinput"
async function getType(axiosClient, setType, setIsFetch, id) {
  try {
    const response = await axiosClient.get(`/types/${id}`)
    console.log(response.data)
    setType(response.data)
  } catch (error) {
    console.log(error)
  } finally {
    setIsFetch(false)
  }
}
async function updateType(axiosClient, setLoading, formData, id, navigate) {
  try {
    await axiosClient.put(`/types/${id}`, formData, {
      headers: { "content-type": "multipart/form-data" },
    })
    navigate("/types")
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}
function EditContent() {
  const [type, setType] = useState({})
  const axiosClient = useAxiosPrivate()
  const [isFetch, setIsFetch] = useState(true)
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const [isDrag, setIsDrag] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    getType(axiosClient, setType, setIsFetch, id, navigate)
  }, [])
  if (isFetch) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner />
      </div>
    )
  }
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.append("name", type.name)
    formData.append("image", type.image)
    updateType(axiosClient, setLoading, formData, id, navigate)
  }
  return (
    <div className="mx-4">
      <HeaderOutlet>Add Types</HeaderOutlet>
      <div>
        <form onSubmit={onSubmitHandler} action="" className="bg-secondary p-4 rounded-md flex flex-col gap-2">
          <Label>Name</Label>
          <Input
            type="text"
            value={type.name}
            onChange={(e) => {
              setType((prev) => {
                let tmp = { ...prev }
                tmp.name = e.target.value
                return tmp
              })
            }}
          />
          <Label>Image</Label>
          <DropInput setIsDrag={setIsDrag} isDrag={isDrag} payload={type} setPayload={setType} />
          <Button disabled={loading} type="submit" className="mt-2">
            {loading ? <Spinner /> : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default EditContent
