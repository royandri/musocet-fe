import React, { useState } from "react";
import {
  Flex,
  Box,
  HStack,
  PinInput,
  PinInputField,
  VStack,
} from "@chakra-ui/react";
import Card from "components/Card";

import Leaderboard from "pages/Home/components/Leaderboard";
import Controller from "pages/Admin/components/Controller";

export interface IAdminProps {}

const PIN = "20220817";

const Admin: React.FunctionComponent<IAdminProps> = (props) => {
  const [authorized, setAuthorized] = useState(false);
  const [message, setMessage] = useState("Please input your PIN Number!");

  const handleOnCompleteInputPIN = (pin: string) => {
    if (pin === PIN) {
      setMessage("Success!");
      setTimeout(() => {
        setAuthorized(true);
      }, 500);
    } else {
      setMessage("Incorrect PIN Number!");
    }
  };

  if (!authorized)
    return (
      <VStack width="full" padding="20" spacing="10" textAlign="center">
        <Card>
          <Flex>
            <Box flex="6">
              <HStack>
                <PinInput onComplete={handleOnCompleteInputPIN}>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
            </Box>
            <Box flex="6">
              <div style={{ marginTop: "7px" }}>{message}</div>
            </Box>
          </Flex>
        </Card>
      </VStack>
    );

  return (
    <Flex color="white" height="100vh">
      <Box flex="5">
        <Leaderboard fullHeight />
      </Box>
      <Box flex="7">
        <Controller />
      </Box>
    </Flex>
  );
};

export default Admin;
