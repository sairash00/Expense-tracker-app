import React from 'react'
import {Link} from 'react-router-dom'


const Navbar = () => {
  return (
    <>
    <aside  className='w-[20vw] fixed z-[9] text-[#FCEAFF] flex py-4 justify-center  items-center flex-col h-[90vh] bg-[#8C46FF]' >
            <div className='flex flex-col  gap-6 text-xl'> 
                <Link to= "/home">Home</Link>
                <Link to = "/income" >Income</Link>
                <Link to = "/expense" >Expense</Link>
                <Link to = "/dashboard">Dashboard</Link>
            </div>
            <div className=' flex fixed bottom-2 justify-center flex-col items-center text-sm '>
                <p>Privacy Policy</p>
                <p>Copyright Track my Cash 2024</p>
            </div>

    </aside>
    </>
  )
}

export default Navbar