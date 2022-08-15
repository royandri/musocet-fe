import React, {
  PropsWithChildren,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useSocket } from "../hooks/useSocket";
import {
  defaultSocketContextState,
  SocketContextProvider,
  SocketReducer,
  UserType,
} from "./SocketContext";

import { SOCKET_HOST } from "../configs";

export interface ISocketContextComponentProps extends PropsWithChildren {}

const SocketContextComponent: React.FunctionComponent<
  ISocketContextComponentProps
> = (props) => {
  const { children } = props;
  const userId = localStorage.getItem("USER_ID") ?? '""';

  const socket = useSocket(SOCKET_HOST, {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: false,
    query: {
      userId: JSON.parse(userId),
    },
  });

  const [SocketState, SocketDispatch] = useReducer(
    SocketReducer,
    defaultSocketContextState
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    socket.connect();
    SocketDispatch({ type: "update_socket", payload: socket });
    StartListeners();
    SendHandshake();
    // eslint-disable-next-line
  }, []);

  const StartListeners = () => {
    /** Messages */
    socket.on("user_connected", (users: UserType[]) => {
      console.info("User connected message received");
      SocketDispatch({ type: "update_users", payload: users });
    });

    /** Messages */
    socket.on("user_disconnected", (uid: string) => {
      console.info("User disconnected message received", uid);
      SocketDispatch({ type: "remove_user", payload: uid });
    });

    /** Connection / reconnection listeners */
    socket.io.on("reconnect", (attempt) => {
      console.info("Reconnected on attempt: " + attempt);
      SendHandshake();
    });

    socket.io.on("reconnect_attempt", (attempt) => {
      console.info("Reconnection Attempt: " + attempt);
    });

    socket.io.on("reconnect_error", (error) => {
      console.info("Reconnection error: " + error);
    });

    socket.io.on("reconnect_failed", () => {
      alert(
        "We are unable to connect you to the chat service.  Please make sure your internet connection is stable or try again later."
      );
    });

    socket.on("user_setname", (data: { userId: string; users: UserType[] }) => {
      SocketDispatch({ type: "set_name", payload: data });
    });

    socket.on("set_song", (data: any) => {
      console.info("set_song", data);
      SocketDispatch({ type: "set_song", payload: data });
    });

    socket.on(
      "user_push_bell",
      (data: { userId: string; users: UserType[] }) => {
        console.log(data, "user_push_bell");
        SocketDispatch({ type: "push_bell", payload: data });
      }
    );

    socket.on("set_score", (data: any) => {
      console.info("set_score", data);
      SocketDispatch({ type: "set_score", payload: data });
    });
  };

  const SendHandshake = async () => {
    console.info("Sending handshake to server ...");

    socket.emit("handshake", async (uid: string, users: string[]) => {
      localStorage.setItem("USER_ID", JSON.stringify(uid));
      console.log(users, "users");
      SocketDispatch({ type: "update_users", payload: users });
      SocketDispatch({ type: "update_uid", payload: uid });
    });

    setLoading(false);
  };

  if (loading) return <p>... loading Socket IO ....</p>;

  return (
    <SocketContextProvider value={{ SocketState, SocketDispatch }}>
      {children}
    </SocketContextProvider>
  );
};

export default SocketContextComponent;
