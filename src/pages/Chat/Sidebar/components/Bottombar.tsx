/**
 * Bottombar component
 * @description Bottombar component for chat page
 * @author arhammusheer
 * @access authenticated
 */

import {
  Flex,
  Icon,
  IconButton,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

function Bottombar({ emoji, emojiBg }: { emoji: string; emojiBg: string }) {
  const styles = {
    color: useColorModeValue("gray.800", "white"),
    border: useColorModeValue("gray.200", "gray.800"),
  };

  return (
    <Flex
      w={"full"}
      h={"50px"}
      borderTop={"1px"}
      borderColor={styles.border}
      justifyContent={"space-between"}
      zIndex={1}
      padding={2}
      position={"static"}
      bottom={0}
    >
      <EmojiAvatar emoji={emoji} bg={emojiBg} size={30} />
      <ThemeSwitcher />
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

const ThemeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const style = {
    color: useColorModeValue("gray.400", "gray.600"),
    hover: useColorModeValue("gray.500", "gray.400"),
  };

  return (
    <IconButton
      aria-label="theme switcher"
      color={style.color}
      icon={
        colorMode === "light" ? (
          <Icon as={BsFillMoonFill} />
        ) : (
          <Icon as={BsFillSunFill} />
        )
      }
      size="sm"
      variant="ghost"
      _hover={{ color: style.hover }}
      onClick={toggleColorMode}
    />
  );
};

export default Bottombar;
