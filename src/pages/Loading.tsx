import { Image, Stack, useColorModeValue } from "@chakra-ui/react";
import croissant from "../assets/croissant.svg";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <Stack
      w={"full"}
      h={"100dvh"}
      alignItems={"center"}
      justifyContent={"center"}
      bg={useColorModeValue("white", "black")}
    >
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          duration: 0.75,
        }}
      >
        <Image src={croissant} h={"100px"} />
      </motion.div>
    </Stack>
  );
};

export default Loading;
