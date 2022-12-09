import {
  Box,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Skeleton,
  Spacer,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { peopleActions } from "../../../redux/slices/people.slice";
import { AppDispatch, RootState } from "../../../redux/store";
import distanceNormalize from "../../../utils/distanceNormalize";
import relativeTime from "../../../utils/relativeTime";

function ChatHistory({
  messages,
  isLoading,
}: {
  messages: {
    id: string;
    roomId: string;
    userId: string;
    text: string;

    createdAt: string;
    updatedAt: string;
  }[];
  isLoading: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.user.profile);
  const { id } = useParams<{ id: string }>();
  const room = useSelector(
    (state: RootState) =>
      state.rooms.rooms.find((room) => room.metadata?.id === id) || null
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, []);

  const isSelf = (userId: string) => {
    return user?.id === userId;
  };

  return (
    <Stack
      direction={"column"}
      w={"full"}
      h={"full"}
      overflowY={"scroll"}
      ref={ref}
      justify={"flex-end"}
    >
      {messages.map((message, index) => (
        <Skeleton isLoaded={!isLoading}>
          <Message
            key={message.id}
            content={message.text}
            authorId={message.userId}
            createdAt={relativeTime(new Date(message.createdAt), new Date())}
            isSelf={isSelf(message.userId)}
          />
        </Skeleton>
      ))}
      {messages.length === 0 && (
        <Stack direction={"column"} p={4}>
          <Heading color={useColorModeValue("gray.600", "gray.400")}>
            Welcome to {room?.metadata.name || ""}
          </Heading>
          <Text fontSize={"md"}>No messages yet</Text>
        </Stack>
      )}
    </Stack>
  );
}

function Message({
  content,
  createdAt,
  authorId,
  isSelf,
}: {
  content: string;
  createdAt: string;
  authorId: string;
  isSelf: boolean;
}) {
  const [isHovering, setIsHovering] = useState(false);
  const author = useSelector((state: RootState) => {
    return state.people.people[authorId];
  });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!author) {
      dispatch(peopleActions.getProfile(authorId));
    }
  }, [author]);

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
          bg={author?.background || "gray.300"}
          w={"30px"}
          h={"30px"}
          m={2}
          borderRadius={"lg"}
          align={"center"}
          justify={"center"}
        >
          {author?.emoji || "👤"}
        </Flex>
      </Box>
      <Flex direction={"column"} w={"full"} px={1} color={styles.color}>
        <Flex direction={"row"} w={"full"}>
          <Text fontSize={"md"}>{content}</Text>
        </Flex>
        <Stack direction={"row"} w={"full"} divider={<StackDivider />} mt={1}>
          <Text fontSize={"xs"}>{createdAt}</Text>
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
