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
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Rooms from "./Sidebar/components/Rooms";
import Topbar from "./Sidebar/components/Topbar";
import Bottombar from "./Sidebar/components/Bottombar";
import { useEffect, useState } from "react";
import Chatbox from "./Chatbox/Chatbox";
import Introduction from "./Introduction";

function Chat() {
  const [activeId, setActiveId] = useState("");

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
        {id ? <Chatbox id={id} /> : <Introduction />}
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
    defaultIsOpen: false,
  });

  useEffect(() => {
    if (id) {
      onOpen();
    } else {
      onClose();
    }
  }, [id]);

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
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} size="full">
        <DrawerOverlay />
        <DrawerContent bg={styles.base.bg}>
          <DrawerBody>
            <Button onClick={() => setId("")}>Back</Button>
            <Chatbox id="Chatbox" />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Chat;
