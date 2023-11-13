import axiosClient from "../../axios-client";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Suspense, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import decodeToken from "../../formatter/decodeToken";

const loginHandler = async (payload, setAuth, from, navigation, setLoading) => {
  try {
    const response = await axiosClient.post("/login", payload);
    const accessToken = response.data.accessToken;

    setAuth({ accessToken });
    navigation(from, { replace: true });
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

function Login() {
  const { setAuth, auth } = useAuth();
  const navigation = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      username: username,
      password: password,
    };
    loginHandler(payload, setAuth, from, navigation, setLoading);
    setPassword("");
  };
  return decodeToken(auth?.accessToken) ? (
    <Navigate to={from} state={{ from: location }} />
  ) : (
    <div className="bg-background min-h-screen flex justify-center font-roboto text-white  ">
      <section className="w-1/2 bg-primary my-2 rounded-md">
        <h1 className="text-center py-10 text-2xl font-bold">Login</h1>

        <form onSubmit={submitHandler} className="flex-col justify-center text-xl flex mx-10 space-y-2 " action="">
          <label htmlFor="username">Username or Email</label>
          <Input placeholder="username or email" type="text" onChange={(e) => setUsername(e.target.value)} value={username} py="5" />
          <label htmlFor="password">Password</label>
          <Input placeholder="password" className="text-black" type="password" onChange={(e) => setPassword(e.target.value)} value={password} py="5" />
          <Button disabled={loading && true} type="submit" py="5" px="2">
            {loading ? <Spinner /> : "Submit"}
          </Button>
        </form>
      </section>
    </div>
  );
}

export default Login;
