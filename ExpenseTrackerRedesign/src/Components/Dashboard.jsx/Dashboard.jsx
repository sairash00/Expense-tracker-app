import Top from "./Top"
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from "react"
import {checkActive2} from "../../utils/CheckActive.jsx"

const Dashboard = () => {
  const navigate = useNavigate()
  const [data, setData] = useState()

  useEffect(() => {
    async function check(){
    setData( await checkActive2(navigate) )
    }
    check()
  },[])
  async function handleLogout(){
    try {
      const response = await axios.post("/api/v1/users/logout")
      const data = response.data  
      if(data.logout){
          navigate("/")
      }
    } catch (error) {
      if(axios.isAxiosError(error)){
        return;
      }else{
        return;
      }
    }
  }


  return (
    <div className=" w-[70%] max-k:w-full max-h-[90vh] overflow-y-auto px-[2rem] flex flex-col gap-10 py-[3rem] " >
      <Top />
      <div className=" mt-5 max-xs:flex-col gap-y-5 flex justify-between items-center px-4 py-2 " >
        <div className=" flex  items-center flex-col gap-1 " >
            <div className="text-sm font-semibold " >Username:</div>
            <div className="text-xl   max-sm:text-sm font-bold " > {data?.user?.username || "Unknown" } </div>
        </div>
        <div className=" flex  items-center flex-col gap-1 " >
            <div className="text-sm font-semibold " >Email:</div>
            <div className="text-xl  max-sm:text-sm font-bold " > {data?.user?.email || "None" } </div>
        </div>
        <div className=" flex items-center  flex-col gap-1 " >
            <div className="text-sm font-semibold " >Joined:</div>
            <div className="text-xl max-sm:text-sm  font-bold " >{ new Date(data?.user?.createdAt).toLocaleDateString() || "None"}</div>
        </div>
      </div>
      <div className=" flex-col items-center gap-4 mt-2 flex justify-center " >
        <p className=" text-sm max-sm:text-[0.8rem] text-center " >Remember your Email and Password because you cannot change it.</p>
        <button onClick={handleLogout} className=" bg-red-800 hover:bg-red-900 rounded px-2 py-1 " >
         Log-Out
        </button>
      </div>
    </div>
  )
}

export default Dashboard