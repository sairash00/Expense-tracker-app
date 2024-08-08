import jwt from 'jsonwebtoken'
import {User} from "../model/user.model.js"

const isLoggedIn = async (req,res,next) =>{
try {
        const token = req.cookies.accessToken;
        
        if(!token){
            req.user = null
           return next();
        }

        const verifiedToken = jwt.verify(token,"generateToken");
        const{id,email} = verifiedToken
    
        const user = await User.findOne({email}).select(
            "-username -password -expenses -incomes"
        )
        

        if(!user){
            return res.json({
                status: 500,
                message: "unauthorized request, User not found",
            })
        }
        req.user = user
        next()

} catch (error) {
    return res.json({
        status: 500,
        message: `Internal server error`
    })

}
}

export default isLoggedIn