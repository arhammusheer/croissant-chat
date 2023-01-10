/**
 * Chat page
 * @description This is the chat entry point
 * @author arhammusheer
 * @access authenticated
 */

import logo from "../../assets/croissant.svg";

import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Grid,
  GridItem,
  Spacer,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { chatActions } from "../../redux/slices/chat.slice";
import { roomActions } from "../../redux/slices/rooms.slice";
import { AppDispatch, RootState } from "../../redux/store";
import Bottombar from "./Sidebar/components/Bottombar";
import Rooms from "./Sidebar/components/Rooms";
import Topbar from "./Sidebar/components/Topbar";
import Titlebox from "./Chatbox/Titlebox";
import SendMessage from "./Chatbox/SendMessage";

function Chat() {
  const user = useSelector((state: RootState) => state.user);
  const location = useSelector((state: RootState) => state.location);
  const dispatch = useDispatch<AppDispatch>();

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  const reloadRooms = () => {
    dispatch(
      roomActions.fetchRooms({
        latitude: location.coordinates.latitude,
        longitude: location.coordinates.longitude,
        radius: location.radius,
      })
    );
  };

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
  if (!user) {
    return <>LOADING</>;
  }
  if (isMobile) {
    return (
      <MobileView user={user.profile} styles={styles} reload={reloadRooms} />
    );
  } else {
    return (
      <DesktopView user={user.profile} styles={styles} reload={reloadRooms} />
    );
  }
}

const DesktopView = ({
  user,
  styles,
  reload,
}: {
  user: any;
  styles: {
    base: any;
    chat: any;
    menu: any;
  };
  reload: () => void;
}) => {
  return (
    <Grid
      h={"100dvh"}
      bg={styles.base.bg}
      templateAreas={`
        "sidetop topbar"
        "siderooms chat"
        "sidebottom message"
      `}
      templateColumns={"300px 1fr"}
      templateRows={"50px 1fr 50px"}
    >
      <GridItem gridArea="sidetop">
        <Topbar logo={logo} title={"Croissant Chat"} reload={reload} />
      </GridItem>
      <GridItem gridArea="siderooms" overflowY={"scroll"} p={2}>
        <Rooms />
      </GridItem>
      <GridItem gridArea="sidebottom">
        <Bottombar emoji={user.emoji} emojiBg={user.background} />
      </GridItem>

      <GridItem gridArea={"topbar"}>
        <Titlebox />
      </GridItem>
      <GridItem gridArea={"chat"} overflowY={"scroll"}>
        <Outlet />
      </GridItem>
      <GridItem gridArea={"message"} px={2} py={1}>
        <SendMessage />
      </GridItem>
    </Grid>
  );
};

const MobileView = ({
  user,
  styles,
  reload,
}: {
  user: any;
  styles: {
    base: any;
    chat: any;
    menu: any;
  };
  reload: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const { isOpen } = useSelector((state: RootState) => state.chat);

  const onClose = () => dispatch(chatActions.closeChat());
  const onOpen = () => dispatch(chatActions.openChat());

  return (
    <Stack h={"100dvh"} w={"full"} bg={styles.base.bg} overflowY={"hidden"}>
      <Topbar logo={logo} title={"Croissant Chat"} reload={reload} />
      <Box
        overflowY={"scroll"}
        h={{
          base: "calc(100dvh - 100px)",
        }}
      >
        <Rooms onClick={onOpen} />
      </Box>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="full">
        <DrawerOverlay>
          <DrawerContent bg={styles.menu.bg} color={styles.menu.color}>
            <DrawerBody paddingX={0}>
              <Outlet />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>

      <Spacer />
      <Bottombar emoji={user.emoji} emojiBg={user.background} />
    </Stack>
  );
};

export default Chat;
