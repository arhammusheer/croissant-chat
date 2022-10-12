import { Flex, Text, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

function Titlebox() {
  const metadata = useLoaderData() as any;

  const styles = {
    bg: useColorModeValue("white", "black"),
    border: {
      color: useColorModeValue("gray.200", "gray.800"),
    },
  };

  return (
    <Flex
      w={"full"}
      h={"50px"}
      borderBottom={"1px"}
      borderColor={styles.border.color}
      bg={styles.bg}
      alignItems={"center"}
    >
      <Title text={metadata.name} />
    </Flex>
  );
}

const Title = ({ text }: { text: string }) => {
  const styles = {
    color: useColorModeValue("gray.800", "white"),
  };

  return (
    <Tooltip label={text} hasArrow>
      <Text
        fontWeight={"bold"}
        color={styles.color}
        padding={2}
        userSelect={"none"}
        textOverflow={"ellipsis"}
        noOfLines={1}
      >
        {text}
      </Text>
    </Tooltip>
  );
};

export default Titlebox;
