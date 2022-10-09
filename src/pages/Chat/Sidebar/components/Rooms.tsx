import {
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsFillChatRightFill } from "react-icons/bs";
import { IoIosShareAlt } from "react-icons/io";
import distanceNormalize from "../../../../utils/distanceNormalize";
import relativeTime from "../../../../utils/relativeTime";

function Rooms({ setId }: { setId: (id: string) => void }) {
  return (
    <Stack spacing={2} p={2} w={"full"} h={"full"} zIndex={0}>
      {example.map((room) => (
        <Room
          key={room.name}
          name={`${room.name}`}
          created_at={room.created_at}
          messageCount={room.message_count}
          background_url={room.background_url}
          onClick={() => setId(room.name)}
        />
      ))}
    </Stack>
  );
}

function Room({
  name,
  created_at,
  messageCount = 0,
  distance = 10,
  background_url,
  onClick,
}: {
  name: string;
  created_at: string;
  distance?: number;
  messageCount?: number;
  background_url?: string;
  onClick?: () => void;
}) {
  const createdAt = new Date(created_at);
  const now = new Date();

  const relative = relativeTime(createdAt, now);
  const normalizedDistance = distanceNormalize(distance);

  const styles = {
    bg: {
      default: useColorModeValue("white", "black"),
      image: useColorModeValue(
        `linear-gradient(rgba(255, 255, 255, 0.6), rgba( 255, 255, 255, 0.6)), url(${background_url})`,
        `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background_url})`
      ),
    },
    border: useColorModeValue("gray.200", "gray.900"),
    color: useColorModeValue("gray.800", "white"),
    hover: {
      bg: background_url
        ? useColorModeValue(
            `linear-gradient(rgba(255, 255, 255, 0.4), rgba( 255, 255, 255, 0.4)), url(${background_url})`,
            `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url(${background_url})`
          )
        : useColorModeValue("gray.100", "gray.900"),
      backgroundSize: "cover",
    },
    click: {
      bg: background_url
        ? useColorModeValue(
            `linear-gradient(rgba(255, 255, 255, 0.2), rgba( 255, 255, 255, 0.2)), url(${background_url})`,
            `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(${background_url})`
          )
        : useColorModeValue("gray.200", "gray.800"),

      backgroundSize: "cover",
    },
    icon: {
      color: useColorModeValue("gray.700", "gray.200"),
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
      onClick={onClick}
    >
      <Heading size={"md"}>{name}</Heading>
      <Text fontSize={"xs"}>
        {relative} | {normalizedDistance}
      </Text>
      <Flex justifyContent={"flex-end"} alignItems={"center"} mt={2}>
        <Icon as={BsFillChatRightFill} color={styles.icon.color} mr={1} />
        <Text fontSize={"xs"} fontWeight={"bold"} color={styles.icon.text}>
          {messageCount}
        </Text>
        <Icon as={IoIosShareAlt} color={styles.icon.color} ml={2} mr={1} />
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
