/**
 * Landing page
 * @description This is the main entry point for the application
 * @author arhammusheer
 * @access public
 */

import { Button, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <Flex
      h={"100vh"}
      w={"full"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Heading>🥐 Croissant Chat 🥐</Heading>
      <Button as={Link} to={"/login"}>
        Login
      </Button>
    </Flex>
  );
}

export default Landing;
