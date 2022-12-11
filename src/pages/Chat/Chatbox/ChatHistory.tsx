import {
  Box,
  ButtonGroup,
  Flex,
  Heading,
  Icon,
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
import { BsArrowDown, BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useFetcher, useParams } from "react-router-dom";
import { peopleActions } from "../../../redux/slices/people.slice";
import { AppDispatch, RootState } from "../../../redux/store";
import { AUDIOS } from "../../../utils/defaults";
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
  const [unseen, setUnseen] = useState(0);
  const { id } = useParams<{ id: string }>();
  const room = useSelector(
    (state: RootState) =>
      state.rooms.rooms.find((room) => room.metadata?.id === id) || null
  );

  const isSelf = (userId: string) => {
    return user?.id === userId;
  };

  const keepBottom = () => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  };

  const playSound = (url: string) => {
    const audio = new Audio(url);
    audio.play();
  };

  const scrollToBottom = (
    ref: React.RefObject<HTMLDivElement>,
    smooth = false
  ) => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: smooth ? "smooth" : "auto",
      });
    } else {
      console.log("ref not found");
    }
  };
  const [isBottom, setIsBottom] = useState(true);

  useEffect(() => {
    // Scroll Listener
    const handleScroll = () => {
      if (ref.current) {
        const { scrollTop, scrollHeight, clientHeight } = ref.current;
        const isBottom = scrollHeight - scrollTop === clientHeight;
        setIsBottom(isBottom);

        if (isBottom) {
          setUnseen(0);
        }
      }
    };
    if (ref.current) {
      ref.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    keepBottom();
  }, [isLoading]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    const isSelf = lastMessage?.userId === user?.id;
    if (isBottom && !isSelf) {
      keepBottom();
    } else {
      setUnseen((prev) => prev + 1);
      // playSound(AUDIOS.newMessage);
    }
  }, [messages]);

  return (
    <Box
      overflowY={"scroll"}
      ref={ref}
      overflowX={"hidden"}
      // direction={"column"}
      w={"full"}
      h={"full"}
      // justify={"flex-end"}
    >
      <Box h={"full"} />
      <Stack direction={"column"}>
        {messages.map((message, index) => (
          <Message
            key={`${message.id}-${index}`}
            content={message.text}
            authorId={message.userId}
            createdAt={relativeTime(new Date(message.createdAt), new Date())}
            isSelf={isSelf(message.userId)}
          />
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
      <AnimatePresence>
        {!isBottom && (
          <ScrollToBottomBar
            onClick={() => {
              scrollToBottom(ref, true);
            }}
            unseen={unseen}
          />
        )}
      </AnimatePresence>
    </Box>
  );
}

function ScrollToBottomBar({
  unseen,
  onClick,
}: {
  unseen: number;
  onClick: () => void;
}) {
  return (
    <Flex
      position={"absolute"}
      bottom={"80px"}
      right={"20px"}
      bg={useColorModeValue("#FC818188", "gray.700")}
      p={2}
      onClick={onClick}
      align={"center"}
      cursor={"pointer"}
      paddingX={4}
      borderRadius={"md"}
    >
      <Stack direction={"row"} align={"center"} spacing={2}>
        {unseen > 0 ? (
          <Text fontSize={"sm"}>{unseen} new messages</Text>
        ) : (
          <Text fontSize={"sm"}>Scroll to bottom</Text>
        )}
        <Icon as={BsArrowDown} />
      </Stack>
    </Flex>
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
