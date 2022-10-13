import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import _404Img from "../../assets/_404.jpg";

function _404() {
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const handleMouseMove = (e: MouseEvent) => {
    setCursorX(e.clientX);
    setCursorY(e.clientY);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, false);
    window.addEventListener("mouseenter", handleMouseMove, false);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseMove);
    };
  }, []);

  const boxRef = useRef<HTMLDivElement>(null);

  return (
    <Stack
      h={"100vh"}
      w={"full"}
      bg={`linear-gradient(rgba(0,0,0, 0.9), rgba(0,0,0, 0.9)), url(${_404Img})`}
      backgroundSize="100px"
      ref={boxRef}
      style={{ backgroundPositionX: cursorX, backgroundPositionY: cursorY }}
      alignItems="center"
      justifyContent="center"
    >
      <Box>
        <Heading as="h1" size={"4xl"}>
          404
        </Heading>
        <Text fontSize={"2xl"}>Oops. This page doesn't exist.</Text>
      </Box>
    </Stack>
  );
}

export default _404;
