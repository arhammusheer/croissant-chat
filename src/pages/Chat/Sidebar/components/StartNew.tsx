/**
 * Start New Chat
 * @description This component is used to start a new chat with a user.
 * @author arhammusheer
 * @access authenticated
 */

import { Button, Icon } from "@chakra-ui/react";
import { BsPlusLg } from "react-icons/bs";

function StartNew() {
  return (
    <Button size={"sm"} variant={"ghost"} leftIcon={<Icon as={BsPlusLg} />}>
      Start New Chat
    </Button>
  );
}

export default StartNew;
