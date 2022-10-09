/**
 * Chat page
 * @description This is the chat entry point
 * @author arhammusheer
 * @access authenticated
 */

import logo from "../../assets/croissant.svg";

import { Box, Grid, GridItem, Text, useColorModeValue } from "@chakra-ui/react";
import Rooms from "./Sidebar/components/Rooms";
import Topbar from "./Sidebar/components/Topbar";
import Bottombar from "./Sidebar/components/Bottombar";
import { useState } from "react";
import Chatbox from "./Chatbox/Chatbox";

function Chat() {
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
  };

  const chatStyles = {
    bg: useColorModeValue("gray.50", "black"),
    color: useColorModeValue("gray.800", "white"),
  };

  const baseStyles = {
    bg: useColorModeValue("white", "black"),
  };

  return (
    <Grid
      h={"100vh"}
      w={"full"}
      templateColumns={"repeat(10, 1fr)"}
      bg={baseStyles.bg}
    >
      <GridItem
        colSpan={{
          base: 10,
          sm: 4,
          md: 2,
        }}
        bg={menuStyles.bg}
        color={menuStyles.color}
        overflowY={"hidden"}
        borderRight={"1px"}
        borderColor={menuStyles.border}
      >
        <Topbar logo={logo} title={"Croissant Chat"} />
        <Box overflowY={"scroll"} h={window.innerHeight - 100}>
          <Rooms />
        </Box>
        <Bottombar emoji={user.avatar.emoji} emojiBg={user.avatar.bg} />
      </GridItem>
      <GridItem
        colSpan={{
          base: 10,
          sm: 6,
          md: 8,
        }}
        bg={chatStyles.bg}
        color={chatStyles.color}
      >
        <Chatbox id={"test"} />
      </GridItem>
    </Grid>
  );
}

export default Chat;
