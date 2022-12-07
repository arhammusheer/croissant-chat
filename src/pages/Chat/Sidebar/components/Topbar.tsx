/**
 * Component: Topbar
 * Description: Topbar component for chat page
 * @author arhammusheer
 * @access authenticated
 * @param {string} logo - Logo SVG
 * @param {string} title - Title of the page
 */

import {
  Avatar,
  Flex,
  Heading,
  Icon,
  IconButton,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoReloadOutline } from "react-icons/io5";

function Topbar({
  logo,
  title,
  reload,
}: {
  logo: string;
  title: string;
  reload: () => void;
}) {
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
      <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
        <Link to={"/chat"}>
          <Avatar size={"sm"} src={logo} />
        </Link>
        <Heading size={"sm"} ml={2}>
          {title}
        </Heading>
        <Spacer />
        <IconButton
          aria-label={"Settings"}
          icon={<Icon as={IoReloadOutline} />}
          onClick={reload}
        />
      </Flex>
    </Flex>
  );
}

export default Topbar;
