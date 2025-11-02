const expensesService = require("../services/expensesService")

exports.getAll = (req, res) => {
    try {
        const { page = 1, take = 10 } = req.query
        const result = expensesService.getAll(Number(page), Number(take))
        res.json(result)
    } catch (err) {
        console.error("Error reading expenses:", err)
        res.status(500).send("Internal Server Error")
    }
}


exports.getOne = (req, res) => {
    try {
        const expense = expensesService.getOne(req.params.id)
        if (!expense) return res.status(404).send("Not Found")
        res.json(expense)
    } catch (err) {
        console.error("Error reaing expense:", err)
        res.status(500).send("Internal Server Error")
    }
}

exports.create = (req, res) => {
    try {
        const newExpense = expensesService.create(req.body)
        res.status(201).json(newExpense)
    } catch (err) {
        console.error("Error creating expense:", err)
        res.status(500).send("Internal Server Error")
    }
}

exports.update = (req, res) => {
    try {
        const updated = expensesService.update(req.params.id, req.body)
        if (!updated) return res.status(404).send("Not Found")
        res.json(updated)
    } catch (err) {
        console.error("Error updating expehse:", err)
        res.status(500).send("Iternal Server Error")
    }
}

exports.delete = (req, res) => {
    try {
        const secretHeader = req.headers['secret']
        if (secretHeader !== "random123") {
            console.log("Invalid secret header:", secretHeader)
            return res.status(403).send("Forbidden: invalid secret")
        }

        const success = expensesService.remove(req.params.id)
        if (!success) return res.status(404).send("Not found")

        res.send("DeleTed")
    } catch (err) {
        console.error("Error deleting expnse:", err)
        res.status(500).send("Internal Server Error")
    }
}

// ერორ ლოგიკა აქ არის თუარ გამომრჩა რამე