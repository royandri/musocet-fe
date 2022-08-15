import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  Suspense,
} from "react";
import SocketContext from "./context/SocketContext";
import { useDisclosure } from "@chakra-ui/react";
import DialogWelcome from "pages/Home/components/DialogWelcome";
import { Text, VStack, Box, Avatar, Button, HStack } from "@chakra-ui/react";
import Card from "components/Card";

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
  const { socket, user, users, song, pushedBell } =
    useContext(SocketContext).SocketState;
  const dispatch = useContext(SocketContext).SocketDispatch;
  const [name, setName] = useState("");
  const [songSrc, setSongSrc] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const audioRef = useRef<any>();

  const handleOnChangeName = () => {
    if (socket) {
      socket.emit("set_name", {
        userId: user.userId,
        name: name,
      });
    }
  };

  const handleOnBell = () => {
    if (socket) {
      socket.emit("push_bell", { userId: user.userId });
    }
  };

  useEffect(() => {
    if (!user.name) {
      onOpen();
    }
  }, [user.name]);

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
    <VStack width="full" padding="20" spacing="10">
      <Card>
        <Text fontSize="3xl" fontWeight="bold" color="black" textAlign="center">
          {song.status === "play"
            ? "Guess the song! 🐣	"
            : "Wait a moment... 🥚"}
        </Text>
      </Card>
      <Card>
        <VStack spacing={5} alignItems="start">
          <Text fontSize="2xl" fontWeight="extrabold" color="black">
            Your Stats 🤓 :
          </Text>
          <Box
            display="flex"
            justifyContent="space-between"
            width="full"
            alignItems="center"
          >
            <HStack spacing={4}>
              <Avatar name={user.name} src="https://bit.ly/broken-link" />
              <Text fontSize="xl" fontWeight="bold" color="black">
                {user.name}
              </Text>
            </HStack>
            <Text fontSize="xl" fontWeight="extrabold" color="black">
              {user.score} point(s)
            </Text>
            <Button colorScheme="red" onClick={onOpen}>
              Change My Name
            </Button>
          </Box>
        </VStack>
      </Card>
      <div>
        <h2>Socket IO Information:</h2>
        <p>
          Your user ID: <strong>{user.userId}</strong>
          <br />
          Your user name: <strong>{user.name}</strong>
          <br />
          Users online: <strong>{users.length}</strong>
          <br />
          Socket ID: <strong>{socket?.id}</strong>
          <br />
          Song Position: <strong>{song.position}</strong>
          <br />
          Song Status: <strong>{song.status}</strong>
          <br />
        </p>
        <span>List User: </span>
        {users.map((user) => (
          <span key={user.userId}>{user.name}, </span>
        ))}
        <br />
        Masukan nama:
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <button onClick={handleOnChangeName}>Ganti Nama</button>
        <br />
        <div>
          <audio controls ref={audioRef}>
            <source src={songSrc} type="audio/mp3" />
          </audio>
        </div>
        <br />
        {pushedBell ? (
          <p>Pemencet Bell: {pushedBell}</p>
        ) : (
          <button onClick={handleOnBell}>Pencet Bell</button>
        )}
      </div>
      {!name && (
        <Suspense>
          <DialogWelcome isOpen={isOpen} onClose={onClose} />
        </Suspense>
      )}
    </VStack>
  );
};

export default Application;
