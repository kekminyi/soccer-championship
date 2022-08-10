import {
  FormControl,
  InputGroup,
  Textarea,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import SidebarIcon from "./SideBarIcon";
import { FiUpload } from "react-icons/fi";

export default function TeamInfoSubmission() {
  const [teamInfo, setTeamInfo] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    onClose();
    location.reload();
  };

  const handleChange = (event) => {
    setTeamInfo(event.target.value);
  };

  return (
    <>
      <SidebarIcon
        mt={3}
        onClick={onOpen}
        iconName={FiUpload}
        text="Register Teams"
      ></SidebarIcon>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Team Information</ModalHeader>
          <ModalBody>
            <FormControl isRequired w={"100%"}>
              <InputGroup>
                <Textarea
                  size="lg"
                  fontSize="l"
                  placeholder="Team information here!"
                  value={teamInfo}
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
