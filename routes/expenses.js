const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const methodOverride = require('method-override')
router.use(methodOverride('_method'));






router.get('/', expenseController.listExpenses);
router.get('/add', expenseController.addExpenseForm);
router.post('/', expenseController.addExpense);

router.get('/:id/edit', expenseController.editExpenseForm);
router.get('/:id/delete', expenseController.deleteExpenseForm);
router.put('/:id', expenseController.editExpense);
router.delete('/:id', expenseController.deleteExpense);

router.get('/report', expenseController.generateReportForm);
router.post('/report', expenseController.generateReport);










module.exports = router;
