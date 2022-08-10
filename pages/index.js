import { Flex, Heading } from "@chakra-ui/react";

import Head from "next/head";
import React, { useEffect, useState, useCallback } from "react";
import RankingTable from "./components/RankingTable";
import TeamInfoSubmission from "./components/TeamInfoSubmission";
import MatchResultsSubmission from "./components/MatchResultsSubmission";
import DeleteButton from "./components/DeleteButton";
import axios from "axios";

export default function Home() {
  const fetchData = useCallback(async () => {
    const result = await axios.get("/api/getCurrentRankings");
    if (result.data.group1.length > 0 || result.data.group2.length > 0) {
      setActiveDeleteButton(true);
    }
  }, []);

  // the useEffect is only there to call `fetchData` at the right time
  useEffect(() => {
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [fetchData]);

  return (
    <Flex h="100vh" flexDir={"row"} overflow="hidden" bg="white">
      <Head>
        <title>Soccer Championship 2022</title>
      </Head>
      {/* Column 1 */}
      <Flex
        w="15%"
        flexDir="column"
        backgroundColor="#020202"
        color="#fff"
        alignItems="center"
      >
        <Heading
          mt={50}
          mb={100}
          fontSize="4xl"
          alignSelf="center"
          letterSpacing="tight"
        >
          Dashboard.
        </Heading>
        <Flex
          flexDir="column"
          align="flex-start"
          justifyContent="center"
          mt={"50%"}
        >
          <TeamInfoSubmission></TeamInfoSubmission>
          <MatchResultsSubmission></MatchResultsSubmission>
        </Flex>
      </Flex>
      {/* Column 2 */}
      <Flex w="85%" flexDir="column" overflow="auto">
        <RankingTable></RankingTable>
      </Flex>
    </Flex>
  );
}
