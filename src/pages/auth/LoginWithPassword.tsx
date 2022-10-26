import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { login_emailpassword } from "../../apis/auth";
import logo from "../../assets/croissant.svg";
import { GlobalContext } from "../../main";

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

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const gctx = useContext(GlobalContext);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    login_emailpassword(email, password)
      .then((data) => {
        gctx.setUser(data.user);
        gctx.setToken(data.token);
      })
      .catch((e) => {
        console.log(e);
        setError(e.response ? e.response.data.message : e.message);
      })
      .finally(() => setLoading(false));
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
          required
        />
        <Input
          w={"full"}
          placeholder={"Password"}
          name={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />
        <Button type={"submit"} colorScheme={"orange"} isLoading={loading}>
          Login
        </Button>
        <Box w={"full"} mt={10} />
        {error && (
          <Alert status="error" borderRadius={"md"} variant={"subtle"}>
            <AlertIcon boxSize="30px" />
            <AlertTitle mr={2}>Error!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </Stack>
    </form>
  );
};
