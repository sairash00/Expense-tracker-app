import jwt from 'jsonwebtoken'

const generateToken =  (id,email) => {
    return jwt.sign({
        email,
        id
    },
    "generateToken",
    // {
    // // expiresIn: "2h"
    // }
)
}

export default generateToken