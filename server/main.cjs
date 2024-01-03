const express = require("express");
const app = express();
var compression = require("compression");

const script = require("./routes/script.cjs");
const { signin } = require("./routes/auth.cjs");

const verifyToken = require("./middlewares/verifyToken.cjs");

app.use(compression());
app.use(express.json({ limit: "50mb" }));

app.use("/api", signin);
app.use("/api", require("./routes/raw.cjs"));
app.use("/api", verifyToken, script);

app.listen(3001, function () {
    console.log(":3001");
});
