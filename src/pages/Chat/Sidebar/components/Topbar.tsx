/**
 * Component: Topbar
 * Description: Topbar component for chat page
 * @author arhammusheer
 * @access authenticated
 * @param {string} logo - Logo SVG
 * @param {string} title - Title of the page
 */

import { Avatar, Flex, Heading, useColorModeValue } from "@chakra-ui/react";

function Topbar({ logo, title }: { logo: string; title: string }) {
  const styles = {
    bg: useColorModeValue("white", "gray.900"),
    color: useColorModeValue("gray.800", "white"),
    border: useColorModeValue("gray.200", "gray.800"),
  };

  return (
    <Flex
      alignItems={"center"}
      padding={3}
      borderBottom={"1px"}
      borderColor={styles.border}
      zIndex={1}
      h={"50px"}
    >
      <Flex alignItems={"center"}>
        <Avatar size={"sm"} src={logo} />
        <Heading size={"sm"} ml={2}>
          {title}
        </Heading>
      </Flex>
    </Flex>
  );
}

export default Topbar;
