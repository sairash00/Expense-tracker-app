import {Routes, Route} from 'react-router-dom'
import Home from "./Components/Home/Home.jsx"
import Routing from './Routing.jsx'
import Login from "./Components/LoginRegister/Login.jsx"
import Register from "./Components/LoginRegister/Register.jsx"
import Expense from './Components/IncomeExpense/Expense.jsx'
import Income from './Components/IncomeExpense/Income.jsx'
import Dashboard from './Components/Dashboard.jsx/Dashboard.jsx'
import NotFound from './Components/NotFound.jsx'
import axios from 'axios'

axios.defaults.withCredentials = true;


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Routing />} >
          <Route path = "/" element={<Home />} />
          <Route path = "/income" element={<Income />} />
          <Route path = "/expense" element={<Expense />} />
          <Route path = "/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App