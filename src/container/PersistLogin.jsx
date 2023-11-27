import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";
import Spinner from "../components/Spinner";
import { Outlet } from "react-router-dom";

function PersistLogin() {
  const { auth } = useAuth();
  const refresh = useRefreshToken();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let isMounted = true;
    const verifyToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        isMounted && setLoading(false);
      }
    };
    if (!auth?.accessToken) {
      verifyToken();
    } else {
      setLoading(false);
    }
    return () => (isMounted = false);
  }, []);
  return loading ? (
    <div className="w-full min-h-screen justify-center flex items-center">
      <Spinner className="h-20 w-20" />
    </div>
  ) : (
    <Outlet />
  );
}

export default PersistLogin;
