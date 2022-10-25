/**
 * Login Page
 * @description This is the login page for the application
 * @author arhammusheer
 * @access public
 */

import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { BsApple } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import logo from "../../assets/croissant.svg";
import googleProvider from "../../firebase/auth/providers/google";
import { auth } from "../../main";

function Login() {
  return (
    <Flex
      h={"100vh"}
      w={"full"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack direction={"column"} align={"center"} gap={2} minW={"20rem"}>
        <Logo />
        <Flex direction={"column"} justifyContent={"center"} align={"center"}>
          <Heading as={"h1"}>Login to your account</Heading>
          <Text>Talk to your gang</Text>
        </Flex>
        <EmailForm />
        <DividerWithText
          color={useColorModeValue("gray.300", "gray.600")}
          text={"OR"}
        />
        <LoginWithApple />
        <LoginWithGoogle />
      </Stack>
    </Flex>
  );
}

const Logo = () => (
  <Box>
    <Image src={logo} alt="Croissant Chat" h={"64px"} w={"64px"} />
  </Box>
);

const EmailForm = () => {
  const [email, setEmail] = useState("");

  return (
    <form style={{ width: "100%" }}>
      <Stack w={"full"} gap={2}>
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

const LoginWithGoogle = () => {
  const styles = {
    button: {
      border: useColorModeValue("gray.300", "gray.600"),
    },
  };

  const onclick = async () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <Button
      w={"full"}
      border={"1px"}
      borderColor={styles.button.border}
      colorScheme={"gray"}
      leftIcon={<FcGoogle />}
      onClick={onclick}
    >
      Continue with Google
    </Button>
  );
};

const LoginWithApple = () => {
  const styles = {
    button: {
      border: useColorModeValue("gray.300", "gray.600"),
    },
  };

  return (
    <Button
      w={"full"}
      border={"1px"}
      borderColor={styles.button.border}
      colorScheme={"gray"}
      leftIcon={<BsApple />}
    >
      Continue with Apple
    </Button>
  );
};

const DividerWithText = ({
  text = "or",
  color,
}: {
  text?: string;
  color?: string;
}): JSX.Element => (
  <Stack direction={"row"} align={"center"} w={"full"}>
    <Divider color={color} />
    <Text color={color}>{text}</Text>
    <Divider color={color} />
  </Stack>
);

export default Login;
