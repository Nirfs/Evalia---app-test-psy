const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getOnePsy = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id) || id < 0)
      return res.status(400).json({ error: "ID invalide" });

    const psy = await prisma.psychologist.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, name: true, email: true, createdAt: true },
        },
        patients: { select: { id: true } },
      },
    });

    if (!psy) return res.status(404).json({ error: "Psychologue introuvable" });

    const response = {
      id: psy.user.id,
      name: psy.user.name,
      email: psy.user.email,
      createdAt: psy.user.createdAt,
      patients: psy.patients,
    };

    res.status(200).json(response);
  } catch (e) {
    console.error("Erreur getOnePsy:", e);
    res.status(500).json({ error: "Impossible de récupérer le psychologue" });
  }
};

exports.getAllPsy = async (req, res) => {
  try {
    const allPsy = await prisma.psychologist.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true, createdAt: true },
        },
      },
    });

    const response = allPsy.map((psy) => ({
      id: psy.user.id,
      name: psy.user.name,
      email: psy.user.email,
      createdAt: psy.user.createdAt,
    }));

    res.status(200).json(response);
  } catch (e) {
    console.error("Erreur getAllPsy:", e);
    res.status(500).json({ error: "Impossible de récupérer les psychologues" });
  }
};

exports.getMe = async (req, res) => {
  try {
    const userId = req.user.id; // depuis le token
    const psy = await prisma.psychologist.findUnique({
      where: { userId },
      select: {
        id: true,
        user: {
          select: { id: true, name: true, email: true, createdAt: true },
        },
        patients: true,
      },
    });
    if (!psy) return res.status(404).json({ error: "Psychologue introuvable" });
    res.json(psy);
  } catch (e) {
    console.error("Erreur getMe:", e);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
