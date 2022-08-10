import {
  Heading,
  Button,
  Center,
  InputGroup,
  FormControl,
  Box,
  Textarea,
  useToast,
} from "@chakra-ui/react";

import React, { useState } from "react";
import axios from "axios";

export default function SubmitMatchResults({ setMatchResultsSubmitSuccess }) {
  const [matchResults, setMatchResults] = useState("");

  const toast = useToast();

  const handleSubmit = async () => {
    try {
      await axios.post("/api/submitResults", { matchResults }).then(() => {
        toast({
          title: "Success!",
          description: "Match results submitted!",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
      });
      setMatchResultsSubmitSuccess(true);
    } catch (error) {
      console.error(error);
      setMatchResultsSubmitSuccess(false);
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
      my="1%"
      py="10"
    >
      <Center>
        <Heading p="2%">Submit Match Results</Heading>
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
