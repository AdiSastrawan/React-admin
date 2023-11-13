import { Link, useLocation } from "react-router-dom"
import rupiahFormater from "../../formatter/rupiahFormatter"
import { timeFormatter } from "../../formatter/timeFormatter"
import useFetchDashboard from "../../hooks/useFetchDashboard"
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Spinner } from "@chakra-ui/react"
import { Line } from "react-chartjs-2"
import Chart from "chart.js/auto"
import { CategoryScale } from "chart.js"
Chart.register(CategoryScale)
function Dashboard() {
  const location = useLocation()
  const { data, loading } = useFetchDashboard()
  const generateChart = () => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const sales = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    data?.annual_transactions?.forEach((transaction) => {
      sales[transaction._id.month - 1] = transaction.totalProductPrice
      console.log(sales[transaction._id.month - 1])
    })
    return {
      labels: monthNames,
      datasets: [
        {
          label: "Sales",
          data: sales,
          fill: false,
          tension: 0.1,
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    }
  }
  const options = {
    responsive: true,
    scales: {
      y: {
        suggestedMin: 0,
        ticks: {
          beginAtZero: true,
          callback: (value) => {
            return value.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: `Total sales in ${new Date().getFullYear()}`,
        font: {
          size: 18,
          weight: "bold",
        },
      },
    },
  }
  if (loading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <Spinner />
      </div>
    )
  }
  return (
    <div className="mx-4 h-fit">
      <div className="grid grid-cols-4 gap-4">
        <div className="min-h-[3rem] flex items-center justify-center shadow-md rounded-md flex-col py-2">
          <h2 className="text-center font-medium text-lg py-2">Total Costumers</h2>
          <h2 className="font-bold text-center">{data?.count_costumer?.amount}</h2>
        </div>
        <div className="min-h-[3rem] flex items-center justify-center shadow-md rounded-md flex-col py-2">
          <h2 className="text-center font-medium text-lg py-2">Total Products</h2>
          <h2 className="font-bold text-center">{data?.count_products?.amount}</h2>
        </div>
        <div className="min-h-[3rem] py-2 flex items-center justify-center shadow-md flex-col rounded-md">
          <h2 className="text-center font-medium text-lg py-2">Total Transaction</h2>
          <h2 className="font-bold text-center">{data?.count_transactions?.amount}</h2>
        </div>
        <div className="min-h-[3rem] flex items-center justify-center shadow-md py-2 flex-col rounded-md">
          <h2 className="text-center font-medium text-lg py-2">Total Admin</h2>
          <h2 className="font-bold text-center">{data?.count_admin?.amount}</h2>
        </div>
      </div>
      <div className="w-full grid grid-cols-4  pt-8 gap-2">
        <div className="flex col-span-2 min-h-[2rem] p-4 shadow-md rounded-md flex-col">
          <Line data={generateChart()} options={options} />
        </div>
        <div className={`flex col-span-2 min-h-[3rem] shadow-md rounded-md flex-col `}>
          <h2 className="text-center font-medium text-lg py-2">Low Stock</h2>
          {data?.low_stock.length > 0 ? (
            <TableContainer py={4} px={2}>
              <Table size="md" variant="simple" colorScheme="blue">
                <Thead>
                  <Tr>
                    <Th>Product Name</Th>
                    <Th>Size</Th>
                    <Th>Quantity</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.low_stock?.map((stock) => {
                    return (
                      <Tr key={stock._id}>
                        <Td>{stock.product_id.name}</Td>
                        <Td>{stock.size_id.name}</Td>
                        <Td>{stock.quantity}</Td>
                        <Td>
                          <Link state={{ from: location }} className="px-2 py-1 rounded-md bg-yellow-400 " to={`/products/edit-product/${stock.product_id._id}`}>
                            Add Stock
                          </Link>
                        </Td>
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          ) : (
            <h2 className="text-center font-medium text-lg py-2">No products with low stock</h2>
          )}
        </div>
      </div>
      <div className="w-full grid grid-cols-3  pt-8 gap-2">
        <div className="flex col-span-2 min-h-[3rem] shadow-md rounded-md flex-col">
          <h2 className="text-center font-medium text-lg py-2">Recent Transaction</h2>
          <TableContainer py={4} px={2}>
            <Table size="sm" variant="simple" colorScheme="blue">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>User</Th>
                  <Th>Total Price</Th>
                  <Th>Ordered At</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.recent_transactions?.map((transaction) => {
                  return (
                    <Tr key={transaction._id}>
                      <Td>{transaction._id}</Td>
                      <Td>{transaction.user_name}</Td>
                      <Td>{rupiahFormater(transaction.total_price)}</Td>
                      <Td>{timeFormatter(transaction.created_at)}</Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
        <div className="flex  min-h-[3rem] shadow-md rounded-md flex-col">
          <h2 className="text-center font-medium text-lg py-2">New Costumer</h2>
          <TableContainer py={4} px={1}>
            <Table size="sm" variant="simple" colorScheme="blue">
              <Thead>
                <Tr>
                  <Th>User</Th>
                  <Th>Created At</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.new_costumer?.map((costumer) => {
                  return (
                    <Tr key={costumer._id}>
                      <Td>{costumer.username}</Td>
                      <Td>{timeFormatter(costumer.created_at)}</Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
