const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

module.exports = verifyToken;

async function verifyToken(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Authentication failed" });

    jwt.verify(token, secret, (err, user) => {
        if (err) return res.status(403).json({ message: "Token is not valid" });
        req.user = user;
        next();
    });
}
