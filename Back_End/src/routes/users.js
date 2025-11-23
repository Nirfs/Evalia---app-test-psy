// routes/users.routes.js (exemple)
const express = require("express");
const router = express.Router();
const authUsers = require("../controllers/users");
const { authMiddleware, requireOwner } = require("../middleware/auth");

// Route d'inscription
router.get(
  "/psychologist/:id",
  authMiddleware,
  requireOwner,
  authUsers.getOnePsy
);

// Route de connexion
router.get("/psychologist", authUsers.getAllPsy);
router.get("/me", authMiddleware, authUsers.getMe);
router.get("/patients", authMiddleware, authUsers.getPatients);

module.exports = router;
