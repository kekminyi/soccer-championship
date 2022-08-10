import {
  Heading,
  Button,
  Center,
  Flex,
  InputGroup,
  FormControl,
  Box,
  Textarea,
  useToast,
} from "@chakra-ui/react";

import Head from "next/head";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import SubmitResults from "./components/SubmitResults";
import RankingTable from "./components/rankingTable";

export default function Home() {
  const [teamInfo, setTeamInfo] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [teamInfoArr, setTeamInfoArr] = useState([]);

  const toast = useToast();

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

  const handleSubmit = async () => {
    try {
      await axios
        .post("/api/submitTeamInfo", { teamInfo })
        .then(function (response) {
          setSuccess(true);
          setErrorMsg("");
          toast({
            title: "Success!",
            description: "Team information submitted!",
            status: "success",
            duration: 6000,
            isClosable: true,
          });
        });
    } catch (error) {
      console.error(error);
      setErrorMsg("idk what to put here");
      setSuccess(false);
    }
  };

  const handleChange = (event) => {
    setTeamInfo(event.target.value);
  };

  const handleDelete = async () => {
    try {
      await axios.post("/api/deleteAll").then(() => {
        toast({
          title: "Success!",
          description: "All information deleted!",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
      });
      location.reload();
    } catch (error) {
      console.error(error);
      setErrorMsg("idk what to put here");
      setSuccess(false);
    }
  };

  return (
    <Flex flexDir={"column"} bg="blue.800" h="100vh">
      <Head>
        <title>Soccer Championship 2022</title>
      </Head>
      <Box
        bg="white"
        borderWidth="1px"
        borderRadius="lg"
        mx="15%"
        my="5%"
        py="10"
      >
        <Center>
          <Heading p="2%">Soccer Championship 2022</Heading>
        </Center>
        <Center>
          <FormControl isRequired w={"70%"}>
            <InputGroup>
              <Textarea
                size="lg"
                fontSize="l"
                placeholder="Team information here!"
                value={teamInfo}
                onChange={handleChange}
              ></Textarea>
            </InputGroup>
            <Button
              size="md"
              w="100%"
              colorScheme="whatsapp"
              mt="1em"
              onClick={handleSubmit}
            >
              Submit!
            </Button>
          </FormControl>
        </Center>
      </Box>
      {success && <SubmitResults></SubmitResults>}
      <Box
        bg="white"
        borderWidth="1px"
        borderRadius="lg"
        mx="15%"
        my="5%"
        py="10"
      >
        <RankingTable teamInfoArr={teamInfoArr}></RankingTable>
      </Box>
      <Center>
        <Button w="70%" colorScheme="red" onClick={handleDelete}>
          Delete
        </Button>
      </Center>
    </Flex>
  );
}
