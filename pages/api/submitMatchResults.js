import { prisma } from "/lib/prisma";

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

const calculateRanking = (teamInfoMap) => {
  var finalArr = [];
  teamInfoMap.forEach((object) => {
    finalArr.push(object);
  });

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
  return finalArr;
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

      // validate match results
      var validatedMatchResults = [];
      matchResults.forEach((rowValue) => {
        var rowValues = rowValue.split(" ");
        if (rowValues.length != 4) {
          return res.status(400).json({
            message:
              "There is an error with the match results. Please check and try again.",
          });
        }
        rowValues[2] = parseInt(rowValues[2]);
        rowValues[3] = parseInt(rowValues[3]);
        validatedMatchResults.push(rowValues);
      });

      // convert to map object for easier manipulation
      const teamInfo = await prisma.soccerDB.findMany({});
      const teamInfoMap = new Map();
      teamInfo.forEach((object) => {
        teamInfoMap.set(object.teamName, object);
      });

      // calculate goals scored and matches won/drawn/lost per match for each team
      const updatedTeamInfo = validatedMatchResults.map((rowValue) => {
        var teamOne = teamInfoMap.get(rowValue[0]);
        var teamTwo = teamInfoMap.get(rowValue[1]);
        teamOne.goalsScored += rowValue[2];
        teamTwo.goalsScored += rowValue[3];

        if (rowValue[2] > rowValue[3]) {
          teamOne.matchesWon += 1;
          teamTwo.matchesLost += 1;
        } else if (rowValue[2] < rowValue[3]) {
          teamOne.matchesLost += 1;
          teamTwo.matchesWon += 1;
        } else {
          teamOne.matchesDrawn += 1;
          teamTwo.matchesDrawn += 1;
        }
      });

      var finalArr = calculateRanking(teamInfoMap);

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
        return res.status(500).json({
          message:
            "There is an error with the match results. Please check and try again.",
        });
      }
    } catch (e) {
      console.error(e);
      return res.status(400).json({
        message:
          "There is an error with the match results. Please check and try again.",
      });
    }
  }
}
