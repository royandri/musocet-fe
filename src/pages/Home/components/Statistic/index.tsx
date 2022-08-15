import SocketContext from "context/SocketContext";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { VStack, HStack, Box, Text, Avatar, Button } from "@chakra-ui/react";
import DialogWelcome from "pages/Home/components/DialogWelcome";
import Card from "components/Card";

const Statistic = () => {
  const { user } = useContext(SocketContext).SocketState;
  const [open, setOpen] = useState(false);

  const onToggle = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!user.name) {
      onToggle();
    }
  }, []);
  return (
    <>
      <Card>
        <VStack spacing={5} alignItems="start">
          <Text fontSize="2xl" fontWeight="extrabold" color="black">
            Your Stats 🤓 :
          </Text>
          <Box
            display="flex"
            justifyContent="space-between"
            width="full"
            alignItems="center"
          >
            <HStack spacing={4}>
              <Avatar name={user.name} src="https://bit.ly/broken-link" />
              <VStack alignItems="start" spacing="0.5">
                <Text fontSize="xl" fontWeight="bold" color="black">
                  {user.name}
                </Text>
                <Text fontSize="small" fontWeight="bold" color="black">
                  {user.userId}
                </Text>
              </VStack>
            </HStack>
            <Text fontSize="xl" fontWeight="extrabold" color="black">
              {user.score} point(s)
            </Text>
            <Button colorScheme="red" onClick={onToggle}>
              Change My Name
            </Button>
          </Box>
        </VStack>
      </Card>
      <Suspense>
        <DialogWelcome isOpen={open} onClose={onToggle} />
      </Suspense>
    </>
  );
};

export default Statistic;
