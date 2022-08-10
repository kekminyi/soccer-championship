import { prisma } from "/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      let text = req.body.teamInfo;
      text = text.trim().split("\n");
      const headers = ["teamName", "registrationDate", "groupNumber"];
      // TODO: google how to convert string to object in a easier to understand way
      const parsedTeamInfo = text.map((i) => {
        const values = i.split(" ");
        const obj = headers.reduce((object, header, index) => {
          if (header === "registrationDate") {
            let date = values[index].split("/");
            values[index] = new Date("2022", date[1] - 1, date[0], 8, 0, 0, 0);
          }
          object[header] = values[index];
          return object;
        }, {});
        return obj;
      });

      try {
        const collection = await prisma.$transaction(
          parsedTeamInfo.map((row) =>
            prisma.soccerDB.createMany({
              data: row,
            }),
          ),
        );
        return res.status(200).json({
          message: "Team information uploaded successfully.",
        });
      } catch (e) {
        console.error(e);
        return res
          .status(500)
          .json({ message: "Something went wrong. Please try again." });
      }
    } catch (e) {
      console.error(e);
      return res
        .status(500)
        .json({ message: "Something went wrong. Please try again." });
    }
  }
}
