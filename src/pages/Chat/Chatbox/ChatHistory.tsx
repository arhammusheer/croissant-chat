import {
  Box,
  ButtonGroup,
  Flex,
  IconButton,
  Spacer,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BsTrash } from "react-icons/bs";
import distanceNormalize from "../../../utils/distanceNormalize";

function ChatHistory() {
  const messageTest = {
    content: "Hello World",
    avatar: {
      emoji: "🍩",
      bg: "yellow.400",
    },
    createdAt: "3 mins ago",
    distance: distanceNormalize(1),
    isSelf: true,
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, []);

  return (
    <Stack
      direction={"column"}
      w={"full"}
      h={"full"}
      overflowY={"scroll"}
      ref={ref}
    >
      {[...Array(20)].map((_, i) => (
        <Message {...messageTest} />
      ))}
      <Box h={"55px"} />
    </Stack>
  );
}

function Message({
  content,
  avatar,
  createdAt,
  distance,
  isSelf,
}: {
  content: string;
  avatar: {
    emoji: string;
    bg: string;
  };
  createdAt: string;
  distance: string;
  isSelf: boolean;
}) {
  const [isHovering, setIsHovering] = useState(false);

  const styles = {
    bg: useColorModeValue("gray.50", "black"),
    color: useColorModeValue("gray.800", "white"),
    hover: {
      bg: useColorModeValue("gray.100", "gray.900"),
    },
  } as const;

  return (
    <Stack
      direction={"row"}
      align={"center"}
      py={1}
      w={"full"}
      bg={styles.bg}
      _hover={{
        bg: styles.hover.bg,
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Box>
        <Flex
          bg={avatar.bg}
          w={"30px"}
          h={"30px"}
          m={2}
          borderRadius={"lg"}
          align={"center"}
          justify={"center"}
        >
          {avatar.emoji}
        </Flex>
      </Box>
      <Flex direction={"column"} w={"full"} px={1} color={styles.color}>
        <Flex direction={"row"} w={"full"}>
          <Text fontSize={"md"}>{content}</Text>
        </Flex>
        <Stack direction={"row"} w={"full"} divider={<StackDivider />} mt={1}>
          <Text fontSize={"xs"}>{createdAt}</Text>
          <Text fontSize={"xs"}>{distance}</Text>
        </Stack>
      </Flex>
      <Spacer />
      <AnimatePresence>
        {isHovering && (
          <ButtonGroup>
            {isSelf && (
              <IconButton
                aria-label="Like"
                icon={<BsTrash />}
                size={"sm"}
                variant="ghost"
                mx={6}
                colorScheme="red"
              />
            )}
          </ButtonGroup>
        )}
      </AnimatePresence>
    </Stack>
  );
}

export default ChatHistory;
