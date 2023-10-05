import { Outlet, createBrowserRouter } from "react-router-dom";
import Product from "./container/Products";
import Login from "./container/Login";
import Dashboard from "./container/Dashboard";
import DefaultLayout from "./container/DefaultLayout";
import RequireAuth from "./container/RequireAuth";
import Unauthorized from "./container/Unauthorized";
import PersistLogin from "./container/PersistLogin";
import AddProduct from "./container/Products/AddProducts";
import EditProduct from "./container/Products/EditProduct";
import DetailProduct from "./container/Products/DetailProduct";
import Types from "./container/Types";
import AddTypes from "./container/Types/AddTypes";
import EditTypes from "./container/Types/EditTypes";
import Sizes from "./container/Sizes";
import AddSize from "./container/Sizes/AddSize";
import EditSize from "./container/Sizes/EditSize";

const userRoute = createBrowserRouter([
  {
    element: <PersistLogin />,
    children: [
      {
        element: <RequireAuth allowedRoles={["admin", "superuser"]} />,
        children: [
          {
            path: "/",
            element: <DefaultLayout />,
            children: [
              { index: true, element: <Dashboard /> },
              { path: "products", element: <Product /> },
              { path: "products/add-product", element: <AddProduct /> },
              { path: "products/edit-product/:id", element: <EditProduct /> },
              { path: "products/:id", element: <DetailProduct /> },
              { path: "types", element: <Types /> },
              { path: "types/add-types", element: <AddTypes /> },
              { path: "types/edit-types/:id", element: <EditTypes /> },
              { path: "sizes", element: <Sizes /> },
              { path: "sizes/add-size", element: <AddSize /> },
              { path: "sizes/edit-size/:id", element: <EditSize /> },
            ],
          },
        ],
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/unauthorized", element: <Unauthorized /> },
]);

export default userRoute;
