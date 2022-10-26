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
  InputRightElement,
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
  const [loading, setLoading] = useState(false);

  const toast = useToast({
    position: "bottom-right",
  });

  const createNewChat = () => {
    console.log("Create new chat with", value);
    setLoading(true);
    toast({
      title: `Creating new chat: ${value}`,
      status: "info",
      duration: 1000,
      isClosable: true,
    });
    // createRoom(value)
    //   .then(() => setLoading(false))
    //   .then(onClose)
    //   .then(() =>
    //     toast({
    //       title: "Chat created",
    //       status: "success",
    //       isClosable: true,
    //       duration: 2000,
    //     })
    //   );
  };

  return (
    <InputGroup>
      <Input
        value={value}
        placeholder={"Your topic..."}
        onChange={(e) => setValue(e.target.value)}
        borderRightRadius={"0"}
      />
      <Button
        colorScheme={"blue"}
        borderLeftRadius={"0"}
        onClick={createNewChat}
        isLoading={loading}
      >
        Create
      </Button>
    </InputGroup>
  );
};
export default StartNew;
