import React from 'react'

const Details = ({isIncome,amt,date,fname,source}) => {
    
  return (
    <>
        <div className= {isIncome ? "bg-[#64BAAA] flex items-center justify-around text-[#FCEAFF] w-[30vw] h-[20vh] rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]" : "bg-[#382B47] flex items-center justify-around text-[#FCEAFF] w-[30vw] h-[20vh] rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]"} >
            <div className='text-3xl'>Rs. {amt ? amt : 0 }</div>
            <div className='flex flex-col gap-1 font-semibold'>
                <h1>{date ? date : "Unknown Date"}</h1>
                <h1>{isIncome ? "From" : "To"} : {fname ? fname : "Unknown" }</h1>
                <h1>{isIncome ? "Source" : "Purpose"} : {source ? source : "Unknown" }</h1>
            </div>
        </div>
    </>
  )
}

export default Details