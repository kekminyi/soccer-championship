import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const calculatePoints = (teamResults) => {
  var points = 0;
  points += teamResults.matchesWon * 3;
  points += teamResults.matchesDrawn;
  return points;
};

const recalculateAltPoints = (teamResults) => {
  var points = 0;
  points += teamResults.matchesWon * 5;
  points += teamResults.matchesDrawn * 3;
  points += teamResults.matchesLost;
  return points;
};

const sortGroup = (arr) => {
  arr.sort(function (a, b) {
    // sort by points
    var pointsA = calculatePoints(a);
    var pointsB = calculatePoints(b);
    if (pointsA > pointsB) return -1;
    if (pointsA < pointsB) return 1;

    // sort by highest number of goals scored
    if (a.goalsScored > b.goalsScored) return -1;
    if (a.goalsScored < b.goalsScored) return 1;

    // sort by alt points calculation
    pointsA = recalculateAltPoints(a);
    pointsB = recalculateAltPoints(b);
    if (pointsA > pointsB) return -1;
    if (pointsA < pointsB) return 1;

    // sort by registration date
    if (a.registrationDate.getTime() < b.registrationDate.getTime()) return -1;
    if (a.registrationDate.getTime() > b.registrationDate.getTime()) return 1;
  });
  return arr;
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      let matchResults = req.body.matchResults;
      matchResults = matchResults.trim().split("\n");
      const teamInfo = await prisma.soccerDB.findMany({});
      const teamInfoMap = new Map();

      teamInfo.forEach((object) => {
        teamInfoMap.set(object.teamName, object);
      });
      const updatedTeamInfo = matchResults.map((i) => {
        const values = i.split(" ");
        values[2] = parseInt(values[2]);
        values[3] = parseInt(values[3]);
        if (values[2] > values[3]) {
          var winnerTeam = teamInfoMap.get(values[0]);
          winnerTeam.matchesWon += 1;
          winnerTeam.goalsScored += values[2];
          var loserTeam = teamInfoMap.get(values[1]);
          loserTeam.matchesLost += 1;
          loserTeam.goalsScored += values[3];
        } else if (values[2] < values[3]) {
          var loserTeam = teamInfoMap.get(values[0]);
          loserTeam.matchesLost += 1;
          loserTeam.goalsScored += values[2];
          var winnerTeam = teamInfoMap.get(values[1]);
          winnerTeam.matchesWon += 1;
          winnerTeam.goalsScored += values[3];
        } else if (values[2] == values[3]) {
          var team1 = teamInfoMap.get(values[0]);
          var team2 = teamInfoMap.get(values[1]);
          team1.matchesDrawn += 1;
          team1.goalsScored += values[2];
          team2.matchesDrawn += 1;
          team2.goalsScored += values[3];
        }
      });
      var finalArr = [];
      teamInfoMap.forEach((object) => {
        finalArr.push(object);
      });

      console.log(finalArr);

      var group1 = finalArr.filter(function (object) {
        return object.groupNumber === "1";
      });

      var group2 = finalArr.filter(function (object) {
        return object.groupNumber === "2";
      });

      group1 = sortGroup(group1);
      group2 = sortGroup(group2);

      group1.map((object) => {
        object.currentRanking = group1.indexOf(object) + 1;
      });

      group2.map((object) => {
        object.currentRanking = group2.indexOf(object) + 1;
      });

      finalArr = group1.concat(group2);

      try {
        const collection = await prisma.$transaction(
          finalArr.map((object) =>
            prisma.soccerDB.update({
              where: { teamName: object.teamName },
              data: object,
            }),
          ),
        );
        return res.status(200).json({
          message: "Match results uploaded successfully.",
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
