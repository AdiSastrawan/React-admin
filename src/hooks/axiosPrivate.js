import { useEffect } from "react"
import axiosClient from "../axios-client"
import useAuth from "./useAuth"
import useRefreshToken from "./useRefreshToken"

const useAxiosPrivate = () => {
  const { auth } = useAuth()
  const refresh = useRefreshToken()
  useEffect(() => {
    //jika melakukan request
    const reqIntercept = axiosClient.interceptors.request.use(
      (config) => {
        const token = auth.accessToken || ""
        config.headers.Authorization = "Bearer " + token
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    //jika mendapatkan response
    const resIntercept = axiosClient.interceptors.response.use(
      (response) => {
        return response
      },
      //bila error maka mengecek response dengan status error 403 dan merefresh token
      async (error) => {
        let prevReq = error?.config
        if (error.response.status == 403 || !prevReq.sent) {
          prevReq.sent = true //true melakukan request yang error
          const accessToken = await refresh()
          prevReq.headers.Authorization = "Bearer " + accessToken
          return axiosClient(prevReq) // memasukkan ke dalam axios
        }

        return Promise.reject(error)
      }
    )
    //clean up
    return () => {
      axiosClient.interceptors.request.eject(reqIntercept)
      axiosClient.interceptors.response.eject(resIntercept)
    }
  }, [auth, refresh])
  return axiosClient
}
export default useAxiosPrivate
