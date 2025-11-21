// routes/users.routes.js (exemple)
const express = require("express");
const router = express.Router();
const authUsers = require("../controllers/users");

// Route d'inscription
router.get("/psychologist/:id", authUsers.getOnePsy);

// Route de connexion
router.get("/psychologist", authUsers.getAllPsy);

module.exports = router;
