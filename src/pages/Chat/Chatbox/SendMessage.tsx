import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { roomActions } from "../../../redux/slices/rooms.slice";
import { AppDispatch, RootState } from "../../../redux/store";

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
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState<string>("");

  const isSending = useSelector((state: RootState) => state.rooms.isSending);

  const dispatch = useDispatch<AppDispatch>();

  const send = () => {
    if (message.length > 0) {
      dispatch(
        roomActions.sendMessage({
          text: message,
          roomId: id as string,
        })
      );
      setMessage("");
    }
  };

  return (
    <InputGroup w={"full"}>
      <Input
        placeholder={`Message Here`}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            send();
          }
        }}
        autoFocus
      />
      <InputRightElement p={1}>
        <IconButton
          aria-label="Send message"
          icon={<IoMdSend />}
          size={"sm"}
          variant={"ghost"}
          onClick={send}
          isLoading={isSending}
        />
      </InputRightElement>
    </InputGroup>
  );
}

export default SendMessage;
