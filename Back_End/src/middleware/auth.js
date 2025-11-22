const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

exports.authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).send("Unauthorized");
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });
    if (!user) return res.status(401).send("Unauthorized");
    req.user = { id: user.id, role: user.role };
    next();
  } catch (e) {
    return res.status(401).send("Unauthorized");
  }
};

exports.requireRole = (role) => (req, res, next) => {
  if (!req.user) return res.status(401).send("Unauthorized");
  if (req.user.role !== role) return res.status(403).send("Forbidden");
  next();
};

exports.requireOwner = (req, res, next) => {
  const userId = req.user.id; // récupéré depuis le token
  const paramId = Number(req.params.id);

  if (userId !== paramId) {
    return res.status(403).json({ error: "Accès interdit" });
  }

  next();
};
