/**
 * Markdown.tsx
 * @description - Markdown component
 * @author arhammusheer
 * @access authenticated
 */

import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";

function Markdown({ url }: { url: string }) {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");

  const fetchContent = async () => {
    const response = await fetch(`${url}`);
    const text = await response.text();
    setContent(text);
    setLoading(false);
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const styles = {
    bg: useColorModeValue("white", "black"),
    color: useColorModeValue("gray.800", "white"),
  };

  return (
    <Box
      w={"full"}
      h={"full"}
      p={4}
      overflowY={"scroll"}
      overflowX={"hidden"}
      bg={styles.bg}
      color={styles.color}
    >
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <ReactMarkdown components={ChakraUIRenderer()} children={content} />
      )}
    </Box>
  );
}

export default Markdown;
