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
import React, { useState } from "react";
import axios from "axios";
import SubmitResults from "./components/SubmitResults";

export default function Home() {
  const [teamInfo, setTeamInfo] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const toast = useToast();

  const handleSubmit = async () => {
    try {
      await axios
        .post("/api/submitTeamInfo", { teamInfo })
        .then(function (response) {
          console.log(response.data);
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
    </Flex>
  );
}
