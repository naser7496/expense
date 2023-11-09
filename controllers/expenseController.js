const Expense = require('../models/Expense');
const User = require('../models/User');
const schedule = require('node-schedule');
const Profile = require('../models/Profile');

let dailyReportJob = null // Declare dailyReportJob outside of any function





exports.listExpenses = async (req, res) => {
    try {
        const selectedMonth= ''
        const expenses = await Expense.find();
        res.render('index', { expenses,selectedMonth, isAuthenticated: res.locals.isAuthenticated, isProfilePage: false });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.addExpenseForm = async (req, res) => {
    res.render('add', { isAuthenticated: res.locals.isAuthenticated, isProfilePage: false });
};

exports.addExpense = async (req, res) => {
    try {
        const { description, amount, category } = req.body;

        const userId = req.body._Id;

        await Expense.create({ description, amount, category, user: userId });
        res.redirect('/expenses')
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.editExpenseForm = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);

        res.render('edit', { expense, isAuthenticated: res.locals.isAuthenticated, isProfilePage: false });
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
};

exports.editExpense = async (req, res) => {
    try {
        const { description, amount, category } = req.body;
        await Expense.findByIdAndUpdate(req.params.id, { description, amount, category });
        res.redirect('/expenses');
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
};

exports.deleteExpenseForm = async (req, res) => {
    try {

        const expense = await Expense.findById(req.params.id);
        res.render('delete', { expense, isAuthenticated: res.locals.isAuthenticated, isProfilePage: false });

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
}


exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndRemove(req.params.id);
        res.redirect('/expenses');
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
};


exports.generateReportForm = (req, res) => {
    const expenses = ""
    const startDate = ""
    const endDate = ""

    res.render('report', { expenses, startDate, endDate, isAuthenticated: res.locals.isAuthenticated, isProfilePage: false });
}

exports.generateReport = async (req, res) => {
    try {
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;


        const expenses = await Expense.find({
            date: { $gte: startDate, $lte: endDate }
        });

        //calculate total expense
        let totalExpense = 0;
        expenses.forEach((expense) => {
           
            totalExpense += parseFloat(expense.amount);
        });

        res.render('report', { expenses, totalExpense, startDate, endDate, isAuthenticated: res.locals.isAuthenticated, isProfilePage: false });
    } catch (err) {
        console.error(err)
        res.status(500).send("Internal server error")
    }
}




