const {verify} = require("jsonwebtoken");

const validateToken = (req, res, next) =>{
    const accessToken = req.header("accessToken");
    if (!accessToken) {
        return res.json({error: "User not logged in!"});
    }
    try{
        const JWT_SECRET = process.env.JWT_SECRET;
        const validToken = verify(accessToken, JWT_SECRET);
        req.user = validToken;      
        if (validToken){
            return next();
        }
    }catch(err){
        return res.json({error: err});
    }
};

module.exports = {validateToken};