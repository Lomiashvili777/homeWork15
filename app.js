#!/usr/bin/env node
const express = require("express")
const app = express()
const expensesRoutes = require("./routes/expenses")
const randomFactRoutes = require("./routes/randomFact")

app.use(express.json())


app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`)
    next()
})


app.use("/expenses", expensesRoutes)
app.use("/random-fact", randomFactRoutes)

app.listen(3000, () => console.log("Server running on http://localhost:3000"))

