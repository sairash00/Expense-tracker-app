import axios from 'axios'

async function checkActive(navigate){
    try {
        const response = await axios.get(`/api/v1/users/isActive`) 
        const data = response.data
        if(!data.logout){
           navigate("/dashboard")
        }
        return  data ;

    } catch (error) {
        if(axios.isAxiosError(error)){
            return;
        }else{
            return;
        }
    }
}
async function checkActive2(navigate){
    try {
        const response = await axios.get("/api/v1/users/isActive") 
        const data = response.data
        if(data.logout){
           navigate("/")
        }
        return  data ;

    } catch (error) {
        if(axios.isAxiosError(error)){
            return navigate("/login")
        }else{
            return navigate("/login")
        }
    }
}

export { checkActive , checkActive2 };