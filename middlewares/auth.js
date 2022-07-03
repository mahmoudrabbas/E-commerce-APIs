const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    let data;
    const token = req.headers.token;
    if(token){
        jwt.verify(token, process.env.JWT_SEC_KEY, ( err, user ) => {
            if(err) res.status(403).json({ message: "Token is not valid" })
            req.user = user;
            next
        })
    }else{
        return res.status(401).json({ message: "Unauthenticated" })
    }
}

module.exports = { auth }