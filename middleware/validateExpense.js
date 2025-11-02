module.exports = function validateExpense(req, res, next) {
    const { description, amount } = req.body
    const errors = []

    if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({ errors: ['request body is required and must be JSON'] })
    }

    if (typeof description !== 'string' || !description.trim()) {
        errors.push('description is required and must be a string')
    }


    let num = amount
    if (typeof amount === 'string' && amount.trim() !== '') {
        num = Number(amount)
    }
    if (typeof num !== 'number' || Number.isNaN(num)) {
        errors.push('amount is required and must be a number')
    } else {

        req.body.amount = num
    }

    if (errors.length) return res.status(400).json({ errors })


    next()
}
// middleware ზე ალბათ ეს უნდა გვექნა რაღაცა საიტზე ვნახე მსგავსი კოდი მარა უკვე app.js ში მეწერა middleweare და ამოვწერე აქაც


//არ ვიცი ვერ გავასწორე post ზე მარტო amount რო გაუშვა
// {
//   "amount": 10,
// }
//მაინც წერს expenses.json ში უნდა წერდეს ერორს მეცხრე მეათე ხაზზე როა მარა ვერ ავამუშავე