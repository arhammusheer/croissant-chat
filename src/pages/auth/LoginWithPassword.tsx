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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux/slices/user.slice";

import logo from "../../assets/croissant.svg";
import { AppDispatch, RootState } from "../../redux/store";

function LoginWithPassword() {
  return (
    <Flex
      h={"100dvh"}
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
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Dispatch login action.
    // If successful, the user will be redirected to the chat page.
    dispatch(
      userActions.login({
        email: form.email,
        password: form.password,
      })
    );
  };

  return (
    <form style={{ width: "100%" }} onSubmit={onSubmit}>
      <Stack w={"full"} gap={2}>
        <Input
          w={"full"}
          placeholder={"Enter your Email"}
          name={"email"}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          type="email"
          required
        />
        <Input
          w={"full"}
          placeholder={"Password"}
          name={"password"}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          type="password"
          required
        />
        <Button type={"submit"} colorScheme={"orange"} isLoading={user.loading}>
          Login
        </Button>
        <Box w={"full"} mt={10} />
        {user.error && (
          <Alert status="error" borderRadius={"md"} variant={"subtle"}>
            <AlertIcon boxSize="30px" />
            <AlertTitle mr={2}>Error!</AlertTitle>
            <AlertDescription>{user.error}</AlertDescription>
          </Alert>
        )}
      </Stack>
    </form>
  );
};
