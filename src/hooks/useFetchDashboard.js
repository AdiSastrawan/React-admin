import React, { useEffect, useState } from "react"
import useAxiosPrivate from "./axiosPrivate"

function useFetchDashboard() {
  const [data, setData] = useState({ new_costumer: [], low_stock: [], recent_transactions: [], annual_transactions: [], count_transactions: "", count_products: "", count_costumer: "", count_admin: "" })
  const [loading, setLoading] = useState(true)
  const axiosPrivate = useAxiosPrivate()
  useEffect(() => {
    async function getData() {
      try {
        const new_costumer = await axiosPrivate.get("/dashboard/new-costumer")
        const low_stock = await axiosPrivate.get("/dashboard/low-stock")
        const recent_transactions = await axiosPrivate.get("/dashboard/recent-transaction")
        const annual_transactions = await axiosPrivate.get("/dashboard/annual-transaction")
        const count_transactions = await axiosPrivate.get("/dashboard/count-transaction")
        const count_products = await axiosPrivate.get("/dashboard/count-products")
        const count_costumer = await axiosPrivate.get("/dashboard/count-costumer")
        const count_admin = await axiosPrivate.get("/dashboard/count-admin")
        setData((prev) => {
          let tmp = { ...prev }
          tmp.new_costumer = new_costumer.data
          tmp.low_stock = low_stock.data
          tmp.recent_transactions = recent_transactions.data
          tmp.annual_transactions = annual_transactions.data
          tmp.count_transactions = count_transactions.data
          tmp.count_costumer = count_costumer.data
          tmp.count_products = count_products.data
          tmp.count_admin = count_admin.data
          return tmp
        })
      } catch (error) {
        console.log(error.message)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [loading])
  return { data, loading }
}

export default useFetchDashboard
