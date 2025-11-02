const express = require('express')
const router = express.Router()
const randomBlocker = require('../middleware/randomBlocker')

const facts = [
    "random fact 1",
    "random fact 2",
    "random fact 3",
    "random fact 4",
    "random fact 5"
]


router.use(randomBlocker)

router.get('/', (req, res) => {
    const fact = facts[Math.floor(Math.random() * facts.length)] // რატომღაც ამის ლოგიკას ვერ ჩავწვდი
    res.json({ fact })
})

module.exports = router
