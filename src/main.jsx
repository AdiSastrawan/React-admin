import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { RouterProvider } from "react-router-dom"
import userRoute from "./route"
import { AuthProvider } from "./context/AuthProvider"
import { ChakraProvider } from "@chakra-ui/react"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <RouterProvider router={userRoute} />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
)
