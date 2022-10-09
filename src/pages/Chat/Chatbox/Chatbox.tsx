/**
 * Chatbox
 * @description Chatbox component
 * @author arhammusheer
 * @access authenticated
 */

import { Box } from "@chakra-ui/react";

function Chatbox({ id }: { id: string }) {
  return (
    <Box p={4}>
      <h1>{id}</h1>
    </Box>
  );
}

export default Chatbox;
