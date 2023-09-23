import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import axiosClient from "../../axios-client";
import { useState } from "react";
import Spinner from "../../components/Spinner";
import useAuth from "../../hooks/useAuth";

const logoutHandler = async (navigate, setLoading, setAuth) => {
  try {
    await axiosClient.delete("/logout");

    setAuth({});
    navigate("/", { replace: true });

    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};
function Unauthorized() {
  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const from = location?.state?.from.pathname || "/";
  const onClickHandler = () => {
    setLoading(true);
    logoutHandler(navigate, setLoading, setAuth);
  };
  return (
    <div className="flex flex-col">
      <h1>Unauthorized</h1>
      <Link to={from}>Go back</Link>
      <Button onClick={onClickHandler} className="flex-none">
        {loading ? <Spinner /> : "Logout"}
      </Button>
    </div>
  );
}

export default Unauthorized;
