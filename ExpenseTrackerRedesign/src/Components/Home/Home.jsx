import {Link, useNavigate} from 'react-router-dom'
import {checkActive} from '../../utils/CheckActive'
import { useEffect } from 'react'

const Home = () => {
  const navigate = useNavigate()
  useEffect(() => {
    checkActive(navigate)
  },[])


  return (
    <div className=" px-[4rem] py-[4rem] flex flex-col gap-5 items-center h-[90vh] justify-center " >
        <h1 className=" tracking-widest text-6xl font-bold max-xs:text-5xl " >TRACK</h1>
        <h3 className=' max-xs:text-[0.68rem] max-xs:tracking-tighter ' >Track Today, Save Tomorrow.</h3>

        <div className="flex max-xs:flex-col items-center justify-center gap-2 " >
            <Link to={"/register"} ><button className=' text-sm text-[#e4e3e3] px-2 py-1 rounded-md hover:bg-[#e4e3e3] border hover:text-[#202020] transition-all ' >Get Started</button></Link>
            <Link to={"/login"} ><button className=' text-sm text-[#e4e3e3] px-2 py-1 rounded-md hover:bg-[#e4e3e3] border hover:text-[#202020] transition-all ' >Login</button></Link>
        </div>
    </div>
  )
}

export default Home