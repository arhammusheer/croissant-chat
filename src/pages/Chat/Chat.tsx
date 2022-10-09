/**
 * Chat page
 * @description This is the chat entry point
 * @author arhammusheer
 * @access authenticated
 */

import logo from "../../assets/croissant.svg";

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Rooms from "./Sidebar/components/Rooms";
import Topbar from "./Sidebar/components/Topbar";
import Bottombar from "./Sidebar/components/Bottombar";
import { useEffect, useRef, useState } from "react";
import Chatbox from "./Chatbox/Chatbox";
import Introduction from "./Introduction";
import { IoIosClose } from "react-icons/io";

function Chat() {
  const hasViewedIntroIn1Week = () => {
    const lastViewed = localStorage.getItem("introLastViewed");
    if (!lastViewed) return false;
    return (
      new Date().getTime() - parseInt(lastViewed) < 1000 * 60 * 60 * 24 * 7
    );
  };
  const [activeId, setActiveId] = useState(
    hasViewedIntroIn1Week() ? "" : "introduction"
  );

  const [user, setUser] = useState({
    name: "croissant#3831",
    avatar: {
      emoji: "🍩",
      bg: "yellow.400",
    },
  });

  const menuStyles = {
    bg: useColorModeValue("white", "black"),
    color: useColorModeValue("gray.800", "white"),
    border: useColorModeValue("gray.200", "gray.900"),
  } as const;

  const chatStyles = {
    bg: useColorModeValue("gray.50", "black"),
    color: useColorModeValue("gray.800", "white"),
  } as const;

  const baseStyles = {
    bg: useColorModeValue("white", "black"),
  } as const;

  const isMobile = useBreakpointValue({
    base: true,
    sm: false,
  });

  const styles = {
    base: baseStyles,
    menu: menuStyles,
    chat: chatStyles,
  };

  if (isMobile) {
    return (
      <MobileView
        user={user}
        id={activeId}
        setId={setActiveId}
        styles={styles}
      />
    );
  } else {
    return (
      <DesktopView
        user={user}
        id={activeId}
        setId={setActiveId}
        styles={styles}
      />
    );
  }
}

const DesktopView = ({
  user,
  id,
  setId,
  styles,
}: {
  user: any;
  id: string;
  setId: any;
  styles: {
    base: any;
    chat: any;
    menu: any;
  };
}) => {
  return (
    <Grid
      h={"100vh"}
      w={"full"}
      templateColumns={"repeat(10, 1fr)"}
      bg={styles.base.bg}
    >
      <GridItem
        colSpan={{
          base: 10,
          sm: 4,
          md: 2,
        }}
        bg={styles.menu.bg}
        color={styles.menu.color}
        overflowY={"hidden"}
        borderRight={"1px"}
        borderColor={styles.menu.border}
      >
        <Topbar logo={logo} title={"Croissant Chat"} />
        <Box overflowY={"scroll"} h={window.innerHeight - 100}>
          <Rooms setId={setId} />
          <Flex
            h={"100px"}
            align={"center"}
            justify={"center"}
            py={8}
            my={"50px"}
            direction={"column"}
          >
            <Text fontSize={"xs"}>You have reached the end</Text>
            <Text fontSize={"sm"}>Here is a croissant 🥐</Text>
          </Flex>
        </Box>
        <Bottombar emoji={user.avatar.emoji} emojiBg={user.avatar.bg} />
      </GridItem>
      <GridItem
        colSpan={{
          base: 10,
          sm: 6,
          md: 8,
        }}
        bg={styles.chat.bg}
        color={styles.chat.color}
        overflowY={"hidden"}
      >
        {id && id !== "introduction" ? <Chatbox id={id} /> : <Introduction />}
      </GridItem>
    </Grid>
  );
};

const MobileView = ({
  user,
  id,
  setId,
  styles,
}: {
  user: any;
  id: string;
  setId: (id: string) => void;
  styles: {
    base: any;
    chat: any;
    menu: any;
  };
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: true,
  });

  useEffect(() => {
    if (id) {
      onOpen();
    } else {
      onClose();
    }
  }, [id]);

  useEffect(() => {
    // intro last seen
    if (id === "introduction") {
      localStorage.setItem("introLastViewed", new Date().getTime().toString());
    }
  }, []);

  return (
    <Box bg={styles.base.bg}>
      <Topbar logo={logo} title={"Croissant Chat"} />
      <Box overflowY={"scroll"} h={window.innerHeight - 100}>
        <Rooms setId={setId} />
        <Flex
          pt={"200px"}
          align={"center"}
          justify={"center"}
          py={8}
          my={"50px"}
          direction={"column"}
        >
          <Text fontSize={"xs"}>You have reached the end</Text>
          <Text fontSize={"sm"}>Here is a croissant 🥐</Text>
        </Flex>
      </Box>
      <Bottombar emoji={user.avatar.emoji} emojiBg={user.avatar.bg} />
      <Drawer
        isOpen={isOpen}
        placement={id === "introduction" ? "top" : "right"}
        onClose={onClose}
        size={id === "introduction" ? "xs" : "full"}
      >
        <DrawerOverlay />
        <DrawerContent bg={styles.base.bg} color={styles.chat.color}>
          <DrawerBody>
            <IconButton
              onClick={() => setId("")}
              icon={<IoIosClose />}
              aria-label="Close"
              size={"sm"}
              variant={"ghost"}
            />
            {id && id !== "introduction" ? (
              <Chatbox id={id} />
            ) : (
              <Introduction />
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Chat;
