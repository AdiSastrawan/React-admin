import useAuth from "../../hooks/useAuth";

function Dashboard() {
  const { auth } = useAuth();
  console.log(auth);
  return <div>Hellow</div>;
}

export default Dashboard;
