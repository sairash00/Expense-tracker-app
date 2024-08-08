import { IoIosArrowDroprightCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from 'axios'
import {useState, useEffect} from 'react'

const Top = () => {

  const [totIncome, setTotIncome] = useState(0)
  const [totExpense, setTotExpense] = useState(0)

  async function  calculateTotal() {

      const eResponse = await axios.get(`/api/v1/users/getExpenses`)
      const iResponse = await axios.get(`/api/v1/users/getIncomes`)
      const eData = eResponse.data.Expenses
      const iData = iResponse.data.incomes
    
      let eTotal = 0
      let iTotal = 0

      eData.forEach(expense => {
          eTotal += expense.amount
      });
      iData.forEach(income => {
          iTotal += income.amount
      });

      setTotIncome(iTotal)
      setTotExpense(eTotal)

  }

  useEffect(() => {
    try {
      calculateTotal()
    } catch (error) {
      return;
    }
  },[])

  return (
    <div className=" flex flex-col items-center gap-2 " >

      <div className=" w-[50%]  max-md:w-[70%] max-sm:w-full flex justify-between items-center gap-2 px-4 py-3 rounded-md bg-gradient-to-tr from-[#09841d] to-[#12eb37] " >
        <div className=" flex flex-col gap-2 " >
            <div className=" text-sm font-semibold " >Income</div>
            <div className="text-xl font-bold tracking-wider " >Rs. {totIncome} </div>
        </div>
        <Link to={"/income"}><IoIosArrowDroprightCircle className=" text-3xl" /></Link>
      </div>

      <div className=" w-[50%] max-md:w-[70%] max-sm:w-full flex justify-between items-center gap-2 px-4 py-3 rounded-md bg-gradient-to-tr from-[#9f0707] to-[#eb1212] " >
        <div className=" flex flex-col gap-2 " >
            <div className=" text-sm font-semibold " >Expense</div>
            <div className="text-xl font-bold tracking-wider " >Rs. {totExpense} </div>
        </div>
        <Link to={"/expense"}><IoIosArrowDroprightCircle className=" text-3xl" /></Link>

      </div>

      <div className=" w-[50%] max-md:w-[70%] max-sm:w-full flex justify-between items-center gap-2 px-4 py-3 rounded-md bg-gradient-to-tr from-[rgb(2,94,163)] to-[#4c9ef1] " >
        <div className=" flex flex-col gap-2 " >
            <div className=" text-sm font-semibold " >Profit/Loss</div>
            <div className="text-xl font-bold tracking-wider " >Rs. {totIncome-totExpense} </div>
        </div>
      </div>

    </div>
  )
}

export default Top