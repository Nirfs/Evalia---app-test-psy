const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

const authRoutes = require("./routes/auth");
const authUsers = require("./routes/users");

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/auth/", authRoutes);
app.use("/api/users/", authUsers);

module.exports = app;
