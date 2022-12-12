/**
 * Landing page
 * @description This is the main entry point for the application
 * @author arhammusheer
 * @access public
 */

import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import croissant from "../../assets/croissant.svg";
import Markdown from "./Markdown";

function Landing() {
  const styles = {
    bg: useColorModeValue("#ffac33", "black"),
    color: useColorModeValue("black", "#ffac33"),
  };

  return (
    <Box w={"100%"} h={"100vh"} bg={styles.bg} color={styles.color}>
      <Container maxW="container.xl" h={"100%"} maxH={"100vh"}>
        <Stack
          direction={"column"}
          h={"100%"}
          gap={4}
          p={{
            base: 4,
            md: 8,
          }}
        >
          <Header />
          <Main />
        </Stack>
      </Container>
      <Footer />
    </Box>
  );
}

const LoginButton = ({ text }: { text: string }) => {
  const styles = {
    bg: useColorModeValue("#ffac33", "black"),
    bgHover: useColorModeValue("black", "#ffac33"),

    color: useColorModeValue("black", "#ffac33"),
    colorHover: useColorModeValue("#ffac33", "black"),

    borderColor: useColorModeValue("black", "#ffac33"),
  };

  const MButton = motion(Button);
  return (
    <Link to="/login">
      <MButton
        color={styles.color}
        bg={styles.bg}
        size={"lg"}
        borderRadius={"full"}
        border={"1px"}
        borderColor={styles.borderColor}
        _hover={{
          bg: styles.bgHover,
          color: styles.colorHover,
        }}
        whileHover={{
          scale: 1.025,
          transition: { duration: 0.05 },
        }}
        whileTap={{
          scale: 0.95,
          transition: { duration: 0.05 },
        }}
      >
        {text}
      </MButton>
    </Link>
  );
};

const Header = () => {
  const isXs = useBreakpointValue({ base: true, md: false });
  return (
    <Stack
      direction={"row"}
      align={"center"}
      justify={{
        base: "center",
        md: "space-between",
      }}
    >
      {!isXs && <Box />}
      <Logo />
      {!isXs && <LoginButton text="Login" />}
    </Stack>
  );
};

const Main = () => {
  const styles = {
    bg: useColorModeValue("#ffac33", "black"),
    color: useColorModeValue("black", "#ffac33"),
  };

  return (
    <Stack w={"100%"} h={"100%"} align={"center"} justify={"center"}>
      <Heading as={"h1"} size={"3xl"} color={styles.color}>
        Welcome to Croissant Chat
      </Heading>
      <Heading
        as={"h2"}
        size={"lg"}
        color={styles.bg}
        bg={styles.color}
        p={2}
        borderRadius={"xl"}
      >
        Connect with your community anonymously
      </Heading>
      <Box h={"50px"} />
      <LoginButton text="Get Started" />
    </Stack>
  );
};

const Footer = () => {
  const privacy = useDisclosure();
  const terms = useDisclosure();

  const styles = {
    bg: useColorModeValue("white", "#ffac33"),
  };

  return (
    <Stack
      direction={"row"}
      align={"center"}
      justify={{
        base: "center",
        md: "space-between",
      }}
      bg={styles.bg}
      h={"auto"}
    >
      <Container maxW="container.xl" h={"100%"} py={12}>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(3, 1fr)",
          }}
          gap={4}
        >
          <GridItem
            colSpan={{
              base: 1,
              md: 2,
            }}
          >
            <Heading as={"h3"} size={"md"} color={"black"}>
              About
            </Heading>
            <Box h={"10px"} />
            <Text size={"sm"} color={"black"}>
              Croissant Chat is a community chat platform that allows users to
              connect with each other anonymously. It is a great way to meet new
              people and plan things without having to worry about your privacy.
              Please respect the community and do not use this platform to spam
              or harass others. You will be banned and lose access to your
              account.
            </Text>
          </GridItem>
          <GridItem colSpan={1}>
            <Heading as={"h3"} size={"md"} color={"black"}>
              Legal
            </Heading>
            <Box h={"10px"} />
            <Stack>
              <Text
                size={"sm"}
                color={"black"}
                onClick={privacy.onOpen}
                cursor={"pointer"}
              >
                Privacy Policy
              </Text>
              <DocumentationModal
                url="/privacy-policy.md"
                onClose={privacy.onClose}
                isOpen={privacy.isOpen}
              />
              <Text
                size={"sm"}
                color={"black"}
                onClick={terms.onOpen}
                cursor={"pointer"}
              >
                Terms of Service
              </Text>
              <DocumentationModal
                url="/terms-of-service.md"
                onClose={terms.onClose}
                isOpen={terms.isOpen}
              />
            </Stack>
          </GridItem>
        </Grid>
      </Container>
    </Stack>
  );
};

const Logo = () => {
  return (
    <Box position="relative" h="100px" w="100px">
      <Box
        bg={useColorModeValue("orange.100", "gray.600")}
        borderRadius="full"
        p={2}
        filter="blur(10px)"
        h="100px"
        w="100px"
        position="absolute"
        top={0}
        left={0}
      />{" "}
      <Image
        src={croissant}
        alt="logo"
        h="80px"
        w="80px"
        filter="blur(0px)"
        zIndex={1}
        m={"10px"}
      />
    </Box>
  );
};

const DocumentationModal = ({
  url,
  isOpen,
  onClose,
}: {
  url: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent bg={useColorModeValue("white", "black")}>
        <ModalCloseButton />
        <ModalBody>
          <Markdown url={url} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Landing;
