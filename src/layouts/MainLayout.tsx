import { Box, Container, Heading } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";

export const MainLayout: React.FC<PropsWithChildren<unknown>> = (
  props: PropsWithChildren<unknown>,
) => {
  return (
    <Container>
      <Box my={2}>
        <Heading>Multi-Protocol Verifier</Heading>
      </Box>
      <Box my={2}>{props.children}</Box>
    </Container>
  );
};
