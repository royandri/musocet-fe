import React, { useContext, useMemo } from "react";
import Card from "components/Card";
import { VStack, HStack, Text, Avatar, Box } from "@chakra-ui/react";
import SocketContext from "context/SocketContext";

type LeaderboardProps = {
  fullHeight?: boolean;
};

const Leaderboard = ({ fullHeight = false }: LeaderboardProps) => {
  const { users } = useContext(SocketContext).SocketState;
  const sortedUser = useMemo(() => {
    return users.sort((a, b) => (a.score < b.score ? 1 : -1));
  }, [users]);
  return (
    <Card fullHeight={fullHeight}>
      <VStack spacing={5} alignItems="start">
        <Text fontSize="2xl" fontWeight="extrabold" color="black">
          Leaderboard
        </Text>
        {sortedUser.map((data) => (
          <Box
            key={data.userId}
            display="flex"
            justifyContent="space-between"
            width="full"
            alignItems="center"
            backgroundColor="purple.100"
            borderRadius="lg"
            border="4px"
            borderColor="black"
            padding="2.5"
          >
            <HStack spacing={4}>
              <Avatar name={data.name} src="https://bit.ly/broken-link" />
              <Text fontSize="xl" fontWeight="extrabold">
                {data.name}
              </Text>
            </HStack>
            <Text fontSize="xl" fontWeight="extrabold" marginRight="2.5">
              {data.score}
            </Text>
          </Box>
        ))}
      </VStack>
    </Card>
  );
};

export default Leaderboard;
