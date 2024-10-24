const DailyLimit = require("../models/DailyLimit")
const IncomeSchema= require("../models/IncomeModel")
const GoalSchema = require("../models/Goal")


exports.addIncome = async (req, res) => {
    const {title, amount, category, description, date}  = req.body

    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Income Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(income)
}

exports.getIncomes = async (req, res) =>{
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteIncome = async (req, res) =>{
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}

exports.updateDailyLimit = async(req, res) => {
    DailyLimit.updateMany({ $set: {amount: req?.body?.amount}}).then((limit) =>{
        res.status(200).json(limit)
    })
    .catch((err) =>{
        res.status(500).json({message: 'Server Error'})
    });
}

exports.getDailyLimit = async(req, res) => {
    DailyLimit.findOne().then((limit) =>{
        res.status(200).json(limit)
    })
    .catch((err) =>{
        res.status(500).json({message: 'Server Error'})
    });
}

exports.createGoal = async (req, res) => {
    const {title, amount, description, date}  = req.body

    const goal = GoalSchema({
        title,
        amount,
        description,
        date
    })

    try {
        //validations
        if(!title || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await goal.save()
        res.status(200).json({message: 'Goal Added'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Server Error'})
    }
}
