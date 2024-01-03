const { PrismaClient } = require("@prisma/client");
const { Router } = require("express");
const _ = require("lodash");

const prisma = new PrismaClient();
const router = Router();

module.exports = router;

router.get("/raw/:name", async (req, res) => {
    try {
        var { name } = req.params;
        var sc = await prisma.script.findUnique({ where: { name: name } });
        res.type("txt");
        res.send(sc.value);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
