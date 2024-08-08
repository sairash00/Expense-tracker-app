import {Income} from "../model/income.model.js"
import {Expense} from "../model/expense.model.js"
import {User} from "../model/user.model.js"

const addIncome = async (req,res) => {
    if(!req.user){
        return res.json({
            message:"Couldn't perform the task, Unauthorized request."
        })
    }
    const{amount,from,source} = req.body
    if( isNaN(amount)  || from.trim() === "" || source.trim() ===""){
        return res.status(400).json({
            message:"All fields are required"
        })
    }

    const addedIncome = await Income.create({
        amount,
        from,
        source
    })

    const userId = req.user.id

    const updatedUser = await User.findByIdAndUpdate(userId,{
        $push:{
            incomes:addedIncome._id
        }
    })
    
    return res.status(200).json({
        message:`Income added successfully`,
        addedIncome,
        updatedUser
    })

} 

const addExpense = async (req,res) => {
    if(!req.user){
        return res.status(401).json({
            message:"Couldn't perform the task, Unauthorized request."
        })
    }
    const{amount,to,purpose} = req.body
    if( isNaN(amount)  || to.trim() === "" || purpose.trim() ===""){
        return res.status(400).json({
            message:"All fields are required"
        })
    }

    const addedExpenses = await Expense.create({
        amount,
        to,
        purpose
    })

    const userId = req.user.id

    const updatedUser = await User.findByIdAndUpdate(userId,{
        $push:{
            expenses:addedExpenses._id
        }
    })
    
    return res.status(200).json({
        message:`Expense added successfully`,
        addedExpenses,
        updatedUser
    })

}

const getExpenses = async(req,res) => {
   try {
     if(!req.user){
         return res.status(401).json({
             message: "Couldn't proceed, Unauthorized request"
         })
     }
 
     const userId = req.user.id
 
     const user = await User.findById(userId).select(
         "expenses"
     ).populate("expenses")
 
     const Expenses = user.expenses
 
     return res.status(200).json({
         message: "Successfully fetched Expenses",
         Expenses
     })
   } catch (error) {
        return res.status(500).json({
            message:"Error fetching Expenses"
        })
   }

}
const getIncomes = async(req,res) => {
  try {
      if(!req.user){
          return res.status(401).json({
              message: "Couldn't proceed, Unauthorized request"
          })
      }
      const userId = req.user.id
  
      const  user = await User.findById(userId).select(
          "incomes"
      ).populate("incomes")
  
      const incomes = user.incomes
  
      return res.status(200).json({
          message: "Successfully fetched Incomes",
          incomes
      })
  } catch (error) {
    return res.status(500).json({
        message:"Error fetching incomes"
    })
  }

}

const deleteIncome = async(req,res) => {
    try {
        if(!req.user){
            return res.status(401).json({
                message: "Couldn't proceed, Unauthorized request"
            })
        }
        const id = req.body.id
        const  deletedIncome = await Income.findByIdAndDelete(id);

        if(!deletedIncome){
            return res.status(500).json({
                message:"Failed",
                success: false
            })
        }

        res.status(200).json({
            success: true,
            message: "Deleted Successfully",
            deletedIncome
        })
    } catch (error) {
      return res.status(500).json({
          success: false,
          message:"Error deleting Income",
          error: error.message
      })
    }
}
const deleteExpense = async(req,res) => {
    try {
        if(!req.user){
            return res.status(401).json({
                message: "Couldn't proceed, Unauthorized request"
            })
        }
        const id = req.body.id
        const  deletedExpense = await Expense.findByIdAndDelete(id);

        if(!deletedExpense){
            return res.status(500).json({
                message:"Failed",
                success: false
            })
        }

        res.status(200).json({
            success: true,
            message: "Deleted Successfully",
            deletedExpense
        })
    } catch (error) {
      return res.status(500).json({
          success: false,
          message:"Error deleting Expense",
          error: error.message
      })
    }
}

export {
    addIncome,
    addExpense,
    getIncomes,
    getExpenses,
    deleteIncome,
    deleteExpense
}