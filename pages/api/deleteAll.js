import { prisma } from "/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await prisma.soccerDB.deleteMany({});
      return res
        .status(200)
        .json({ message: "All records deleted successfully." });
    } catch (e) {
      return res.status(500).json({
        message: "Unexpected error. Please try again.",
      });
    }
  }
  return res.status(400).json({
    message: "Invalid request. Please try again with a POST request.",
  });
}
