const fs = require("fs")
const file = "expenses.json"

function readData() {
    if (!fs.existsSync(file)) fs.writeFileSync(file, "[]")
    return JSON.parse(fs.readFileSync(file, "utf8"))
}

function writeData(data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2))
}

exports.getAll = (page, take) => {
    const data = readData()
    if (take > 50) take = 50
    const start = (page - 1) * take
    const end = start + take

    return {
        page,
        take,
        total: data.length,
        data: data.slice(start, end)
    }
}

exports.getOne = (id) => {
    const data = readData()
    return data.find((e) => e.id == id)
}

exports.create = (expense) => {
    const data = readData()
    const lastId = data.length ? data[data.length - 1].id : 0
    const newExpense = {
        id: lastId + 1,
        description: expense.description,
        amount: expense.amount,
        done: false
    }
    data.push(newExpense)
    writeData(data)
    return newExpense
}

exports.update = (id, updateData) => {
    const data = readData()
    const index = data.findIndex((e) => e.id == id)
    if (index === -1) return null
    data[index] = { ...data[index], ...updateData }
    writeData(data)
    return data[index]
}

exports.remove = (id) => {
    const data = readData()
    const index = data.findIndex((e) => e.id == id)
    if (index === -1) return false
    const newData = data.filter((e) => e.id != id)
    writeData(newData)
    return true
}
//აქ ლოჰიკა ყველაფრის