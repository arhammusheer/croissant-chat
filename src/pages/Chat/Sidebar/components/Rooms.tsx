import {
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion, MotionProps } from "framer-motion";
import { useEffect } from "react";
import { BsFillChatRightFill } from "react-icons/bs";
import { IoIosShareAlt } from "react-icons/io";
import { Link } from "react-router-dom";
import useGeoLocation from "../../../../hooks/useGeoLocation";
import useRooms from "../../../../hooks/useRooms";
import distanceNormalize from "../../../../utils/distanceNormalize";
import relativeTime from "../../../../utils/relativeTime";

function Rooms() {
  const { refresh, rooms } = useRooms();
  const geo = useGeoLocation();

  useEffect(() => {
    geo.refresh();
  }, []);

  useEffect(() => {
    refresh(geo.lat, geo.lng);
  }, [geo.lat, geo.lng]);

  const motionConfig: MotionProps = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    whileHover: { scale: 1.01 },
    whileTap: { scale: 0.99 },
    transition: { duration: 0.1 },
  };

  return (
    <Stack spacing={2} p={2} w={"full"} h={"full"} zIndex={0}>
      {rooms &&
        rooms.map((room) => (
          <Link to={`/chat/${room.id}`} key={room.id}>
            <motion.div {...motionConfig}>
              <Room
                key={room.id}
                name={`${room.name}`}
                created_at={room.createdAt}
                distance={room.distance}
              />
            </motion.div>
          </Link>
        ))}
    </Stack>
  );
}

function Room({
  name,
  created_at,
  messageCount = 0,
  distance = 1000,
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
  const normalizedDistance = distanceNormalize(Math.floor(distance / 1000));

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
