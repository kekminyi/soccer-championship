import {
  Center,
  Button,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogCloseButton,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

export default function DeleteButton() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const handleDelete = async () => {
    try {
      setIsLoading(true);

      await axios.post("/api/deleteAll").then(() => {
        toast({
          title: "Success!",
          description: "All information deleted!",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
        setIsLoading(false);
        location.reload();
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Center mt={"3%"}>
        <Button w="50%" colorScheme="red" onClick={onOpen}>
          Delete all records
        </Button>
      </Center>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete all of the data?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={handleDelete}
              isLoading={isLoading}
              loadingText="Submitting"
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
