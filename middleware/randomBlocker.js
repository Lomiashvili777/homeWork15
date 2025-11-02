
module.exports = function randomBlocker(req, res, next) {
    const header = (req.headers['x-block-random'] || req.headers['block-random'])
    if (header === 'true' || header === '1') {
        return res.status(403).json({ error: 'Blocked by randomBlocker (header)' })
    }

    // 10% შანსი რო დაბლოკოს 
    // 429 სტატუსი სწორია აქ ?
    const chance = 0.10
    if (Math.random() < chance) {
        return res.status(429).json({ error: 'Temporarily blocked by randomBlocker ' })
    }

    next()
}
