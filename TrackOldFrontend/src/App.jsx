import {useEffect, useState} from 'react'
// import axios from 'axios'
import Home from "./components/Home.jsx"
import Topbar from './components/Topbar.jsx'
import Navbar from './components/Navbar.jsx'
import Income from './components/Income.jsx'
import Expense from './components/Expense.jsx'
import Dashboard from './components/Dashboard.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RxHamburgerMenu } from "react-icons/rx";
import Login from './components/Login.jsx'


const App = () => {

  const[toggle, setToggle]  = useState(true)
  function change(){
    setToggle(!toggle)
  }


  
  return (
    <BrowserRouter>
      <Topbar />
      <button onClick={change} className=' shadow-lg absolute z-10 top-20 left-20 bg-[#8C46FF] p-3 rounded'><RxHamburgerMenu className=' text-3xl text-[#fff]' /></button>
      {toggle? <Navbar /> : null}
      <Routes>
        <Route path='/income' element = {<Income/>} />
        <Route path='/expense' element = {<Expense/>} />
        <Route path='/dashboard' element = {<Dashboard/>} />
        <Route path='/home' element = {<Home />} />

        <Route path='/' element = {<Login/>} />
      </Routes>
    </BrowserRouter>  

)
}

export default App