import { ChakraProvider, HStack, Box } from "@chakra-ui/react";
import * as React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  return (
    <HStack>
      <Box w="20px" h="20px" bg="tomato"></Box>
    </HStack>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
