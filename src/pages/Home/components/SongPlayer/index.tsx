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
    if (audioRef.current) {
      if (song.status === "pause") {
        audioRef.current.pause();
        return;
      }

      if (song.status === "continue") {
        audioRef.current.play();
        return;
      }

      if (song.status === "stop") {
        setSongSrc("");
        audioRef.current.pause();

        setTimeout(() => {
          audioRef.current.load();
        }, 300);
        return;
      }

      if (song.status === "play" && song.position) {
        setSongSrc("");
        audioRef.current.load();

        setTimeout(() => {
          setSongSrc(`./assets/songs/${song.position}.mp4`);
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
        }, 300);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [song]);

  return (
    <Card>
      <Text fontSize="3xl" fontWeight="bold" color="black" textAlign="center">
        {song.status === "stop" && "Wait a moment... 🥚"}
        {(song.status === "play" || song.status === "continue") &&
          "Guess the song! 🐣	"}
        {song.status === "pause" && "Song paused! ⏳ "}
      </Text>

      <Box alignItems="center" display={"flex"} flexDir="column">
        <div>
          <audio controls={false} ref={audioRef}>
            <source src={songSrc} type="audio/mp3" />
          </audio>
        </div>
        <br />
        {song.status === "stop" ? null : song.status === "play" ||
          song.status === "continue" ? (
          <Button
            colorScheme="telegram"
            onClick={handleOnBell}
            fontSize="3xl"
            fontWeight="bold"
            padding="10"
          >
            Press The Bell 🔔
          </Button>
        ) : pushedBell ? (
          <Text fontSize="xl" width="full" textAlign="center">
            It's <strong>{pushedBell}</strong> time to shine !
          </Text>
        ) : null}
      </Box>
    </Card>
  );
};
export default SongPlayer;
