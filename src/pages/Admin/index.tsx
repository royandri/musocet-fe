import React from "react";
import { Flex, Text, Box } from "@chakra-ui/react";

import Leaderboard from "pages/Home/components/Leaderboard";
import Controller from "pages/Admin/components/Controller";

export interface IAdminProps {}

const Admin: React.FunctionComponent<IAdminProps> = (props) => {
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
