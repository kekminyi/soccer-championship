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

import React, { useState } from "react";
import axios from "axios";

export default function SubmitResults() {
  const [matchResults, setMatchResults] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const toast = useToast();

  const handleSubmit = async () => {
    try {
      await axios.post("/api/submitResults", { matchResults }).then(() => {
        setSuccess(true);
        setErrorMsg("");
        toast({
          title: "Success!",
          description: "Match results submitted!",
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
    setMatchResults(event.target.value);
  };
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
        <Heading p="2%">
          Submit Match Results for Soccer Championship 2022
        </Heading>
      </Center>
      <Center>
        <FormControl isRequired w={"70%"}>
          <InputGroup>
            <Textarea
              size="lg"
              fontSize="l"
              placeholder="Submit match results here!"
              value={matchResults}
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
  );
}
