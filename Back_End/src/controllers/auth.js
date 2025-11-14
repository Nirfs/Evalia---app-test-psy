const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

exports.registerPsychologist = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Veuillez fournir le nom, l'email et le mot de passe." });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=?;:,<>{}[\]~]).{7,}$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Email invalide." });
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error:
        "Le mot de passe doit faire au moins 7 caractères, contenir une majuscule et un caractère spécial.",
    });
  }

  try {
    const existing = await prisma.psychologist.findUnique({
      where: { email },
    });

    if (existing) {
      return res
        .status(409)
        .json({ error: "Cet email est déjà associé à un compte." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newPsy = await prisma.psychologist.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      psychologist: {
        id: newPsy.id,
        email: newPsy.email,
        name: newPsy.name,
      },
    });
  } catch (e) {
    if (e.code === "P2002") {
      console.warn("Tentative d'inscription avec un email existant:", email);
      return res.status(409).json({
        error: "Cet email est déjà associé à un compte.",
      });
    }

    console.error("Erreur lors de l'inscription du psychologue:", e);
    return res.status(500).json({
      error: "Une erreur interne est survenue lors de la création du compte.",
    });
  }
};

exports.loginPsychologist = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.psychologist.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(401).json({ error: "Identifiants invalides." });
    }
    const passWordMatch = await bcrypt.compare(password, user.password);

    if (!passWordMatch) {
      return res.status(401).json({ error: "Identifiants invalides." });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        userEmail: user.email,
        role: "psychologist",
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Connexion réussie.",
      token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (e) {
    console.error("Erreur lors de la connexion:", error);
    return res.status(500).json({ error: "Erreur interne du serveur." });
  }
};
