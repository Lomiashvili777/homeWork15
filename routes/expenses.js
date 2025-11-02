const express = require("express")
const router = express.Router()
const expensesController = require("../controllers/expensesController")
const validateExpense = require("../middleware/validateExpense")

router.get("/", expensesController.getAll)
router.get("/:id", expensesController.getOne)
router.post("/", validateExpense, expensesController.create)
router.put("/:id", validateExpense, expensesController.update)
router.delete("/:id", expensesController.delete)

module.exports = router

//გადამისამართება expensesController.js ზე