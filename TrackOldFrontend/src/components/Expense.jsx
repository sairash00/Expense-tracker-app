import React ,{useState, useEffect} from 'react'
import Details from './Details'
import AddExpense from './AddExpense.jsx'
import './style.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Expense = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])




  useEffect(()=>{
    async function checkActive(){
     const response = await axios.get("http://localhost:3000/api/v1/users/isActive") 
     const data = response.data 
     

     if(data.logout){
        navigate("/")
     }
    }
    checkActive()

    async function fetchExpense(){
      const response = await axios.get("http://localhost:3000/api/v1/users/getExpenses")
      const data = response.data.Expenses
      setData(data)
    }
    fetchExpense()


},[])

  const[show, setShow] = useState(false)
  function change(){
    setShow(!show)
  }
  return (
    <>
        <main className=' w-full fixed z-0 flex justify-end items-center h-[90vh] bg-white '>
                <article className=' w-[80vw] h-[90vh] flex flex-col gap-3  py-5 px-14  ' >
                    <div className='flex justify-between'>
                        <h1 className='font-semibold text-xl '>Your Expenses : </h1>
                        <button onClick={change} className='px-2 shadow-xl  z-10 py-1 mr-16 bg-[#382B47] text-[#fff] rounded-[10px] rounded-tl-[0px] ' >Add Expense</button>
                        </div>
                        <div id='area51' className='w-full h-full flex flex-wrap gap-x-24 gap-y-4  overflow-y-scroll '>
                        {
                          data.map((card)=>(
                            <Details key={card._id} amt = {card.amount} fname = {card.to} source = { card.purpose} date = {new Date(card.createdAt).toISOString().split('T')[0] } />
                          ))
                          }
                        
                        </div>
                </article>
                  { show ? <AddExpense /> : null}
        </main>
    </>
  )
}

export default Expense