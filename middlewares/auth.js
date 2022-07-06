const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    if(req.headers.token){
        const token = req.headers.token.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC_KEY, ( err, user ) => {
            if(err) return res.status(403).json({ message: "token is not valid" })
            req.user = user;
            if(req.user.id === req.params.id || req.user.isAdmin) {
                next()
            } else {
                res.status(403).json({ message: "not allowed to do that" })
            }
        })
    }else{
        return res.status(401).json({ message: "not signed in" })
    }
}

const isAdminAuth = (req, res, next) => {
    if(req.headers.token){
        const token = req.headers.token.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC_KEY, ( err, user ) => {
            if(err) return res.status(403).json({ message: "token is not valid" })
            req.user = user;
            if(req.user.isAdmin) {
                next()
            } else {
                res.status(403).json({ message: "not admin" })
            }
        })
    }else{
        return res.status(401).json({ message: "not signed in" })
    } 
}


module.exports = { auth, isAdminAuth }