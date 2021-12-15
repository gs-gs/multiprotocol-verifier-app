import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@chakra-ui/theme";

import * as React from "react";
import { hot } from "react-hot-loader";

import { Main } from "./pages/main";

class App extends React.Component<Record<string, unknown>, undefined> {
  public render() {
    return (
      <ChakraProvider theme={theme}>
        <Main />
      </ChakraProvider>
    );
  }
}

declare let module: Record<string, unknown>;

export default hot(module)(App);
