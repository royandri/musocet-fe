import React from "react";
import { HStack, Text, Avatar, Box } from "@chakra-ui/react";
import { UserType } from "context/SocketContext";
import { Flipped, spring } from "react-flip-toolkit";
import shallowequal from "shallowequal";

type ScoreCardProps = {
  data: UserType;
};

const ScoreCard = ({ data }: ScoreCardProps) => {
  const flipId = `flip-${data.userId}`;
  const onElementAppear = (el: any, index: number) =>
    spring({
      onUpdate: (val) => {
        el.style.opacity = val;
      },
      delay: index * 50,
    });

  const onExit = (el: any, index: any, removeElement: any) => {
    spring({
      config: { overshootClamping: true },
      onUpdate: (val: any) => {
        el.style.transform = `scaleY(${1 - val})`;
      },
      delay: index * 50,
      onComplete: removeElement,
    });

    return () => {
      el.style.opacity = "";
      removeElement();
    };
  };
  const shouldFlip = (prev: any, current: any) => {
    return shallowequal(prev, current);
  };
  return (
    <Flipped
      flipId={flipId}
      key={flipId}
      onAppear={onElementAppear}
      shouldInvert={shouldFlip}
      stagger={true}
      onExit={onExit}
    >
      <Box
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
          <Text fontSize="xl" color="black" fontWeight="extrabold">
            {data.name}
          </Text>
        </HStack>
        <Text
          fontSize="xl"
          color="black"
          fontWeight="extrabold"
          marginRight="2.5"
        >
          {data.score}
        </Text>
      </Box>
    </Flipped>
  );
};

export default React.memo(ScoreCard);
