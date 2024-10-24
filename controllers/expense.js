const ExpenseSchema = require("../models/ExpenseModel")


exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date}  = req.body

    const income = ExpenseSchema({
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
        res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(income)
}

exports.getExpense = async (req, res) =>{
    try {
        const incomes = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.getTodayExpense = async (req, res) => {
    try {
        // Get the start and end of today's date
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Start of the day
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1); // Start of the next day

        // Find all expenses created today and sum the amount
        const totalExpense = await ExpenseSchema.aggregate([
            {
                $match: {
                    createdAt: { $gte: today, $lt: tomorrow }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount" }
                }
            }
        ]);

        // If no expenses are found, return total 0
        const total = totalExpense.length > 0 ? totalExpense[0].totalAmount : 0;

        res.status(200).json({ totalExpense: total });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.getMonthlyExpense = async (req, res) => {
    try {
        const now = new Date();
        const lastFiveMonths = Array.from({ length: 5 }, (_, i) => {
            const date = new Date(now);
            date.setMonth(now.getMonth() - i);
            return date.toISOString().slice(0, 7); // Format YYYY-MM
        });

        const expenses = await ExpenseSchema.find({
            date: {
                $gte: new Date(lastFiveMonths[4]), // 5 months ago
                $lte: now
            }
        });

        const expenseData = {};

        // Aggregate expenses by month and category
        expenses.forEach(expense => {
            const month = expense.date.toISOString().slice(0, 7);
            if (!expenseData[month]) {
                expenseData[month] = {};
            }
            if (!expenseData[month][expense.category]) {
                expenseData[month][expense.category] = 0;
            }
            expenseData[month][expense.category] += expense.amount;
        });

        // Format the data for the frontend
        const result = lastFiveMonths.map(month => ({
            month,
            categories: expenseData[month] || {}
        }));

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteExpense = async (req, res) =>{
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}