const { PrismaClient } = require("@prisma/client");
const { Router } = require("express");
const _ = require("lodash");

const prisma = new PrismaClient();
const router = Router();

module.exports = router;

router.get("/scripts", async (req, res) => {
    try {
        var select = req.query;
        var sc = await prisma.script.findMany({ select: !_.isEmpty(select) && _.mapValues(select, (r) => Boolean(r)) });
        res.json(sc);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

router.get("/scripts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        var sc = await prisma.script.findUnique({ where: { id: id } });
        res.json(sc);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

router.post("/scripts", async (req, res) => {
    try {
        var data = req.body;
        var sc = await prisma.script.create({ data: data });
        res.json({ status: true });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

router.put("/scripts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const sc = await prisma.script.update({
            where: { id: id },
            data: data,
        });
        res.json({ status: true });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

router.delete("/scripts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.script.delete({
            where: { id: id },
        });
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
