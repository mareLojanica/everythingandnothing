const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ');
        const user =jwt.verify(token[1], keys.secretOrKey)
        if (token[0] === 'Bearer' && user) {
            next()
        }
    } catch (e) {
        console.log(e)
        if (e.name === 'JsonWebTokenError') {
            res.status(401).json(e.message);
        } else if(e.name === 'TypeError' && e.message === `Cannot read property 'split' of undefined`) {
            res.status(400).json(`Please Provide an Authorization Header that contains a token. Example: 'Bearer example_token'`);
        } else {
            res.status(400).json('Something Broke!');
        }
    }
}

module.exports = auth;