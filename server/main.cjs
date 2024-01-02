const express = require("express");
const app = express();

const script = require("./routes/script.cjs");
const { signin } = require("./routes/auth.cjs");

const verifyToken = require("./middlewares/verifyToken.cjs");

app.use(express.json({ limit: "50mb" }));

app.use("/api/auth", signin);
app.use("/api", verifyToken, script);

app.listen(3001, function () {
    console.log(":3001");
});
