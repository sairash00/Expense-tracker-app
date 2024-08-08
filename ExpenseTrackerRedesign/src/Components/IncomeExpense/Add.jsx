import { IoMdClose } from "react-icons/io";
import axios from 'axios'
import { useState } from "react";

const Add = ({income, setShow}) => {
    const [msg, setMsg] = useState("")
    const [data, setData] = useState({
        from: "",
        to: "",
        source: "",
        purpose: "",
        amount: 0
    })

    const handleAddExpense = async function(e){
        e.preventDefault()
        const response  = await axios.post(`/api/v1/users/addExpense`,
            {
                amount : data.amount,
                to : data.to,
                purpose : data.purpose
            })
        const info = response.data
        setMsg(info.message);
        setData({
            amount:0,
            to:"",
            from:"",
            source:"",
            purpose: ""
        })
        
    }

    const handleAddIncome = async function(e){
        e.preventDefault()
        const response  = await axios.post(`/api/v1/users/addIncome`,
            {
                from : data.from,
                source : data.source,
                amount: data.amount
            })
        const info = response.data
        setMsg(info.message);
        setData({
            amount:0,
            to:"",
            from:"",
            source:"",
            purpose: ""
        })
    }

    const handleFormData = (e) => {
        setData({
            ...data,
            [e.target.name] : e.target.value
       })
    } 

    const handleFormSubmit = (e) => {
        e.preventDefault()

        if ((income && (data.source === "" || data.amount === 0 || data.from === "")) ||
            (!income && (data.purpose === "" || data.amount === 0 || data.to === ""))) {
            return setMsg("Incomplete Data");
        }

        if(income){
            try {
                handleAddIncome(e)
            } catch (error) {
                console.log(error)
                if(axios.isAxiosError(error)){
                    return setMsg(error.response.data.message)
                }else{
                    return setMsg("Something went wrong")
                }
            }

        }else{
            try {
                handleAddExpense(e)
            } catch (error) {
                if(axios.isAxiosError(error)){
                    return setMsg(error.response.data.message)
                }else{
                    return setMsg("Something went wrong")
                }
            }
        }
    }


  return (
    <div  className='w-full h-[90vh] gap-6 flex-col flex items-center py-[4rem] absolute bg-[#00000084] backdrop-blur-md z-10' >
        <IoMdClose onClick={setShow} className=" absolute top-[7vh] right-[10vw] text-4xl " />
        <div className=' text-3xl ' > {income ? "Add Income" : "Add Expense"} </div>
        <div className='min-w-[28vw] px-4 py-4 bg-black rounded-md shadow-lg border-[#101010] border shadow-black h-fit ' >
            <form onSubmit={handleFormSubmit} className=' flex flex-col gap-4 ' >
                <div className='flex flex-col gap-1' >
                    <label htmlFor="amt">Amount:</label>
                    <input value={data.amount} onChange={handleFormData} name="amount" id="amt" required className=' appearance-none px-2 py-1 text-white font-semibold bg-transparent outline-none border-gray-500 border rounded  ' type="number" />
                </div>
                <div className='flex flex-col gap-1' >
                    <label htmlFor="sou">{income ? "Source:" : "Purpose:"}</label>
                    <input value={income? data.source : data.purpose} onChange={handleFormData} name= {income? "source" : "purpose"} id="sou" required className=' appearance-none px-2 py-1 text-white font-semibold bg-transparent outline-none border-gray-500 border rounded  ' type="text" />
                </div>
                <div className='flex flex-col gap-1' >
                    <label htmlFor="person">{income ? "From:" : "To:" } </label>
                    <input value={income ? data.from : data.to} onChange={handleFormData} name= {income ? "from" : "to"} required id="person" className=' appearance-none px-2 py-1 text-white font-semibold bg-transparent outline-none border-gray-500 border rounded  ' type="text" />
                </div>

                <button type="submit" className = {income ? ' py-1 rounded hover:bg-green-800 bg-green-700 ' : ' py-1 rounded hover:bg-red-800 bg-red-700 '} >
                    Add
                </button>
                <div className="text-[0.8rem] text-gray-400 text-center " >{msg}</div>
            </form>
        </div>
    </div>
  )
}

export default Add