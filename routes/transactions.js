const { addExpense, getExpense, deleteExpense, getMonthlyExpense, getTodayExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome, getDailyLimit, createGoal } = require('../controllers/income');

const router = require('express').Router();


router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .get('/getMonthlyExpense', getMonthlyExpense)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .get('/get-daily-limit', getDailyLimit)
    .post('/create-goal', createGoal)
    .get('/get-today-expenses', getTodayExpense)
    .delete('/delete-expense/:id', deleteExpense)

module.exports = router