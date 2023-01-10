import {
  Box,
  ButtonGroup,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Skeleton,
  Spacer,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BsArrowDown, BsCheck, BsPencil, BsTrash, BsX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useFetcher, useParams } from "react-router-dom";
import { peopleActions } from "../../../redux/slices/people.slice";
import { roomActions } from "../../../redux/slices/rooms.slice";
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
  const stackRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.user.profile);
  const [unseen, setUnseen] = useState(0);
  const { id } = useParams<{ id: string }>();
  const room = useSelector(
    (state: RootState) =>
      state.rooms.rooms.find((room) => room.metadata?.id === id) || null
  );
  const dispatch = useDispatch<AppDispatch>();

  const isSelf = (userId: string) => {
    return user?.id === userId;
  };

  const isEdited = (createdAt: string, updatedAt: string) => {
    return createdAt !== updatedAt;
  };

  const keepBottom = () => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
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
    if (isBottom) {
      keepBottom();
    } else {
      setUnseen((prev) => prev + 1);
      // playSound(AUDIOS.newMessage);
    }
  }, [messages]);

  return (
    <Stack direction={"column"} h={"full"}>
      {messages.map((message, index) => (
        <Message
          key={`${message.id}-${index}`}
          content={message.text}
          authorId={message.userId}
          createdAt={relativeTime(new Date(message.createdAt), new Date())}
          isSelf={isSelf(message.userId)}
          isEdited={isEdited(message.createdAt, message.updatedAt)}
          onDelete={() =>
            dispatch(
              roomActions.deleteMessage({
                roomId: message.roomId,
                messageId: message.id,
              })
            )
          }
          onEdit={(text: string) =>
            dispatch(
              roomActions.editMessage({
                roomId: message.roomId,
                messageId: message.id,
                text,
              })
            )
          }
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
  isEdited,
  onDelete,
  onEdit,
}: {
  content: string;
  createdAt: string;
  authorId: string;
  isSelf: boolean;
  isEdited?: boolean;
  onDelete?: () => void;
  onEdit?: (text: string) => void;
}) {
  const [isHovering, setIsHovering] = useState(false);
  const author = useSelector((state: RootState) => {
    return state.people.people[authorId];
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(content);

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

  const editMessage = (text: string) => {
    if (text === content) {
      setIsEditing(false);
      return;
    }
    onEdit?.(text);
  };

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
          {isEditing ? (
            <Stack direction={"row"} align={"center"} w={"full"}>
              <Input
                m={2}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                placeholder="Edit message"
                w={"full"}
                autoFocus
                onBlur={() => {
                  setIsEditing(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setIsEditing(false);
                    editMessage(editText);
                  }

                  if (e.key === "Escape") {
                    setIsEditing(false);
                    setEditText(content);
                  }
                }}
              />
              <IconButton
                aria-label="Done"
                icon={<BsCheck />}
                variant="ghost"
                colorScheme="green"
                onClick={() => {
                  setIsEditing(false);
                  editMessage(editText);
                }}
              />
              <IconButton
                aria-label="Cancel"
                icon={<BsX />}
                variant="ghost"
                colorScheme="red"
                onClick={() => {
                  setIsEditing(false);
                  setEditText(content);
                }}
              />
            </Stack>
          ) : (
            <Text fontSize={"md"}>{content}</Text>
          )}
        </Flex>
        <Stack direction={"row"} w={"full"} divider={<StackDivider />} mt={1}>
          <Text fontSize={"xs"}>{createdAt}</Text>
          {isEdited && <Text fontSize={"xs"}>Edited</Text>}
        </Stack>
      </Flex>
      <Spacer />
      <AnimatePresence>
        {isHovering && !isEditing && (
          <ButtonGroup spacing={2} mr={10}>
            {isSelf && (
              <>
                <IconButton
                  aria-label="Edit"
                  icon={<BsPencil />}
                  size={"sm"}
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() => {
                    if (isEditing) {
                      editMessage(editText);
                    }

                    setIsEditing(!isEditing);
                  }}
                />

                <IconButton
                  aria-label="Delete"
                  icon={<BsTrash />}
                  size={"sm"}
                  variant="ghost"
                  colorScheme="red"
                  onClick={onDelete}
                  mr={10}
                />
              </>
            )}
          </ButtonGroup>
        )}
      </AnimatePresence>
    </Stack>
  );
}

export default ChatHistory;
