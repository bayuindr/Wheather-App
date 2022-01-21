const jwt = require('jsonwebtoken')
const {User} = require('../models')

module.exports = {
    authentication(req, res, next) {
        if(!req.headers.access_token){
            res.status(401).json({
                msg : "missing access_token"
            })
        }
        try {
            const decoded = jwt.verify(req.headers.access_token, process.env.JWT_SECRET)
            User.findByPk(decoded.id)
            .then(data =>{
                if(data){
                    req.UserId = data.id
                    req.email = data.email
                    next()
                }else{
                    res.status(400).json({
                        msg : "Please Login"
                    })
                }
            })
        } catch (error) {
            res.status(500).json({
                error : error
            })
            
        }
    }
}