import React, { useState } from 'react'
import axios from 'axios'

const AddExpense = () => {

  const [amt, setAmount] = useState('')
  const [to, setTo] = useState('')
  const [purpose, setPurpose] = useState('')

  function amountChange(e){
      setAmount(e.target.value)
  } 
  function toChange(e){
       setTo(e.target.value)
  }
  function purposeChange(e){
       setPurpose(e.target.value)
  }


  const [msg, setMsg] = useState("")
  const handleAddExpense =async function(e){
      e.preventDefault()
      const amount = parseInt(amt)
      if( !isNaN(amount) && amount>0 && to && purpose){
        console.log(to,purpose)
      const response  = await axios.post("http://localhost:3000/api/v1/users/addExpense",{
          amount,
          to,
          purpose
      })
      const data = response.data
      setMsg(data.message);
  }else{
      setMsg("Provide information sincerely")
  }


      setTo("")
      setPurpose("")
      setAmount("")
  }

  // console.log(amount, to , purpose)

  return (
    <>
        <div className=' flex items-center justify-center  absolute z-[7] h-[90vh] bg-[#382B47] w-full '>
            <div className='w-[25vw] h-[65vh] flex flex-col gap-4 items-center px-4 py-4 rounded-[50px] shadow-xl rounded-tl-[0] bg-[#FCEAFF] text-[#382B47]  '>

                <div className='  ' >
                <h1 className='text-2xl font-semibold' >Add your Expenses</h1>
                </div>

                <div className='flex  flex-col items-center w-full border'>
                    <div>
                        <form  action="">
                            <p>Amount :</p>

                            <input
                             className='px-2  py-1 rounded-[20px]  rounded-tl-[0] bg-[#382B47] text-white placeholder-white font-semibold '
                             type="text"
                             placeholder='Enter Amount'
                             onChange={amountChange}
                             value={amt}
                             
                             />

                            <br />
                            <br />
                            <p>To :</p>

                            <input className='px-2  py-1 rounded-[20px]  rounded-tl-[0] bg-[#382B47] text-white placeholder-white font-semibold '
                             type="text"
                             placeholder='Enter the Name'
                             onChange={toChange}
                             value = {to}
                              />

                            <br />
                            <br />
                            <p>Purpose :</p>
                            <input className='px-2  py-1 rounded-[20px]  rounded-tl-[0] bg-[#382B47] text-white placeholder-white font-semibold '
                             type="text"
                             placeholder='Enter the Purpose'
                             onChange={purposeChange}
                             value={purpose}
                              />

                            <br />
                            <br />
                            <button onClick={handleAddExpense} className='px-2 w-full  py-1 rounded-[20px]  rounded-tl-[0] bg-[#382B47] text-white placeholder-white font-semibold ' >Add</button>
                        </form>
                    </div>
                    <h1 className='font-semibold text-sm mt-3' >{msg}</h1>
                </div>
            </div>
        </div>
    </>
  )
}

export default AddExpense