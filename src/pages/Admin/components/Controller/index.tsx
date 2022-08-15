import React, { useContext, useState } from "react";
import {
  VStack,
  Button,
  Flex,
  Box,
  Text,
  Select,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import Card from "components/Card";
import SocketContext from "context/SocketContext";
import { APP_HOST } from "configs";

const Controller = () => {
  const { pushedBell, song, users } = useContext(SocketContext).SocketState;
  const [user, setUser] = useState({
    userId: "",
    score: 0,
  });

  const handleOnChangeStatus = async (status: string) => {
    try {
      if (status === "stop" || status === "continue" || status === "pause") {
        await fetch(`${APP_HOST}/control_song?status=${status}`, {
          method: "POST",
        });
      }

      if (status === "play") {
        let songPosition = "1";
        if (song.position !== "" && song.position !== "0") {
          songPosition = song.position;
        }
        await fetch(
          `${APP_HOST}/set_song?position=${songPosition}&status=play`,
          { method: "POST" }
        );
      }
    } catch {
      alert("Failed control song");
    }
  };

  const handleOnPrevOrNext = async (status: string) => {
    try {
      let songPosition = 1;
      if (song.position !== "" && song.position !== "0") {
        const existingPosition = parseInt(song.position);

        if (status === "next") {
          songPosition = existingPosition + 1;
        } else {
          songPosition = existingPosition - 1;
        }
      }

      await fetch(`${APP_HOST}/set_song?position=${songPosition}&status=play`, {
        method: "POST",
      });
    } catch {
      alert("Failed change song");
    }
  };

  const handleOnSetPoint = async () => {
    try {
      await fetch(
        `${APP_HOST}/set_score?userId=${user.userId}&score=${user.score}`,
        {
          method: "POST",
        }
      );
    } catch {
      alert("Failed set score");
    }
  };

  return (
    <Card fullHeight backgroundColor="pink">
      <Flex gap={4}>
        <Box flex="5">
          <Card backgroundColor="none" height="180px">
            <VStack spacing={2} alignItems="start">
              <Text fontSize="2xl" fontWeight="bold" color="black">
                SP: {song?.position ?? 0}
              </Text>
              <Text fontSize="2xl" fontWeight="bold" color="black">
                PB:{" "}
                {["continue", "play"].includes(song.status) ? "" : pushedBell}
              </Text>
            </VStack>
          </Card>
        </Box>
        <Box flex="7">
          <Card backgroundColor="none" height="180">
            <VStack spacing={2} alignItems="start">
              <Select
                borderColor="black"
                color="black"
                placeholder="Select user"
                _hover={{ borderColor: "black" }}
                value={user.userId}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, userId: e.target.value }))
                }
              >
                {users.map((u) => (
                  <option key={u.userId} value={u.userId}>
                    {u.name || u.userId}
                  </option>
                ))}
              </Select>
              <Flex gap={2}>
                <Box flex="6">
                  <NumberInput
                    value={user.score ?? 0}
                    onChange={(val) =>
                      setUser((prev) => ({
                        ...prev,
                        score: val !== "" ? parseInt(val) : 0,
                      }))
                    }
                  >
                    <NumberInputField
                      borderColor="black"
                      color="black"
                      _hover={{ borderColor: "black" }}
                    />
                  </NumberInput>
                </Box>
                <Box flex="6">
                  <Button
                    colorScheme="orange"
                    fontWeight="bold"
                    width="full"
                    onClick={handleOnSetPoint}
                    disabled={!user.userId}
                  >
                    Set Point
                  </Button>
                </Box>
              </Flex>
            </VStack>
          </Card>
        </Box>
      </Flex>

      <VStack width="full" padding="10" spacing="10">
        <Flex alignItems="baseline" justifyItems="center" gap={2}>
          <Box flex="3">
            <Button
              colorScheme="orange"
              fontSize="2xl"
              fontWeight="bold"
              padding="7"
              width="150px"
              height="30px"
              onClick={() => handleOnChangeStatus("stop")}
              disabled={song.status === "stop"}
            >
              STOP
            </Button>
          </Box>
          <Box flex="3">
            <Button
              colorScheme="orange"
              fontSize="3xl"
              fontWeight="bold"
              padding="10"
              width="180px"
              height="180px"
              borderRadius="50%"
              onClick={() =>
                handleOnChangeStatus(
                  song.status === "pause"
                    ? "continue"
                    : song.status === "stop"
                    ? "play"
                    : "pause"
                )
              }
            >
              {song.status === "stop" || song.status === "pause"
                ? "PLAY"
                : "PAUSE"}
            </Button>
          </Box>
          <Box flex="3">
            <Button
              colorScheme="orange"
              fontSize="2xl"
              fontWeight="bold"
              padding="7"
              width="150px"
              height="30px"
              disabled={!song.position || song.position === "1"}
              onClick={() => handleOnPrevOrNext("prev")}
            >
              PREV
            </Button>
          </Box>
          <Box flex="3">
            <Button
              colorScheme="orange"
              fontSize="2xl"
              fontWeight="bold"
              padding="7"
              width="150px"
              height="30px"
              disabled={!song.position || song.position === "0"}
              onClick={() => handleOnPrevOrNext("next")}
            >
              NEXT
            </Button>
          </Box>
        </Flex>
      </VStack>
    </Card>
  );
};

export default Controller;
