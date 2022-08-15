import React, { useContext, useMemo } from "react";
import Card from "components/Card";
import { VStack, Text } from "@chakra-ui/react";
import SocketContext from "context/SocketContext";
import { Flipper, Flipped } from "react-flip-toolkit";
import ScoreCard from "./components/ScoreCard";

type LeaderboardProps = {
  fullHeight?: boolean;
};

const Leaderboard = ({ fullHeight = false }: LeaderboardProps) => {
  const { users } = useContext(SocketContext).SocketState;
  const sortedUser = useMemo(() => {
    return users
      .filter((user) => user.name)
      .sort((a, b) => (a.score < b.score ? 1 : -1));
  }, [users]);
  return (
    <Card fullHeight={fullHeight}>
      <Flipper
        flipKey={`${JSON.stringify(
          sortedUser.map((user) => user.userId).join("-")
        )}`}
        spring="gentle"
        staggerConfig={{
          default: {
            reverse: true,
            speed: 1,
          },
        }}
        decisionData={{
          users: sortedUser,
        }}
      >
        <VStack spacing={5} alignItems="start">
          <Text fontSize="2xl" fontWeight="extrabold" color="black">
            Leaderboard
          </Text>

          {sortedUser.map((data) => {
            return <ScoreCard data={data} key={data.userId} />;
          })}
        </VStack>
      </Flipper>
    </Card>
  );
};

export default Leaderboard;
