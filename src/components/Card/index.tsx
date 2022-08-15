import React from "react";
import { Container } from "@chakra-ui/react";

type CardProps = {
  children: React.ReactNode;
  size?: "md" | "sm" | "xl" | "lg";
  backgroundColor?: string;
  fullHeight?: boolean;
  height?: any;
};

const Card = ({
  children,
  size = "md",
  backgroundColor = "teal.100",
  fullHeight = false,
  height,
}: CardProps) => {
  return (
    <Container
      height={fullHeight ? "100vh" : height}
      maxW={`container.${size}`}
      borderRadius="xl"
      border="4px"
      borderColor="black"
      backgroundColor={backgroundColor}
      padding="10"
      overflowY="auto"
    >
      {children}
    </Container>
  );
};

export default Card;
