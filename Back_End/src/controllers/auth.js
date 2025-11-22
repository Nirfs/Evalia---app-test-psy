const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const JWT_SECRET = process.env.JWT_SECRET;
const INVITE_CODE = process.env.INVITE_CODE;

async function sendEmail({ to, subject, text }) {
  // pour dev/test, juste un console.log
  console.log(`Email simulé vers ${to}:\n${subject}\n${text}`);

  // pour envoi réel, tu peux décommenter et configurer nodemailer
  /*
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Evalia" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
  });
  */
}

exports.registerPsychologist = async (req, res) => {
  const { name, email, password, inviteCode } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Veuillez fournir le nom, l'email et le mot de passe." });
  }

  if (!INVITE_CODE || inviteCode !== INVITE_CODE) {
    return res.status(403).json({ error: "Inscription fermée." });
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
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return res
        .status(409)
        .json({ error: "Cet email est déjà associé à un compte." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "PSYCHOLOGIST",
        psychologist: {
          create: {},
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        psychologist: {
          select: { id: true },
        },
      },
    });

    return res.status(201).json({
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        psychologistId: newUser.psychologist?.id ?? null,
      },
    });
  } catch (e) {
    if (e.code === "P2002") {
      console.warn("Tentative d'inscription avec un email existant:", email);
      return res
        .status(409)
        .json({ error: "Cet email est déjà associé à un compte." });
    }

    console.error("Erreur lors de l'inscription du psychologue:", e);
    return res.status(500).json({
      error: "Une erreur interne est survenue lors de la création du compte.",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email et mot de passe requis." });

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Identifiants invalides." });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ error: "Identifiants invalides." });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Connexion réussie.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        psychologistId: user.psychologist?.id ?? null,
        patientId: user.patient?.id ?? null,
      },
    });
  } catch (e) {
    console.error("Erreur lors de la connexion:", e);
    return res.status(500).json({ error: "Erreur interne du serveur." });
  }
};

exports.createPatient = async (req, res) => {
  const psyUserId = req.user.id;
  const { name, email } = req.body;

  if (!name || !email)
    return res.status(400).json({ error: "name and email required" });

  // check email not used
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ error: "Email already used" });

  const tempPassword = crypto.randomBytes(6).toString("hex");
  const hashedPassword = await bcrypt.hash(tempPassword, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "PATIENT",
      patient: {
        create: {
          psychologist: { connect: { userId: psyUserId } },
        },
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      patient: { select: { id: true } },
    },
  });

  await sendEmail({
    to: email,
    subject: "Votre compte patient",
    text: `Bonjour ${name},\n\nVotre compte a été créé.\nEmail: ${email}\nMot de passe temporaire: ${tempPassword}\nVeuillez le changer après votre première connexion.`,
  });

  return res.status(201).json({
    ok: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      patientId: user.patient.id,
    },
  });
};
