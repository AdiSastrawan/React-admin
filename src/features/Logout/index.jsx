import React, { useState } from "react"
import Button from "../../components/Button"
import useAuth from "../../hooks/useAuth"
import { useLocation, useNavigate } from "react-router-dom"
import Spinner from "../../components/Spinner"
import axiosClient from "../../axios-client"
const logoutHandler = async (navigate, setLoading, setAuth) => {
  try {
    await axiosClient.delete("/logout")

    setAuth({})
    navigate("/", { replace: true })

    setLoading(false)
  } catch (error) {
    console.log(error)
    setLoading(false)
  }
}
function Logout({ className = "" }) {
  const { setAuth } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const onClickHandler = () => {
    setLoading(true)
    logoutHandler(navigate, setLoading, setAuth)
  }
  return (
    <Button className={" " + className} onClick={onClickHandler}>
      {loading ? <Spinner /> : "Logout"}
    </Button>
  )
}

export default Logout
