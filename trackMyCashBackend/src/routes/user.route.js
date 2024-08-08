import {Router} from "express"
import {
    registerUser,
    loginUser,
    logoutUser,
    isActive
} from "../controllers/user.controller.js"

import {
    addIncome,
    addExpense,
    getIncomes,
    getExpenses,
    deleteExpense,
    deleteIncome
} from "../controllers/transaction.controller.js"
 
import isLoggedIn from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)
router.route("/addIncome").post(isLoggedIn,addIncome)
router.route("/addExpense").post(isLoggedIn, addExpense)
router.route("/getIncomes").get(isLoggedIn,getIncomes)
router.route("/getExpenses").get( isLoggedIn,getExpenses)
router.route("/deleteExpense").post( isLoggedIn,deleteExpense)
router.route("/deleteIncome").post( isLoggedIn,deleteIncome)
router.route("/isActive").get(isActive)
router.route("/").get((req,res) => {
    res.send("hello")
})

export default router