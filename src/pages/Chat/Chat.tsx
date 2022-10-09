/**
 * Chat page
 * @description This is the chat entry point
 * @author arhammusheer
 * @access authenticated
 */

import logo from "../../assets/croissant.svg";

import { Grid, GridItem, Text, useColorModeValue } from "@chakra-ui/react";
import Rooms from "./components/Rooms";
import Topbar from "./components/Topbar";
import Bottombar from "./components/Bottombar";

function Chat() {
  const menuStyles = {
    bg: useColorModeValue("white", "gray.900"),
    color: useColorModeValue("gray.800", "white"),
  };

  const chatStyles = {
    bg: useColorModeValue("gray.50", "gray.800"),
    color: useColorModeValue("gray.800", "white"),
  };

  return (
    <Grid h={"100vh"} w={"full"} templateColumns={"repeat(10, 1fr)"}>
      <GridItem
        colSpan={2}
        bg={menuStyles.bg}
        color={menuStyles.color}
        overflowY={"hidden"}
      >
        <Topbar logo={logo} title={"Croissant Chat"} />
        <Rooms />
        <Bottombar />
      </GridItem>
      <GridItem colSpan={8} bg={chatStyles.bg} color={chatStyles.color}>
        <Text>Chat</Text>
      </GridItem>
    </Grid>
  );
}

export default Chat;
