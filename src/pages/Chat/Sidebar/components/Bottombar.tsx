/**
 * Bottombar component
 * @description Bottombar component for chat page
 * @author arhammusheer
 * @access authenticated
 */

import {
  Container,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spacer,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  BsFillMoonFill,
  BsFillPersonFill,
  BsFillSunFill,
} from "react-icons/bs";
import { IoMdLogOut, IoMdSettings } from "react-icons/io";
import { useDispatch } from "react-redux";
import { userActions } from "../../../../redux/slices/user.slice";
import { AppDispatch } from "../../../../redux/store";
import SettingsPopUp from "../../../Settings/Settings";
import StartNew from "./StartNew";

function Bottombar({ emoji, emojiBg }: { emoji: string; emojiBg: string }) {
  const styles = {
    color: useColorModeValue("gray.800", "white"),
    border: useColorModeValue("gray.200", "gray.800"),
  };

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} h={"full"}>
      <AccountMenu>
        <EmojiAvatar emoji={emoji} bg={emojiBg} size={30} />
      </AccountMenu>
      <Spacer />
      <StartNew />
      <ThemeSwitcher />
    </Flex>
  );
}

const AccountMenu = ({ children }: { children: React.ReactNode }) => {
  const styles = {
    bg: useColorModeValue("gray.50", "black"),
    color: useColorModeValue("gray.800", "white"),
    border: useColorModeValue("gray.200", "gray.800"),
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch<AppDispatch>();

  const changeEmoji = () => {
    dispatch(userActions.randomizeEmoji());
  };

  const logout = () => {
    dispatch(userActions.logout());
  };

  return (
    <>
      <Menu isLazy>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={children}
          borderRadius="full"
        />
        <MenuList
          bg={styles.bg}
          color={styles.color}
          borderColor={styles.border}
        >
          <MenuItem icon={<Icon as={BsFillMoonFill} />} onClick={changeEmoji}>
            Change Emoji
          </MenuItem>
          {/* <MenuItem icon={<Icon as={BsFillPersonFill} />}>Account</MenuItem> */}
          <MenuItem icon={<Icon as={IoMdSettings} />} onClick={onOpen}>
            Settings
          </MenuItem>
          <MenuItem icon={<Icon as={IoMdLogOut} />} onClick={logout}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
      <SettingsModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

const SettingsModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const styles = {
    bg: useColorModeValue("gray.50", "black"),
    color: useColorModeValue("gray.800", "white"),
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
      <ModalOverlay />
      <ModalContent bg={styles.bg} color={styles.color}>
        <Container maxW={"container.lg"}>
          <ModalBody>
            <SettingsPopUp onClose={onClose} />
          </ModalBody>
        </Container>
      </ModalContent>
    </Modal>
  );
};

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
