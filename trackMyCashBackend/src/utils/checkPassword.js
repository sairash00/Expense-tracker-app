import bcrypt from "bcrypt"

const comparePassword = async (encryptedPassword, userPassword)=>{
    const comparedPassword =  await bcrypt.compare(userPassword, encryptedPassword);
    return comparedPassword
}

export default comparePassword;