import React from "react";
import { Container } from "@chakra-ui/react";

type CardProps = {
  children: React.ReactNode;
};

const Card = ({ children }: CardProps) => {
  return (
    <Container
      maxW="container.md"
      borderRadius="xl"
      border="4px"
      borderColor="black"
      backgroundColor="teal.100"
      padding="10"
    >
      {children}
    </Container>
  );
};

export default Card;
