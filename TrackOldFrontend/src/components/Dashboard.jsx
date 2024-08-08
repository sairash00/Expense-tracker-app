import {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
    const navigate = useNavigate()
    const [msg,setMsg] = useState("")

    const [totIncome,setTotIncome] = useState(0)
    const [totExpense, setTotExpense] = useState(0)
    const [username,setUsername] = useState("")
    const [joined, setJoined] = useState("")

    useEffect(()=>{
        async function checkActive(){
         const response = await axios.get("http://localhost:3000/api/v1/users/isActive") 
         const data = response.data

         setUsername(data.user.username)
         setJoined(new Date(data.user.createdAt).toISOString().split('T')[0] )

         if(data.logout){
            navigate("/")
         }
        }
        checkActive()

         async function  calculateTotal() {
            const eResponse = await axios.get("http://localhost:3000/api/v1/users/getExpenses")
            const Response = await axios.get("http://localhost:3000/api/v1/users/getIncomes")


            const eData = eResponse.data.Expenses
            const Data = Response.data.incomes
            


            let eTotal = 0
            let iTotal = 0

            
            eData.forEach(expense => {
                eTotal += expense.amount
            });

            Data.forEach(income => {
                iTotal += income.amount
            });

            setTotIncome(iTotal)
            setTotExpense(eTotal)
    
        }
        calculateTotal()
    },[])



    async function handleLogout(){
        // e.preventDefault()
        const response = await axios.post("http://localhost:3000/api/v1/users/logout")
        const data = response.data
        setMsg(data.message)
        
        if(data.logout){
            navigate("/")
        }

    }
  return (
<>
    <div className='w-[] bg-[#FCEAFF] h-[90vh] flex justify-center  '>
        <div className='w-[55vw] h-[90vh]  flex flex-col justify-evenly  '>
                <div className='w-full flex justify-center flex-col items-center gap-3'>
                        <h1 className='text-3xl font-semibold'  >{ username? username : "unknown" }</h1>
                        <h1 className='text-md font-bold ' >{joined? joined : "unknown"}</h1>
                </div>
                <div className='flex justify-evenly  w-full'>
                    <div className='flex flex-col gap-5  ' >

                        <div className='w-fit text-white bg-[#64BAAA] h-[18vh] flex flex-col gap-4 px-2 py-1 rounded-[20px] rounded-tl-[0]   ' >
                            <h1 className='text-lg font-semibold' >Total Income</h1>
                            <h1  className='text-3xl font-bold' >Rs.{totIncome}</h1>
                        </div>

                    </div>

                    <div className='flex flex-col gap-5  ' >

                        <div className='w-fit text-white bg-[#382B47] h-[18vh] flex flex-col gap-4 px-2 py-1 rounded-[20px] rounded-tl-[0]   ' >
                            <h1 className='text-lg font-semibold' >Total Expenses</h1>
                            <h1  className='text-3xl font-bold' >Rs.{totExpense}</h1>
                        </div>

                        
                    </div>

                    <div className='flex flex-col gap-5  ' >

                        <div className='w-fit text-white bg-[#202020] h-[18vh] flex flex-col gap-4 px-2 py-1 rounded-[20px] rounded-tl-[0] ' >
                            <h1 className='text-lg font-semibold' >Total Saving</h1>
                            <h1  className='text-3xl font-bold' >Rs.{totIncome - totExpense}</h1>
                        </div>

                        
                    </div>

                </div>
                        
                <div className='w-full gap-2 h-[10vh] flex flex-col items-center justify-center ' >
                    <button className=' font-semibold text-sm w-[150px] px-4 py-2 bg-red-600 text-[#fff] rounded-[10px] rounded-tl-[0px] ' onClick={handleLogout} >Log Out</button>
                    <h1 className=' font-semibold text-sm ' >{msg}</h1>
                </div>
                
        </div>
    </div>
</>

  )
}

export default Dashboard