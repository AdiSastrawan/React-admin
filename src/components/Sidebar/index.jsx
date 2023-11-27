import Logo from "../../assets/siento.svg"
import jwtDecode from "jwt-decode"
import useAuth from "../../hooks/useAuth"
import Navlist from "./Navlist"
import NavLists from "./Navlists"

function Sidebar() {
  const { auth } = useAuth()
  return (
    <div className="w-1/4 bg-primary h-screen overflow-y-auto  ">
      <nav className=" min-h-screen   font-roboto">
        <div className="text-white flex items-center">
          <img className="h-24 w-24 py-4 px-2" src={Logo} alt="Logo" />
          <h2 className="text-xl font-bold">Losiento Supply</h2>
        </div>
        <NavLists className="text-xl font-medium">
          <Navlist to="/">Dashboard</Navlist>
          <Navlist to="products">Product</Navlist>
          <Navlist to="types">Types</Navlist>
          <Navlist to="sizes">Sizes</Navlist>
          {jwtDecode(auth.accessToken)?.role == "superuser" && <Navlist to="list-admin">List Admin</Navlist>}
        </NavLists>
      </nav>
    </div>
  )
}

export default Sidebar
