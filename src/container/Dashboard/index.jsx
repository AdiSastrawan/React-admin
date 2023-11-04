import HeaderOutlet from "../../features/Header"
import useAuth from "../../hooks/useAuth"

function Dashboard() {
  const { auth } = useAuth()
  return (
    <div className="mx-4 h-fit">
      <div className="grid grid-cols-4 gap-4">
        <div className="min-h-[3rem] flex items-center justify-center shadow-md rounded-md">
          <h2 className="font-bold text-center">Kuntul</h2>
        </div>
        <div className="min-h-[3rem] flex items-center justify-center shadow-md rounded-md">
          <h2 className="font-bold text-center">Kuntul</h2>
        </div>
        <div className="min-h-[3rem] flex items-center justify-center shadow-md rounded-md">
          <h2 className="font-bold text-center">Kuntul</h2>
        </div>
        <div className="min-h-[3rem] flex items-center justify-center shadow-md rounded-md">
          <h2 className="font-bold text-center">Kuntul</h2>
        </div>
      </div>

      <div className="w-full grid grid-cols-3  py-8 gap-2">
        <div className="flex col-span-2 min-h-[3rem] shadow-md rounded-md">Hg</div>
        <div className="flex  min-h-[3rem] shadow-md rounded-md">Hi</div>
        <div className="flex col-span-2 min-h-[3rem] shadow-md rounded-md">Hg</div>
        <div className="flex  min-h-[3rem] shadow-md rounded-md">Hi</div>
      </div>
    </div>
  )
}

export default Dashboard
