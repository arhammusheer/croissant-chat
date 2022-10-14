/**
 * Chat page
 * @description This is the chat entry point
 * @author arhammusheer
 * @access authenticated
 */

import logo from "../../assets/croissant.svg";

import {
  Box,
  Grid,
  GridItem,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import { Outlet, useLoaderData } from "react-router-dom";
import Bottombar from "./Sidebar/components/Bottombar";
import Rooms from "./Sidebar/components/Rooms";
import Topbar from "./Sidebar/components/Topbar";

function Chat() {
  const user = useLoaderData();

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

  const styles = {
    base: baseStyles,
    menu: menuStyles,
    chat: chatStyles,
  };

  return <DesktopView user={user} styles={styles} />;
}

const DesktopView = ({
  user,
  styles,
}: {
  user: any;
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
        <Box
          overflowY={"scroll"}
          h={{
            base: "calc(100vh - 100px)",
          }}
        >
          <Rooms />
        </Box>
        <Spacer />
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
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default Chat;
