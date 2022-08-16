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
      maxH={fullHeight ? "100vh" : height}
      maxW={`container.${size}`}
      borderRadius="xl"
      border="4px"
      borderColor="black"
      backgroundColor={backgroundColor}
      padding="10"
      overflowY="auto"
      sx={{
        "&::-webkit-scrollbar": {
          width: "8px",
          borderRadius: "8px",
          backgroundColor: `rgba(0, 0, 0, 0.05)`,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#A0AEC0",
          borderRadius: "8px",
        },
      }}
    >
      {children}
    </Container>
  );
};

export default Card;
