import { Flex } from "@chakra-ui/react";

import Head from "next/head";
import React, { useEffect, useState, useCallback } from "react";
import RankingTable from "./components/RankingTable";
import TeamInfoSubmission from "./components/TeamInfoSubmission";
import MatchResultsSubmission from "./components/MatchResultsSubmission";
import DeleteButton from "./components/DeleteButton";
import axios from "axios";

export default function Home() {
  const [teamInfoSubmitSuccess, setTeamInfoSubmitSuccess] = useState(false);
  const [matchResultsSubmitSuccess, setMatchResultsSubmitSuccess] =
    useState(false);
  const [activeDeleteButton, setActiveDeleteButton] = useState(false);

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
    <Flex flexDir={"column"} bg="blue.800" h="100vh">
      <Head>
        <title>Soccer Championship 2022</title>
      </Head>
      {!matchResultsSubmitSuccess && (
        <>
          <TeamInfoSubmission
            setTeamInfoSubmitSuccess={setTeamInfoSubmitSuccess}
          ></TeamInfoSubmission>
          {teamInfoSubmitSuccess && (
            <MatchResultsSubmission
              setMatchResultsSubmitSuccess={setMatchResultsSubmitSuccess}
            ></MatchResultsSubmission>
          )}
        </>
      )}
      )
      {matchResultsSubmitSuccess && (
        <RankingTable
          setTeamInfoSubmitSuccess={setTeamInfoSubmitSuccess}
          setMatchResultsSubmitSuccess={setMatchResultsSubmitSuccess}
        ></RankingTable>
      )}
      {activeDeleteButton && (
        <DeleteButton
          my={"10%"}
          setTeamInfoSubmitSuccess={setTeamInfoSubmitSuccess}
          setMatchResultsSubmitSuccess={setMatchResultsSubmitSuccess}
        ></DeleteButton>
      )}
    </Flex>
  );
}
