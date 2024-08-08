import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {checkActive} from "../../utils/CheckActive.jsx"
import axios from 'axios'

const Register = () => {
  const navigate = useNavigate()
  const [msg, setMsg] = useState("")
  const [show, setShow] = useState(false)

  const [data, setData] = useState({
    username: "",
    email: "",
    password: ""
  })

  const handleFormData = (e) => {
    setData({
      ...data,
      [e.target.name] : e.target.value
    })
  }

  const ChangeShow = () => {
      setShow(!show)
  }

  useEffect(() => {
    checkActive(navigate)
  },[])

  async function handleRegisterSubmit(e){
    e.preventDefault()

    try {
      const response = await axios.post("/api/v1/users/register",
        {
          username : data.username,
          password : data.password,
          email : data.email
        })
      const info = response.data
      if(info.loggedIn){
          navigate("/dashboard")
      }
      setMsg(info.message)
      
      setData({
        email: "",
        password: "",
        username: ""
      })
    } catch (error) {
      if(axios.isAxiosError(error)){
        return setMsg(error.response.data.message)
      }else{
        return setMsg("Something went wrong")
      }
    }

}

  return (
    <div className="w-screen h-screen flex gap-6 flex-col text-[#e4e3e3] items-center py-[3rem]" >
        <div>
            <div className=" text-3xl " >Register to Track</div>
        </div>
        <div className="min-w-[30vw] py-5 px-5 rounded-md h-fit  border border-gray-500 " >
          <form onSubmit={handleRegisterSubmit} className=" flex flex-col gap-6 " >
            
            <div className="flex flex-col gap-2 " >
               <label htmlFor="email" className=" text-sm " >E-Mail:</label> 
               <input name="email" value={data.email} onChange={handleFormData} id="email" className="bg-transparent text-sm border border-gray-500 px-2 py-1 rounded-sm outline-none " type="email" />  
            </div>

            <div className="flex flex-col gap-2 " >
               <label htmlFor="username" className=" text-sm " >Username</label> 
               <input name="username" value={data.username} onChange={handleFormData} id="username" className="bg-transparent text-sm border border-gray-500 px-2 py-1 rounded-sm outline-none " type="text" />  
            </div>

            <div className="flex flex-col gap-2 " >
               <label htmlFor="password" className=" text-sm " >Password:</label> 
               <input name="password" value={data.password} onChange={handleFormData} id="password" className="bg-transparent text-sm border border-gray-500 px-2 py-1 rounded-sm outline-none " type={show?"text" : "password"} />  

               <div className="flex items-center gap-2 px-1 mt-2 ">
                <input type="checkbox" id="show" onClick={ChangeShow} className=" h-4 w-4  "/>
                <label className="text-[0.8rem] " htmlFor="show">Show Password</label>
               </div>
            </div>

            <div className=" flex flex-col gap-4 items-center " >
                {msg ? <p className="text-red-600 text-[0.7rem]">{msg}</p> : null}
                <button type="submit" className=" w-full bg-green-700 font-semibold px-1 py-1 rounded-sm hover:bg-green-800 transition-all " > Register</button>
                <div className="text-[0.75rem] " >Already have a account, <Link to={"/login"} className=" underline underline-offset-2 " >Login</Link> </div>
            </div>
          </form>
        </div>
    </div>
  )
}

export default Register