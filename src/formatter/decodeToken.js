import jwtDecode from "jwt-decode";

const decodeToken = (token) => {
  if (!token) return null;
  const decode = jwtDecode(token);
  console.log(decode);

  return decode;
};

export default decodeToken;
