import React, { useEffect, useState, useCallback } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Center,
  Heading,
  Box,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import DeleteButton from "./DeleteButton";

export default function RankingTable() {
  const toast = useToast();
  const [teamInfoArr, setTeamInfoArr] = useState([]);

  const fetchData = useCallback(async () => {
    const result = await axios.get("/api/getCurrentRankings");
    var group1 = result.data.group1;
    setTeamInfoArr(group1);
  }, []);

  // the useEffect is only there to call `fetchData` at the right time
  useEffect(() => {
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [fetchData]);

  return (
    <Box bg="white" borderWidth="1px" borderRadius="lg" m="5%" py="10">
      <Center>
        <Heading p="2%">Soccer Championship Scoreboard 2022</Heading>
      </Center>
      <TableContainer mt={"5%"}>
        <Table colorScheme="teal" size="md" maxWidth="90%" mx="auto">
          <Thead>
            <Tr>
              <Th>Ranking</Th>
              <Th>Team Name</Th>
              <Th>Reg. Date (MM/dd)</Th>
              <Th>Goals Scored</Th>
              <Th>Matches Won</Th>
              <Th>Matches Drawn</Th>
              <Th>Matches Lost</Th>
            </Tr>
          </Thead>
          <Tbody>
            {teamInfoArr.map((teamInfo) => (
              <Tr key={teamInfo.id}>
                <Td>{teamInfo.currentRanking}</Td>
                <Td>{teamInfo.teamName}</Td>
                <Td>{teamInfo.registrationDate.substring(5, 10)}</Td>
                <Td>{teamInfo.goalsScored}</Td>
                <Td>{teamInfo.matchesWon}</Td>
                <Td>{teamInfo.matchesDrawn}</Td>
                <Td>{teamInfo.matchesLost}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <DeleteButton></DeleteButton>
    </Box>
  );
}
