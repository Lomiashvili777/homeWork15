#!/usr/bin/env node
const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const app = express()
const expensesRoutes = require("./routes/expenses")
const randomFactRoutes = require("./routes/randomFact")
const Expense = require('./models/expense')
app.use(express.json())


app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`)
    next()
})


app.use("/expenses", expensesRoutes)
app.use("/random-fact", randomFactRoutes)


// MONGO_URI-ისტან სწორად წაკითხვა
const PORT = 3000
const MONGO_URI = process.env.MONGO_URI


if (!MONGO_URI) {
    console.error("შეცდომა: MONGO_URI ვერ ჩაიტვირთა შეამოწმეთ ფაილის არსებობა")
    process.exit(1)
}



mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB successfullY!!!")

        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
    })
    .catch(err => {
        console.error("MongoDB connection error:", err.message)
    })


//კაი საწვალებელი იყო გპტს გიჟივით ვწურავდი მარა ავუღე ალღო მივხვდი რა რგორო რანაირად <3