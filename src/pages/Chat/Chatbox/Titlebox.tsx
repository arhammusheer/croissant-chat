import {
  Button,
  Flex,
  IconButton,
  Spacer,
  Text,
  Tooltip,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsChevronLeft } from "react-icons/bs";
import { IoReloadOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { chatActions } from "../../../redux/slices/chat.slice";
import { roomActions } from "../../../redux/slices/rooms.slice";
import { AppDispatch, RootState } from "../../../redux/store";

function Titlebox() {
  const { id } = useParams<{ id: string }>();
  const room = useSelector(
    (state: RootState) =>
      state.rooms.rooms.find((room) => room.metadata?.id === id) || null
  );
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  const dispatch = useDispatch<AppDispatch>();

  const onClose = () => dispatch(chatActions.closeChat());

  const reload = () => {
    if (!id) return;

    dispatch(
      roomActions.loadMessages({
        roomId: id,
      })
    );
  };

  const styles = {
    bg: useColorModeValue("white", "black"),
    border: {
      color: useColorModeValue("gray.200", "gray.800"),
    },
  };

  return (
    <Flex align={"center"} h={"full"}>
      {isMobile && (
        <IconButton
          icon={<BsChevronLeft />}
          onClick={onClose}
          aria-label="close"
          variant={"ghost"}
        />
      )}
      <Title text={room?.metadata?.name || "Loading..."} />
      <Spacer />
      <Button
        variant={"ghost"}
        mx={2}
        leftIcon={<IoReloadOutline />}
        onClick={reload}
      >
        <Text fontSize={"sm"}>Reload</Text>
      </Button>
    </Flex>
  );
}

const Title = ({ text }: { text: string }) => {
  const styles = {
    color: useColorModeValue("gray.800", "white"),
  };

  return (
    <Tooltip label={text} hasArrow>
      <Text
        fontWeight={"bold"}
        color={styles.color}
        padding={2}
        userSelect={"none"}
        textOverflow={"ellipsis"}
        noOfLines={1}
      >
        {text}
      </Text>
    </Tooltip>
  );
};

export default Titlebox;
