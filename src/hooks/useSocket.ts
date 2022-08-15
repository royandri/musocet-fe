import { useRef, useEffect } from "react";
import io, { ManagerOptions, SocketOptions, Socket } from "socket.io-client";

export const useSocket = (
  url: string,
  options: Partial<ManagerOptions & SocketOptions> | undefined
): Socket => {
  const { current: socket } = useRef(io(url, options));

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  return socket;
};
