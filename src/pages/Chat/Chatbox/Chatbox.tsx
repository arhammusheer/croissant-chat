/**
 * Chatbox
 * @description Chatbox component
 * @author arhammusheer
 * @access authenticated
 */

import { Box, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ChatHistory from "./ChatHistory";
import SendMessage from "./SendMessage";
import Titlebox from "./Titlebox";

function Chatbox() {
  const params = useParams<{ id: string }>();
  const { id } = params;

  return (
    <Stack direction={"column"} gap={0}>
      <Titlebox />
      <Box
        h={{
          base: "calc(100vh - 50px - 80px)",
        }}
      >
        <ChatHistory />
      </Box>
      <SendMessage />
    </Stack>
  );
}

export default Chatbox;
