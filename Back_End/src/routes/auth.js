// routes/auth.routes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { authMiddleware, requireRole } = require("../middleware/auth");

// Route d'inscription psychologue
router.post("/signUp", authController.registerPsychologist);

// Route de connexion (psy ou patient selon le controller)
router.post("/login", authController.login);

// Route création patient (psy seulement)
router.post(
  "/psy/create-patient",
  authMiddleware,
  requireRole("PSYCHOLOGIST"),
  authController.createPatient
);

module.exports = router;
