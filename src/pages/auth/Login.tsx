/**
 * Login Page
 * @description This is the login page for the application
 * @author arhammusheer
 * @access public
 */

import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import logo from "../../assets/croissant.svg";

function Login() {
  return (
    <Flex
      h={"100vh"}
      w={"full"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack direction={"column"} align={"center"} gap={4} minW={"20rem"}>
        <Logo />
        <Flex direction={"column"} justifyContent={"center"} align={"center"}>
          <Heading as={"h1"}>Login to your account</Heading>
          <Text>Talk to your gang</Text>
        </Flex>
        <PhoneForm />
      </Stack>
    </Flex>
  );
}

const Logo = () => (
  <Box>
    <Image src={logo} alt="Croissant Chat" h={"64px"} w={"64px"} />
  </Box>
);

const PhoneForm = () => {
  const [email, setEmail] = useState("");

  return (
    <form style={{ width: "100%" }}>
      <Stack w={"full"}>
        <Input
          w={"full"}
          placeholder={"Enter your Email"}
          name={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type={"submit"} colorScheme={"orange"}>
          Continue with Email
        </Button>
      </Stack>
    </form>
  );
};

export default Login;
