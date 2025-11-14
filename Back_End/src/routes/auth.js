// routes/auth.routes.js (exemple)
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

// Route d'inscription
router.post("/signUp", authController.registerPsychologist);

// Route de connexion
router.post("/login", authController.loginPsychologist);

module.exports = router;
