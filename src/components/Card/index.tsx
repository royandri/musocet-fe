import React from "react";
import { Container } from "@chakra-ui/react";

type CardProps = {
  children: React.ReactNode;
  size?: "md" | "sm" | "xl" | "lg";
  backgroundColor?: string;
};

const Card = ({
  children,
  size = "md",
  backgroundColor = "teal.100",
}: CardProps) => {
  return (
    <Container
      maxW={`container.${size}`}
      borderRadius="xl"
      border="4px"
      borderColor="black"
      backgroundColor={backgroundColor}
      padding="10"
    >
      {children}
    </Container>
  );
};

export default Card;
