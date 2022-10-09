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
          key={room.name}
          name={`${room.name}`}
          created_at={room.created_at}
          messageCount={room.message_count}
          background_url={room.background_url}
        />
      ))}
      {example.map((room) => (
        <Room
          key={room.name}
          name={`${room.name}`}
          created_at={room.created_at}
          messageCount={Math.floor(Math.random() * 100)}
          background_url={room.background_url}
        />
      ))}
    </Stack>
  );
}

function Room({
  name,
  created_at,
  messageCount = 0,
  background_url,
}: {
  name: string;
  created_at: string;
  messageCount?: number;
  background_url?: string;
}) {
  const createdAt = new Date(created_at);
  const now = new Date();

  const relative = relativeTime(createdAt, now);

  const styles = {
    bg: {
      default: useColorModeValue("white", "gray.900"),
      image: useColorModeValue(
        `linear-gradient(rgba(255, 255, 255, 0.6), rgba( 255, 255, 255, 0.6)), url(${background_url})`,
        `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url(${background_url})`
      ),
    },
    border: useColorModeValue("gray.200", "gray.800"),
    color: useColorModeValue("gray.800", "white"),
    hover: {
      bg: background_url
        ? useColorModeValue(
            `linear-gradient(rgba(255, 255, 255, 0.4), rgba( 255, 255, 255, 0.4)), url(${background_url})`,
            `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url(${background_url})`
          )
        : useColorModeValue("gray.100", "gray.800"),
      backgroundSize: "cover",
    },
    click: {
      bg: background_url
        ? useColorModeValue(
            `linear-gradient(rgba(255, 255, 255, 0.2), rgba( 255, 255, 255, 0.2)), url(${background_url})`,
            `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url(${background_url})`
          )
        : useColorModeValue("gray.200", "gray.700"),

      backgroundSize: "cover",
    },
    icon: {
      color: useColorModeValue("gray.500", "gray.600"),
      text: useColorModeValue("gray.700", "gray.200"),
    },
  };

  return (
    <Flex
      direction={"column"}
      padding={3}
      borderRadius={"md"}
      bg={background_url ? styles.bg.image : styles.bg.default}
      backgroundSize={"cover"}
      backgroundRepeat={"no-repeat"}
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
    name: "This is Subbaswammy. AMA",
    created_at: "2022-10-09T16:00:00.000Z",
    message_count: 10,
    background_url:
      "https://cdn.discordapp.com/attachments/785885889988919366/1028723456029769879/unknown.png",
  },
  {
    name: "Cow",
    created_at: "2022-10-09T16:00:00.000Z",
    background_url:
      "https://images.unsplash.com/photo-1556997685-309989c1aa82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80",
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
  background_url?: string;
}[];
