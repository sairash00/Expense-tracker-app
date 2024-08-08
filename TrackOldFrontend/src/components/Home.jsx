import {useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    useEffect(()=>{
    async function checkActive(){
        const response = await axios.get("http://localhost:3000/api/v1/users/isActive") 
        const data = response.data
        
        console.log(data)
   
        if(data.logout){
           navigate("/")
        }
       }
       checkActive()
   },[])

  return (
    <div>Home</div>
  )
}

export default Home