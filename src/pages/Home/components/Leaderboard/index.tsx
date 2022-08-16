import React, { useContext, useMemo } from "react";
import Card from "components/Card";
import { VStack, Text } from "@chakra-ui/react";
import SocketContext from "context/SocketContext";
import { Flipper } from "react-flip-toolkit";
import ScoreCard from "./components/ScoreCard";

type LeaderboardProps = {
  fullHeight?: boolean;
  height?: string;
};

const Leaderboard = ({ fullHeight = false, height }: LeaderboardProps) => {
  const { users } = useContext(SocketContext).SocketState;
  const sortedUser = useMemo(() => {
    return users
      .filter((user) => user.name)
      .sort((a, b) => (a.score < b.score ? 1 : -1));
  }, [users]);
  return (
    <Card fullHeight={fullHeight} height={height}>
      <Text
        fontSize="2xl"
        fontWeight="extrabold"
        color="black"
        marginBottom={5}
      >
        Leaderboard
      </Text>
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
        className=""
      >
        <VStack spacing={5} alignItems="start" overflowY="auto" maxH="full">
          {sortedUser.map((data) => {
            return <ScoreCard data={data} key={data.userId} />;
          })}
        </VStack>
      </Flipper>
    </Card>
  );
};

export default Leaderboard;
