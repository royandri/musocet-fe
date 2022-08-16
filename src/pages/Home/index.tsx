import React from "react";
import { Box, Container, Flex, Grid, GridItem, VStack } from "@chakra-ui/react";
import Leaderboard from "pages/Home/components/Leaderboard";
import SongPlayer from "pages/Home/components/SongPlayer";
import Statistic from "pages/Home/components/Statistic";

export interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  return (
    <Container maxW="container.xl" height="100vh" maxHeight="100vh">
      <Flex
        color="white"
        height="100vh"
        paddingTop="10"
        paddingBottom="10"
        gap={5}
      >
        <Box flex="5">
          <Leaderboard height="full" />
        </Box>
        <Box flex="7" maxH="full">
          <VStack width="full" maxHeight="full" spacing="5">
            <SongPlayer />
            <Statistic />
          </VStack>
        </Box>
      </Flex>
    </Container>
  );
};

export default Home;
