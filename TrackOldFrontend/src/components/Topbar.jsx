import React from 'react'
import {useState, useEffect} from "react"
import {Link} from 'react-router-dom'
import axios from 'axios'

const Topbar = () => {

  // useEffect(()=>{
  //     const isActive = async () => {
  //       const response = await axios.get("http://localhost:3000/api/v1/users/isActive")
  //       console.log("before")
  //       console.log(response)
  //     }
  //     isActive()
  // },[])
  
  return (
    <>
      <div className=' flex justify-center items-center text-[#FCEAFF] w-full h-[10vh] bg-[#8C46FF]  py-2 px-20 '>

          <h1 className=' text-[28px] '  >Track Your Cash</h1>
          
          

      </div>
    </>
  )
}

export default Topbar