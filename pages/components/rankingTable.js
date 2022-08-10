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

export default function RankingTable({
  setTeamInfoSubmitSuccess,
  setMatchResultsSubmitSuccess,
}) {
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
    <Box
      bg="white"
      borderWidth="1px"
      borderRadius="lg"
      mx="15%"
      my="5%"
      py="10"
    >
      <Center>
        <Heading p="2%">Soccer Championship Scoreboard 2022</Heading>
      </Center>
      <TableContainer>
        <Table colorScheme="teal" size="sm" maxWidth="60%" mx="auto">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>teamName</Th>
              <Th>Current Rankings</Th>
            </Tr>
          </Thead>
          <Tbody>
            {teamInfoArr.map((teamInfo) => (
              <Tr key={teamInfo.id}>
                <Td>{teamInfo.id}</Td>
                <Td>{teamInfo.teamName}</Td>
                <Td>{teamInfo.currentRanking}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <DeleteButton
        setTeamInfoSubmitSuccess={setTeamInfoSubmitSuccess}
        setMatchResultsSubmitSuccess={setMatchResultsSubmitSuccess}
      ></DeleteButton>
    </Box>
  );
}
