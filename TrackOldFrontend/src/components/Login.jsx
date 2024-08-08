import React, {useState,useEffect} from 'react'
import { IoMdSwap } from "react-icons/io";
import axios from 'axios' 
import {useNavigate} from 'react-router-dom'


const Login = () => {

    useEffect(()=>{
      async function checkActive(){
       const response = await axios.get("http://localhost:3000/api/v1/users/isActive") 
       const data = response.data
       
       console.log(data)
  
       if(!data.logout){
          navigate("/home")
       }
      }
      checkActive()
  },[])


    const [btnText,setBtnText] = useState("Login")
    const [isdefault, setDefault] = useState(true)
    function change(){
        setDefault(!isdefault)
        btnText === 'Login' ? setBtnText("Register") : setBtnText("Login")
    }

    const [loginEmail, setLoginEmail] = useState('')
    const[loginPassword, setLoginPassword] = useState('')

    const [rEmail, setREmail] = useState("")
    const [rPassword, setRPassword] = useState("")
    const [rUsername, setRUsername] = useState("")

    
    function handleLoginEmailChange(e){
        setLoginEmail(e.target.value)
    }
    function handleLoginPasswordChange(e){
        setLoginPassword(e.target.value)
    }
    function handleEmailRegisterChange(e){
        setREmail(e.target.value)
    }
    function handlePasswordRegisterChange(e){
        setRPassword(e.target.value)
    }
    function handleUsernameRegisterChange(e){
        setRUsername(e.target.value)
    }

   const[checked, setChecked] = useState(false)
    function handleCheckbox(e){
        setChecked(e.target.checked)
    }
    

    const navigate = useNavigate()


    const [loginMsg, setLoginMsg] = useState("")
   async  function handleLoginSubmit(e){
        e.preventDefault()

        const email = loginEmail;
        const password = loginPassword

        console.log(email,password)

        const response = await axios.post("http://localhost:3000/api/v1/users/login",
        {email,password,
   })
        const data = response.data
        console.log(data)
        setLoginMsg(data.message)
        
        if(data.loggedIn){
            navigate("/home")
        }

        setLoginEmail("")
        setLoginPassword("")

    }
    const [msg,setMsg] = useState("")
    async function handleRegisterSubmit(e){
        e.preventDefault()

        const email = rEmail
        const password = rPassword
        const username = rUsername

        const response = await axios.post("http://localhost:3000/api/v1/users/register",{username,password,email})
        const data = response.data
        setMsg(data.message)
        
        if(data.loggedIn){
            navigate("/home")
        }


        setREmail("")
        setRPassword("")
        setRUsername("")

    }
    

  return (
    <>
    
     <div className='w-full relative z-[11] bg-white h-[90vh] flex flex-row-reverse justify-center   '>

                <div className=' h-[10vh] flex justify-end  flex-col'>
                    <button onClick={change} className='px-2 py-1 flex items-center justify-center w-[8vw] gap-2 bg-red-600 text-white rounded-md rounded-tl-[0]' >{btnText}<IoMdSwap /></button>
                </div>

            <div className=' p-3  w-[55vw] h-full  flex justify-center gap-10 flex-col items-center  ' >
                
                {isdefault ? 
                <div className='w-[25vw] flex fixed gap-10 justify-center items-center bg-[#8C46FF] flex-col  h-[75vh] py-5 text-white rounded-[20px] rounded-tl-[0] px-3   '>
                        <h1 className='text-2xl font-semibold '>Login</h1>
                            <form action="">
                                
                                <h1>E-Mail :</h1>

                                <input 
                                type="Email" 
                                 className='outline-none border p-1 font-semibold text-[#8C46FF] placeholder-[#8C46FF] rounded-md rounded-tl-[0]   '
                                 placeholder='Enter your Email'
                                 value={loginEmail} 
                                 onChange={handleLoginEmailChange}
                                 />

                                <br />
                                <br />
                                <h1>Password :</h1>
                                <input 
                                  type={checked ? "text" : "password"}
                                  className='outline-none border p-1 font-semibold text-[#8C46FF] placeholder-[#8C46FF] rounded-md rounded-tl-[0]   ' 
                                  placeholder='Enter your Password'
                                  value={loginPassword}
                                  onChange={handleLoginPasswordChange}
                                   />

                                <br />
                                <br />
                                
                                <span className='flex gap-2'><input onChange={handleCheckbox} type="checkbox"/><h1>Show Password</h1></span>
                                <br />
                                
                                <input onClick={handleLoginSubmit} className='px-1 py-1 w-full  rounded-md rounded-tl-[0] bg-white text-[#8C46FF] font-semibold ' type="Submit" />
                            </form>
                                <h1 className='font-semibold text-sm'>{loginMsg}</h1>


                </div> : <div className='w-[25vw] flex fixed gap-5 justify-center items-center bg-[#8C46FF] flex-col  h-[80vh] py-5 text-white rounded-[20px] rounded-tl-[0] px-3   '>
                        <h1 className='text-2xl font-semibold '>Register</h1>
                            <form action="">
                                
                                <h1>E-Mail :</h1>
                                <input type="Email" value={rEmail} onChange={handleEmailRegisterChange}  className='outline-none border p-1 font-semibold text-[#8C46FF] placeholder-[#8C46FF] rounded-md rounded-tl-[0]   ' placeholder='Enter your Email' />
                                <br />
                                <br />
                                <h1>Username :</h1>
                                <input type="text"  value={rUsername} onChange={handleUsernameRegisterChange} className='outline-none border p-1 font-semibold text-[#8C46FF] placeholder-[#8C46FF] rounded-md rounded-tl-[0]   ' placeholder='Enter your username' />

                                <br />
                                <br />

                                <h1>Password :</h1>
                                <input type={checked? "text" : "password"} value={rPassword} onChange={handlePasswordRegisterChange}  className='outline-none border p-1 font-semibold text-[#8C46FF] placeholder-[#8C46FF] rounded-md rounded-tl-[0]   ' placeholder='Enter your Password' />
                                <br />
                                <br />
                                
                                <span className='flex gap-2'><input onChange={handleCheckbox} type="checkbox"/><h1>Show Password</h1></span>
                                <br />
                                
                                <input onClick={handleRegisterSubmit} className='px-1 py-1 w-full  rounded-md rounded-tl-[0] bg-white text-[#8C46FF] font-semibold ' type="Submit" />
                
                            </form>
                            <h1 className='text-sm font-semibold '>{msg}</h1>
                </div>
 }

                
            </div> 
     </div>

    </>
  )
}

export default Login