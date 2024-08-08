import {useState} from 'react'
import axios from 'axios'

const Addincome = () => {

    const [from,setFrom ] = useState("")
    const [source, setSource] = useState("")
    const [amt, setAmt] = useState("") 

    function fromChange(e){
        setFrom(e.target.value)
    }
    function sourceChange(e){
        setSource(e.target.value)
    }
    function amtChange(e){
        setAmt(e.target.value)
    }
    const [msg, setMsg] = useState("")
    const handleAddIncome =async function(e){
        e.preventDefault()
        const amount = parseInt(amt)
        if( !isNaN(amount) && amount>0 && from && source){
        const response  = await axios.post("http://localhost:3000/api/v1/users/addIncome",{
            from,
            source,
            amount
        })
        const data = response.data
        setMsg(data.message);
    }else{
        setMsg("Provide Information Sincerely")
    }


        setFrom("")
        setSource("")
        setAmt("")
    }

  return (
    <>
        <div className=' flex items-center justify-center absolute  z-[7] h-[90vh]  bg-[#64BAAA] w-full '>
            <div className='w-[25vw] h-[65vh] flex flex-col gap-4 items-center px-4 py-4 rounded-[50px] shadow-xl rounded-tl-[0] bg-[#FCEAFF] text-[#64BAAA]  '>

                <div className='  ' >
                <h1 className='text-2xl font-semibold' >Add your Income</h1>
                </div>

                <div className='flex  flex-col items-center w-full'>
                    <div>
                        <form  action="">
                            <p>Amount :</p>

                            <input 
                             className='px-2  py-1 rounded-[20px]  rounded-tl-[0] bg-[#64BAAA] text-white placeholder-white font-semibold ' 
                             type="text"
                              value = {amt}
                              onChange={amtChange}
                              placeholder='Enter Amount'
                               />

                            <br />
                            <br />
                            <p>From :</p>

                            <input 
                            className='px-2  py-1 rounded-[20px]  rounded-tl-[0] bg-[#64BAAA] text-white placeholder-white font-semibold '
                             type="text"
                              placeholder='Enter the Name' 
                              value ={from}
                              onChange={fromChange}
                               />

                            <br />
                            <br />

                            <p>Source :</p>

                            <input
                             className='px-2  py-1 rounded-[20px]  rounded-tl-[0] bg-[#64BAAA] text-white placeholder-white font-semibold '
                             type="text"
                              placeholder='Enter the Source'  
                              value = {source}
                              onChange={sourceChange}
                              />

                            <br />
                            <br />
                            <button onClick={handleAddIncome} className='px-2 w-full  py-1 rounded-[20px]  rounded-tl-[0] bg-[#64BAAA] text-white placeholder-white font-semibold ' >Add</button>
                            <br />
                        </form>
                    </div>
                        <h1 className='mt-2 font-semibold text-sm' >{msg}</h1>
                </div>
            </div>
        </div>
    </>
  )
}

export default Addincome