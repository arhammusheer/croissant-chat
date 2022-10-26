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
import { login_emailpassword } from "../../apis/auth";
import logo from "../../assets/croissant.svg";

function LoginWithPassword() {
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
          <Box w={"full"} mt={4} />
          <LoginForm />
        </Flex>
      </Stack>
    </Flex>
  );
}

export default LoginWithPassword;

const Logo = () => (
  <Box>
    <Image src={logo} alt="Croissant Chat" h={"64px"} w={"64px"} />
  </Box>
);

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await login_emailpassword(email, password)
      .then(() => setLoading(false))
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  return (
    <form style={{ width: "100%" }} onSubmit={onSubmit}>
      <Stack w={"full"} gap={2}>
        <Input
          w={"full"}
          placeholder={"Enter your Email"}
          name={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <Input
          w={"full"}
          placeholder={"Password"}
          name={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Button type={"submit"} colorScheme={"orange"}>
          Login
        </Button>
      </Stack>
    </form>
  );
};
