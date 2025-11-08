const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Expense = require('../models/expense')


const validateId = (req, res, next) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {

        return res.status(400).json({ message: "Invali Expense ID format" })
    }
    next()
}


router.get('/top-5', async (req, res) => {
    try {

        const topExpenses = await Expense.find()
            .sort({ amount: -1 })
            .limit(5)

        res.json(topExpenses)
    } catch (err) {

        res.status(500).json({ message: err.message })
    }
})


router.post('/', async (req, res) => {
    try {
        const expense = new Expense(req.body)
        const savedExpense = await expense.save()

        res.status(201).json(savedExpense)
    } catch (err) {

        res.status(400).json({ message: err.message })
    }
})


router.get('/', async (req, res) => {
    try {
        const filter = req.query
        let query = {}
        let amountFilter = {}


        if (filter.category) {

            const categories = filter.category.split(',').map(cat => cat.trim())
            query.category = { $in: categories }
        }


        if (filter.amountFrom) {
            const amount = parseFloat(filter.amountFrom)
            if (!isNaN(amount)) {
                amountFilter.$gte = amount
            }
        }


        if (filter.amountTo) {
            const amount = parseFloat(filter.amountTo)
            if (!isNaN(amount)) {
                amountFilter.$lte = amount
            }
        }


        if (Object.keys(amountFilter).length > 0) {
            query.amount = amountFilter
        }


        if (filter.done !== undefined) {
            query.done = filter.done === 'true'
        }


        if (filter.description) {
            query.description = { $regex: filter.description, $options: 'i' }
        }


        const expenses = await Expense.find(query)
        res.json(expenses)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


router.get('/:id', validateId, async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id)


        if (expense == null) {
            return res.status(404).json({ message: 'Expense not found' })
        }

        res.json(expense)
    } catch (err) {

        res.status(500).json({ message: err.message })
    }
})


router.patch('/:id', validateId, async (req, res) => {
    try {

        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )

        if (updatedExpense == null) {
            return res.status(404).json({ message: 'Expnse not found for update' })
        }

        res.json(updatedExpense)
    } catch (err) {

        res.status(400).json({ message: err.message })
    }
})


router.delete('/:id', validateId, async (req, res) => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id)

        if (deletedExpense == null) {
            return res.status(404).json({ message: 'Expense not found fr deletion' })
        }


        res.status(204).send()
    } catch (err) {

        res.status(500).json({ message: err.message })
    }
})

module.exports = router


