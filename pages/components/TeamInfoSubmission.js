import {
  Box,
  FormControl,
  InputGroup,
  Textarea,
  Center,
  Heading,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

export default function TeamInfoSubmission({ setTeamInfoSubmitSuccess }) {
  const [teamInfo, setTeamInfo] = useState("");
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      await axios.post("/api/submitTeamInfo", { teamInfo }).then(() => {
        toast({
          title: "Success!",
          description: "Team information submitted!",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
        setTeamInfoSubmitSuccess(true);
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error!",
        description:
          "There are error(s) with the team information. Please check and submit again.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  const handleChange = (event) => {
    setTeamInfo(event.target.value);
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
  );
}
