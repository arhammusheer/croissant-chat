import { Flex, Text, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../redux/store";

function Titlebox() {
  const { id } = useParams<{ id: string }>();
  const room = useSelector(
    (state: RootState) =>
      state.rooms.rooms.find((room) => room.metadata?.id === id) || null
  );

  const styles = {
    bg: useColorModeValue("white", "black"),
    border: {
      color: useColorModeValue("gray.200", "gray.800"),
    },
  };

  return (
    <Flex
      w={"full"}
      h={"50px"}
      borderBottom={"1px"}
      borderColor={styles.border.color}
      bg={styles.bg}
      alignItems={"center"}
    >
      <Title text={room?.metadata?.name || "Loading..."} />
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
