/**
 * Bottombar component
 * @description Bottombar component for chat page
 * @author arhammusheer
 * @access authenticated
 */

import { Flex, useColorModeValue } from "@chakra-ui/react";

function Bottombar() {
  const styles = {
    bg: useColorModeValue("white", "gray.900"),
    color: useColorModeValue("gray.800", "white"),
    border: useColorModeValue("gray.200", "gray.800"),
  };

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      w={"full"}
      h={"50px"}
      borderTop={"1px"}
      borderColor={styles.border}
      zIndex={1}
      bg={styles.bg}
    >
      Bottombar
    </Flex>
  );
}

export default Bottombar;
