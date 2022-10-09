import {
  Box,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import relativeTime from "../../../utils/relativeTime";
import { BsFillChatRightFill } from "react-icons/bs";

function Rooms() {
  return (
    <Stack spacing={4} p={4} w={"full"} h={"full"} zIndex={0}>
      {example.map((room) => (
        <Room
          name={room.name}
          created_at={room.created_at}
          messageCount={room.message_count}
        />
      ))}
      {example.map((room) => (
        <Room
          name={room.name}
          created_at={room.created_at}
          messageCount={Math.floor(Math.random() * 100)}
        />
      ))}
    </Stack>
  );
}

function Room({
  name,
  created_at,
  messageCount = 0,
}: {
  name: string;
  created_at: string;
  messageCount?: number;
}) {
  const createdAt = new Date(created_at);
  const now = new Date();

  const relative = relativeTime(createdAt, now);

  const styles = {
    bg: useColorModeValue("gray.50", "gray.900"),
    border: useColorModeValue("gray.200", "gray.800"),
    color: useColorModeValue("gray.800", "white"),
    hover: {
      bg: useColorModeValue("gray.100", "gray.800"),
    },
    click: {
      bg: useColorModeValue("gray.200", "gray.700"),
    },
    icon: {
      color: useColorModeValue("gray.400", "gray.600"),
      text: useColorModeValue("gray.600", "gray.400"),
    },
  };

  return (
    <Flex
      direction={"column"}
      padding={3}
      borderRadius={"md"}
      bg={styles.bg}
      border={"1px"}
      borderColor={styles.border}
      color={styles.color}
      _hover={styles.hover}
      cursor={"pointer"}
      transition={"all 0.1s ease-in-out"}
      _active={styles.click}
      userSelect={"none"}
    >
      <Heading size={"md"}>{name}</Heading>
      <Flex justifyContent={"space-between"} alignItems={"center"} mt={2}>
        <Text fontSize={"xs"}>{relative}</Text>
        <Text fontSize={"xs"} fontWeight={"bold"} color={styles.icon.text}>
          <Icon as={BsFillChatRightFill} color={styles.icon.color} mr={1} />
          {messageCount}
        </Text>
      </Flex>
    </Flex>
  );
}

export default Rooms;

const example = [
  {
    name: "Hello World",
    created_at: "2022-10-09T16:00:00.000Z",
    message_count: 10,
  },
  {
    name: "Why is it so empty did everyone go home?",
    created_at: "2022-10-09T16:00:00.000Z",
  },
  {
    name: "Some people just say the darnest things",
    created_at: "2022-10-09T16:00:00.000Z",
  },
  {
    name: "I'm not sure what to say",
    created_at: "2022-10-09T16:00:00.000Z",
  },
  {
    name: "What is an Emergency physician’s favorite cellular organelle?",
    created_at: "2022-10-09T16:00:00.000Z",
  },
  {
    name: "What do you call an Italian and African mosquito cross-breed?",
    created_at: "2022-10-09T16:00:00.000Z",
  },
] as {
  name: string;
  created_at: string;
  message_count?: number;
}[];
