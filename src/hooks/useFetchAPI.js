import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useAxiosPrivate from "./axiosPrivate"

const getData = async (axiosPrivate, url, setData, setIsLoading, setErrors, method, payload) => {
  try {
    let response = []
    if (payload) {
      response = await axiosPrivate[method](url)
    } else {
      response = await axiosPrivate[method](url)
    }
    setData(response?.data)
  } catch (error) {
    setErrors(error.response.data)
    console.log(error.message)
  } finally {
    setIsLoading(false)
  }
}
function useFetchAPI(url = "", method = "get", payload = {}) {
  const axiosPrivate = useAxiosPrivate()
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  useEffect(() => {
    getData(axiosPrivate, url, setData, setIsLoading, setErrors, method, payload)
  }, [])

  return { data, isLoading, errors }
}

export default useFetchAPI
