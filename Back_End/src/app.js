const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

const authRoutes = require("../src/routes/auth");

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/auth/", authRoutes);

module.exports = app;
