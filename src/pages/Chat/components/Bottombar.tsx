/**
 * Bottombar component
 * @description Bottombar component for chat page
 * @author arhammusheer
 * @access authenticated
 */

import { Avatar, Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";

function Bottombar({ emoji, emojiBg }: { emoji: string; emojiBg: string }) {
  const styles = {
    bg: useColorModeValue("white", "gray.900"),
    color: useColorModeValue("gray.800", "white"),
    border: useColorModeValue("gray.200", "gray.800"),
  };

  return (
    <Flex
      w={"full"}
      h={"50px"}
      borderTop={"1px"}
      borderColor={styles.border}
      zIndex={1}
      bg={styles.bg}
      padding={2}
    >
      <EmojiAvatar emoji={emoji} bg={emojiBg} size={30} />
    </Flex>
  );
}

const EmojiAvatar = ({
  size,
  emoji,
  bg,
}: {
  size: number;
  emoji: string;
  bg: string;
}) => {
  return (
    <Flex
      borderRadius={"full"}
      h={`${size}px`}
      w={`${size}px`}
      bg={bg}
      align={"center"}
      justify={"center"}
      userSelect={"none"}
    >
      <Text fontSize={`${(size * 2) / 3}px`}>{emoji}</Text>
    </Flex>
  );
};

export default Bottombar;
