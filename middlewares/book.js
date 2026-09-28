const fs = require('fs');

function logreq(filename) {
    return (req, res, next) => {
        fs.appendFile(filename, `\n${Date.now()}:${req.method}:${req.url} - > ${req.path}`, (err) => {
            if (err) {
                return res.json({ Error: 'Can not append data to the log', msg: err.message })
            }
        })
        next()
    }
}

module.exports = {
    logreq
}