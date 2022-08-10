import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
export default function RankingTable({ teamInfoArr = [] }) {
  return (
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
  );
}
