/**
 * Start New Chat
 * @description This component is used to start a new chat with a user.
 * @author arhammusheer
 * @access authenticated
 */

import {
  Button,
  Icon,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { roomActions } from "../../../../redux/slices/rooms.slice";
import { AppDispatch, RootState } from "../../../../redux/store";

function StartNew() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        size={"sm"}
        variant={"ghost"}
        leftIcon={<Icon as={BsPlusLg} />}
        onClick={onOpen}
      >
        Start New Chat
      </Button>
      <StartNewModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

const StartNewModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const styles = {
    bg: useColorModeValue("white", "black"),
    border: {
      color: useColorModeValue("gray.200", "gray.800"),
    },
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bg={styles.bg}
        border={"1px"}
        borderColor={styles.border.color}
      >
        <ModalHeader>💬 Start New Chat</ModalHeader>
        <ModalBody>
          <StartNewChatForm onClose={onClose} />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme={"red"}
            onClick={onClose}
            leftIcon={<Icon as={IoMdClose} />}
            variant={"ghost"}
            size={"sm"}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const StartNewChatForm = ({ onClose }: { onClose: () => void }) => {
  const [value, setValue] = useState("");

  const rooms = useSelector((state: RootState) => state.rooms);
  const location = useSelector((state: RootState) => state.location);

  const dispatch = useDispatch<AppDispatch>();

  const toast = useToast({
    position: "bottom-right",
  });

  const createNewChat = () => {
    console.log("Create new chat with", value);

    if (value.length > 0) {
      dispatch(
        roomActions.createRoom({
          name: value,
          latitude: location.coordinates.latitude,
          longitude: location.coordinates.longitude,
        })
      );
      setValue("");
      onClose();
    }
  };

  return (
    <InputGroup>
      <Input
        value={value}
        placeholder={"Your topic..."}
        onChange={(e) => setValue(e.target.value)}
        borderRightRadius={"0"}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            createNewChat();
          }
        }}
      />
      <Button
        colorScheme={"blue"}
        borderLeftRadius={"0"}
        onClick={createNewChat}
        isLoading={rooms.isCreating}
      >
        Create
      </Button>
    </InputGroup>
  );
};
export default StartNew;
