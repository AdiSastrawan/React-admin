import Navlist from "./Navlist";
import NavLists from "./Navlists";

function Sidebar() {
  return (
    <div className="w-1/4 bg-primary h-screen overflow-y-auto  ">
      <nav className=" min-h-screen   font-roboto">
        <h1 className="text-white uppercase text-3xl font-bold py-4 px-2">Logo </h1>
        <NavLists className="text-xl font-medium">
          <Navlist to="/">Dashboard</Navlist>
          <Navlist to="products">Product</Navlist>
          <Navlist to="types">Types</Navlist>
          <Navlist to="sizes">Sizes</Navlist>
        </NavLists>
      </nav>
    </div>
  );
}

export default Sidebar;
