import {
  Button,
  InputGroup,
  FormControl,
  Textarea,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import SidebarIcon from "./SideBarIcon";
import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import axios from "axios";

export default function MatchResultsSubmission() {
  const [matchResults, setMatchResults] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await axios.post("/api/submitMatchResults", { matchResults }).then(() => {
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
      toast({
        title: "Error!",
        description:
          "There are error(s) with the match results. Please check and submit again.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
    setIsLoading(false);
    onClose();
    location.reload();
  };

  const handleChange = (event) => {
    setMatchResults(event.target.value);
  };
  return (
    <>
      <SidebarIcon
        mt={10}
        onClick={onOpen}
        iconName={FiUpload}
        text="Upload Match Results"
      ></SidebarIcon>

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        closeOnOverlayClick={false}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent maxW="45rem">
          <ModalHeader>Upload Match Results</ModalHeader>
          <ModalBody>
            <FormControl isRequired w={"100%"}>
              <InputGroup>
                <Textarea
                  size="lg"
                  fontSize="l"
                  placeholder="<Team A name> <Team B name> <Team A goals scored> <Team B goals scored>"
                  value={matchResults}
                  onChange={handleChange}
                ></Textarea>
              </InputGroup>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              size="md"
              w="100%"
              colorScheme="whatsapp"
              m="1%"
              onClick={handleSubmit}
              isLoading={isLoading}
              loadingText="Submitting"
            >
              Submit
            </Button>
            <Button onClick={onClose} m="1%">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
