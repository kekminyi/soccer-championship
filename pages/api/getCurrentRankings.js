import { prisma } from "/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const teamInfo = await prisma.soccerDB.findMany({});
    var group1 = teamInfo.filter(function (object) {
      return object.groupNumber === "1";
    });

    var group2 = teamInfo.filter(function (object) {
      return object.groupNumber === "2";
    });
    return res.status(200).json({
      group1: group1,
      group2: group2,
    });
  }
}
