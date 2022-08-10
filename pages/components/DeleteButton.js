import { Center, Button, useToast } from "@chakra-ui/react";
import axios from "axios";

export default function DeleteButton({
  my,
  setTeamInfoSubmitSuccess,
  setMatchResultsSubmitSuccess,
}) {
  const toast = useToast();
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
        setTeamInfoSubmitSuccess(false);
        setMatchResultsSubmitSuccess(false);
        location.reload();
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Center mt={5} my={my}>
      <Button w="70%" colorScheme="red" onClick={handleDelete}>
        Delete all records
      </Button>
    </Center>
  );
}
