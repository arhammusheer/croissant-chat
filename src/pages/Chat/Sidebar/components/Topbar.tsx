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
  return (
    <Flex alignItems={"center"} justifyContent={"space-between"} h={"full"} px={2}>
      <Link to={"/chat"}>
        <Avatar size={"sm"} src={logo} />
      </Link>
      <Heading size={"sm"}>{title}</Heading>
      <Spacer />
      <IconButton
        aria-label={"Settings"}
        icon={<Icon as={IoReloadOutline} />}
        onClick={reload}
      />
    </Flex>
  );
}

export default Topbar;
