const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode ? err.statusCode : 500
    res.status(statusCode)

    res.json({
        message: err.message ? err.message : err,
        stack: err.stack
    })
}
module.exports = { errorHandler }