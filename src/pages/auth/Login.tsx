/**
 * Login Page
 * @description This is the login page for the application
 * @author arhammusheer
 * @access public
 */

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BsApple } from "react-icons/bs";
import { useDispatch } from "react-redux";
import logo from "../../assets/croissant.svg";
import { userActions } from "../../redux/slices/user.slice";
import { AppDispatch } from "../../redux/store";
import { API, GOOGLE_CLIENT_ID } from "../../utils/defaults";

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
        {/* <LoginWithApple /> */}
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
  const [state, setState] = useState({
    email: "",
    loading: false,
    errorStatus: false,
    errorMessage: "",
  });

  const toast = useToast();

  const request = async (email: string) => {
    const response = await fetch(`${API}/auth/passwordless`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
  };

  const form = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState({ ...state, loading: true });

    if (state.email === "") {
      setState({
        ...state,
        loading: false,
        errorStatus: true,
        errorMessage: "Please enter your email",
      });
    }

    request(state.email).then(() => {
      setState({ ...state, loading: false });
      toast({
        title: "Email Sent",
        description: "Check your email for the magic link",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    });
  };

  return (
    <form style={{ width: "100%" }} onSubmit={form}>
      <Stack w={"full"} gap={2}>
        <Input
          w={"full"}
          placeholder={"Enter your Email"}
          name={"email"}
          value={state.email}
          onChange={(e) => setState({ ...state, email: e.target.value })}
          required
          type={"email"}
        />
        <Button type={"submit"} colorScheme={"orange"}>
          Continue with Email
        </Button>
        {state.errorStatus && (
          <Alert status="error" borderRadius={"md"}>
            <AlertIcon />
            <AlertTitle mr={2}>Error!</AlertTitle>
            <AlertDescription>{state.errorMessage}</AlertDescription>
          </Alert>
        )}
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
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const googleButtonRef = useRef<HTMLButtonElement>(null);

  const loadScript = (src: string) => {
    if (window && document) {
      const script = window.document.createElement("script");
      script.src = src;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        setIsScriptLoaded(true);
      };
    }
  };

  const initClient = () => {
    const google = window.google;

    if (!google) {
      return;
    }
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      login_uri: `${API}/auth/google`,
      callback: (response: any) => {
        if (response.credential) {
          dispatch(userActions.loginWithGoogle(response.credential));
        }
      },
    });

    google.accounts.id.prompt((notification: any) => {
      if (notification.isNotDisplayed()) {
        console.log("Prompt was not displayed");
      } else if (notification.isSkippedMoment()) {
        console.log("Prompt was skipped");
      }
    });

    if (googleButtonRef.current) {
      google.accounts.id.renderButton(googleButtonRef.current, {
        size: "large",
        width: googleButtonRef.current.clientWidth,
      });
    }
  };

  useEffect(() => {
    loadScript("https://accounts.google.com/gsi/client");
  }, []);

  useEffect(() => {
    if (isScriptLoaded) {
      initClient();
    }
  }, [isScriptLoaded]);

  return (
    <Button
      ref={googleButtonRef}
      w={"full"}
      p={0}
      className={"google-signin-button"}
      isLoading={!isScriptLoaded}
      loadingText={"Loading Google"}
    />
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
