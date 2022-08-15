import React from "react";
import { VStack } from "@chakra-ui/react";
import Leaderboard from "pages/Home/components/Leaderboard";
import SongPlayer from "pages/Home/components/SongPlayer";
import Statistic from "pages/Home/components/Statistic";

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
  return (
    <VStack width="full" padding="20" spacing="10">
      <SongPlayer />
      <Statistic />
      <Leaderboard />
    </VStack>
  );
};

export default Application;
