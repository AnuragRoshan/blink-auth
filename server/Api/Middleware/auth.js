const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    // console.log(req.cookies);
    //grab token from cookie
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" })
    }

    try {

        const decode = jwt.verify(token, "jwtsecret")
        // console.log(decode);
        req.user = decode;
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Invalid Token" })
    }
    return next();
}

module.exports = auth;