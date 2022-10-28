import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext } from "react";
import { IoMdSend } from "react-icons/io";
import { useLoaderData } from "react-router-dom";
import { GlobalContext } from "../../../main";

function SendMessage() {
  const styles = {
    bg: useColorModeValue("white", "black"),
  };

  return (
    <Flex
      w={"full"}
      h={"80px"}
      p={4}
      position={"static"}
      bottom={0}
      alignItems={"center"}
      bg={styles.bg}
      direction={"column"}
    >
      <ChatInput />
    </Flex>
  );
}

function ChatInput() {
  const gctx = useContext(GlobalContext);

  return (
    <InputGroup w={"full"}>
      <Input placeholder={`Message #${gctx.user.name}`} />
      <InputRightElement p={1}>
        <IconButton
          aria-label="Send message"
          icon={<IoMdSend />}
          size={"sm"}
          variant={"ghost"}
        />
      </InputRightElement>
    </InputGroup>
  );
}

export default SendMessage;
