import React from "react";
import { VStack } from "@chakra-ui/react";
import Leaderboard from "pages/Home/components/Leaderboard";
import SongPlayer from "pages/Home/components/SongPlayer";
import Statistic from "pages/Home/components/Statistic";

export interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  return (
    <VStack width="full" padding="20" spacing="10">
      <SongPlayer />
      <Statistic />
      <Leaderboard />
    </VStack>
  );
};

export default Home;
