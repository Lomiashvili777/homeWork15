const mongoose = require('mongoose')

// კაროჩე ეს minlength და enum  მაგრა მაღიზიანებდა :დ
const expenseSchema = new mongoose.Schema({

    description: {
        type: String,
        required: [true, 'აღწერა აუცილებელია'],
        trim: true,
        minlength: [3, 'აღწერა უნდა იყოს მინიმუმ 3 სიმბოლო']
    },

    amount: {
        type: Number,
        required: [true, 'თანხა აუცილებელია'],
        min: [0.01, 'თანხა უნდა იყოს მინიმუმ 0.01']
    },

    category: {
        type: String,
        default: 'სხვა',
        enum: ['საკვები', 'ტრანსპორტი', 'ბინა', 'გართობა', 'სხვა']
    },

    date: {
        type: Date,
        default: Date.now
    },

    done: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense