import Card from "components/Card";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Text, Box, Button } from "@chakra-ui/react";
import SocketContext from "context/SocketContext";

const SongPlayer = () => {
  const { user, song, pushedBell, socket } =
    useContext(SocketContext).SocketState;
  const dispatch = useContext(SocketContext).SocketDispatch;
  const handleOnBell = () => {
    if (socket) {
      socket.emit("push_bell", { userId: user.userId });
    }
  };
  const [songSrc, setSongSrc] = useState("");
  const audioRef = useRef<any>();

  useEffect(() => {
    if (song.status === "stop") {
      if (audioRef.current) {
        setSongSrc("");
        audioRef.current.pause();

        setTimeout(() => {
          audioRef.current.load();
        }, 300);
      }
      return;
    }

    if (song.position) {
      setSongSrc("");
      audioRef.current.load();

      setTimeout(() => {
        if (audioRef.current) {
          setSongSrc(`./assets/songs/${song.position}.mp3`);
          audioRef.current.load();
          setTimeout(() => {
            audioRef.current.play();
            dispatch({
              type: "push_bell",
              payload: {
                users: [],
                userId: "",
              },
            });
          }, 300);
        }
      }, 300);
    }
  }, [song]);
  return (
    <Card>
      <Text fontSize="3xl" fontWeight="bold" color="black" textAlign="center">
        {song.status === "play" ? "Guess the song! 🐣	" : "Wait a moment... 🥚"}
      </Text>

      {song.status === "play" && (
        <Box alignItems="center" display="flex" flexDir="column">
          <div>
            <audio controls ref={audioRef}>
              <source src={songSrc} type="audio/mp3" />
            </audio>
          </div>
          <br />
          {pushedBell ? (
            <Text fontSize="xl" width="full" textAlign="center">
              It's <strong>{pushedBell}</strong> time to shine !
            </Text>
          ) : (
            <Button
              colorScheme="telegram"
              onClick={handleOnBell}
              fontSize="3xl"
              fontWeight="bold"
              padding="10"
            >
              Press The Bell 🔔
            </Button>
          )}
        </Box>
      )}
    </Card>
  );
};
export default SongPlayer;
