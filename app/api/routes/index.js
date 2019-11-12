const express = require("express");
const app = express();
const ContentRoutes = require("./content.routes");

app.use("/v1", [
    ContentRoutes
]);

module.exports = app