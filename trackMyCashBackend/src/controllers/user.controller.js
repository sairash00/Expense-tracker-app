import {User} from '../model/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import generateToken from '../utils/generateAccessToken.js'
import comparePassword from '../utils/checkPassword.js'

 const registerUser = async (req,res) => {
   try {
     const {email, username, password} = req.body
     if(!email.trim()  || !username.trim() || !password.trim() ){
 
         return res.json({
             message: "All fields are required",
             loggedIn: false
         })
     };
     const hashedPassword = await  bcrypt.hash(password,10)
 
     const userExists = await User.findOne({
         $or:[
             {email},
             {username}
         ]
     })
     if(userExists){
         return res.json({
             message: "User already exists, Please login",
             loggedIn: false
         })
     }
 
     const createdUser = await User.create({
         email,
         username,
         password: hashedPassword
     })
 
     const user = await User.findById(createdUser._id).select(
         "-password  -expenses -incomes "
     )
 
     if(!user){
         return res.json({
             message: "something went wrong during registration",
             loggedIn:false
         })
     }
 
     const generatedToken = generateToken(user._id,user.email)
     const options = {
         httpOnly : true,
         secure: true,
         expires: new Date(Date.now()+ 2 * 3600 * 1000 )
     }
     console.log(user)
     return res
     .cookie("accessToken", generatedToken, options)
     .status(200)
     .json({

         message: `User created Successfully, welcome ${user.username}`,
         loggedIn:true
     })
   } catch (error) {
        return res.json({
            status: 500,
            message: error.message
        })
   }
 }

 const loginUser = async(req,res) => {
    // if(req.user){
    //     return res.json({
    //         status:200,
    //         message:"User already logged in ",
    //         loggedIn: true,
    //         user: req.user
    //     })
    // }
    try {
        const {email,password} = req.body
        
        if(email.trim() === "" || password.trim() === ""){
            return res.json({
                status: 400,
                message: "All fields are required",
                loggedIn: false
            })
        }
    
        const foundUser = await User.findOne({email}).select(
            " -username -incomes -expenses "
        )
        
        if(!foundUser) {
            return res.json({
                status: 404,
                message: "User not found",
                loggedIn: false
            })
        }
    
        const accessToken = generateToken(foundUser._id, foundUser.email)
        const options = {
            httpOnly : true,
            secure: true,
            expires: new Date(Date.now() + 2 * 3600 *1000) ,
        }
    
        const isSame = await comparePassword(foundUser.password, password)
    
        if(!isSame){
            return res
            .json({
                status: 400,
                message: "Invalid password",
                loggedIn: false
            })
            
        }

        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .json({
            message : `User logged in successfully, welcome ${foundUser.email}`,
            loggedIn: true
        })

    } catch (error) {
        return res.json({
            status: 500,
            message: error.message
        })
    }
}

 const logoutUser = async(req,res) => {

  try {

    const isTokenAvailable = req.user
    console.log(isTokenAvailable)

    if(isTokenAvailable === null){
        return res.json({
            message: "User not available, cannot Logout",
            logout: false
        })
    }


      return res.
      clearCookie("accessToken")
      .status(200)
      .json({
          logout: true,
          message: "User logged out successfully"
      })
      
  } catch (error) {
    
    res.json({
        status:500,
        message: error
    })
  }
 }

 const  isActive = async (req,res) => {
    try {
        const token = req.cookies?.accessToken
        if(!token){
            return res
            .status(401)
            .json({
                message: "Unauthorized access , Please Login",
                logout: true
            })
        }
    
        const decodedToken = jwt.verify(token,"generateToken")
        const userId = decodedToken.id
    
        const user = await User.findById(userId).select(
            "username createdAt email "
        )
    
        return res.status(200).json({
            message: "User is active",
            logout: false,
            user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            logout:true,
            error: error.message
        })
    }
 }

export {
    registerUser,
    loginUser,
    logoutUser,
    isActive
}