import React, {useState,useEffect}from 'react'
import Details from './Details'
import './style.css'
import Addincome from './AddIncome'
import axios from 'axios'
import {useNavigate} from "react-router-dom"

const Income = () => {

  const [data,setData] = useState([])


  useEffect(()=>{
    async function checkActive(){
     const response = await axios.get("http://localhost:3000/api/v1/users/isActive") 
     const data = response.data
     if(data.logout){
       navigate("/")
     }
    }
    checkActive()

    async function fetchIncome(){
      const response = await axios.get("http://localhost:3000/api/v1/users/getIncomes")
      const resdata = response.data.incomes
      setData(resdata)
    }
    fetchIncome()
},[])

  const [toggle, setToggle] = useState(false)

  function change(){
    setToggle(!toggle)
  }
  return (
    <>
        <main className='  w-full flex relative z-0 justify-end items-center h-[90vh] bg-white '>
                <article className=' w-[80vw] h-[90vh] flex flex-col gap-3  py-5 px-14  ' >
                      <div className='flex justify-between'>
                          <h1 className='font-semibold text-xl '>Your Income : </h1>

                          <button onClick={change}   className=' z-10 shadow-xl px-2 py-1 mr-16 bg-[#64BAAA] text-[#fff] rounded-[10px] rounded-tl-[0px] ' >Add Income</button>

                        </div>
                        <div id='area51' className='w-full h-full flex  flex-wrap  gap-x-4 gap-y-4 overflow-y-scroll '>
                          
                          {
                          data?.map((card)=>(
                            <Details key={card._id} isIncome={true} amt = {card.amount} fname = {card.from} source = { card.source} date = {new Date(card.createdAt).toISOString().split('T')[0] } />
                          ))
                          }
                        </div>
                </article>
                     
                      {toggle ? <Addincome/> : ''}

        </main> 
    </>
  )
}

export default Income