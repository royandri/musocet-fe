import React, { useContext, useState, useRef, useEffect } from "react";
import SocketContext from "./context/SocketContext";

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
  const { socket, user, users, song, pushedBell } =
    useContext(SocketContext).SocketState;
  const dispatch = useContext(SocketContext).SocketDispatch;
  const [name, setName] = useState("");
  const [songSrc, setSongSrc] = useState("");
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
  console.log("test");
  return (
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
  );
};

export default Application;
