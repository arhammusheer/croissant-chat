import { Button, Image, Stack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import croissant from "../../assets/croissant.svg";
import { userActions } from "../../redux/slices/user.slice";
import { AppDispatch, RootState } from "../../redux/store";
import { Link } from "react-router-dom";

const PasswordlessCallback = () => {
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.user.error);
  const [searchParams] = useSearchParams();

  const handlePasswordless = async () => {
    const code = searchParams.get("code");

    if (!code || code === "") {
      return;
    }

    dispatch(
      userActions.passwordlessLogin({
        code: code || "",
      })
    );
  };

  const checkLogin = () => {
    dispatch(userActions.getProfile());
  };

  useMemo(() => {
    handlePasswordless().then(() => {
      checkLogin();
    });
  }, []);

  return (
    <Stack
      direction={"column"}
      align={"center"}
      justify={"center"}
      w={"full"}
      h={"100vh"}
    >
      <Image src={croissant} alt="Croissant Chat" h={"64px"} w={"64px"} />
      {error && (
        <>
          <Text>{error}</Text>
          <Button as={Link} to={"/login"}>
            Go back to Login
          </Button>
        </>
      )}
    </Stack>
  );
};

export default PasswordlessCallback;
