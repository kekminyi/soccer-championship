import { prisma } from "/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      let text = req.body.teamInfo;
      text = text.trim().split("\n");
      const headers = ["teamName", "registrationDate", "groupNumber"];
      const parsedTeamInfo = text.map((i) => {
        const values = i.split(" ");
        if (values.length != 3) {
          return res.status(400).json({
            message:
              "There is an error with the team information. Please check and try again.",
          });
        }
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
        return res.status(400).json({
          message:
            "There is an error with the team information. Please check and try again.",
        });
      }
    } catch (e) {
      console.error(e);
      return res.status(400).json({
        message:
          "There is an error with the team information. Please check and try again.",
      });
    }
  }
}
