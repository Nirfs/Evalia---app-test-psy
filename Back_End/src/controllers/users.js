const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getOnePsy = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id) || id < 0)
      return res.status(400).json({ error: "ID invalide" });

    const psy = await prisma.psychologist.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!psy) return res.status(404).json({ error: "Psychologue introuvable" });

    res.status(200).json(psy);
  } catch (e) {
    console.error("Erreur getOnePsy:", e);
    res
      .status(500)
      .json({ error: "Impossible de récupérer la liste des psychologues" });
  }
};

exports.getAllPsy = async (req, res) => {
  try {
    const allPsy = await prisma.psychologist.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    res.status(200).json(allPsy);
  } catch (e) {
    console.error("Erreur getAllPsy:", e);
    res.status(500).json({ error: "Impossible de récupérer le psychologue" });
  }
};
