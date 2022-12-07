/**
 * Chatbox
 * @description Chatbox component
 * @author arhammusheer
 * @access authenticated
 */

import { Box, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { roomActions } from "../../../redux/slices/rooms.slice";
import { AppDispatch, RootState } from "../../../redux/store";
import ChatHistory from "./ChatHistory";
import SendMessage from "./SendMessage";
import Titlebox from "./Titlebox";

function Chatbox() {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const room = useSelector((state: RootState) =>
    state.rooms.rooms.find((room) => room.metadata?.id === id)
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!id) return;
    dispatch(
      roomActions.loadMessages({
        roomId: id,
      })
    );
  }, [dispatch, id]);

  return (
    <Stack direction={"column"} gap={0}>
      <Titlebox />
      <Box
        h={{
          base: "calc(100vh - 50px - 80px)",
        }}
      >
        <ChatHistory
          messages={room?.messages || []}
          isLoading={room?.isLoading || false}
        />
      </Box>
      <SendMessage />
    </Stack>
  );
}

export default Chatbox;
