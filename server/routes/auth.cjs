const { PrismaClient } = require("@prisma/client");
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = Router();

const signin = router;
module.exports = { signin };

router.post("/auth/login", async (req, res) => {
    try {
        var { username, password } = req.body;

        if (username != "ozan6825" || password != "ozan6825") {
            res.sendStatus(401);
            return;
        }
        var token = jwt.sign({ username, password: bcrypt.hashSync(password, 10) }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.json({ status: true, token: token });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
