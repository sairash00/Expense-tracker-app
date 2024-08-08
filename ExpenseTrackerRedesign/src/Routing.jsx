import { Outlet } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'

const Routing = () => {
  return (
    <>
    <Navbar />
      <main className=' flex justify-center ' >
        <Outlet />
      </main>
    </>
  )
}

export default Routing