function logger(req, res, next) {
    console.log(`Request: ${req.originalUrl} / Method: ${req.method}`)
    next()
}

module.exports = logger
