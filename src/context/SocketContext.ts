import { createContext } from "react";
import { Socket } from "socket.io-client";

export type UserType = {
  socketId: string;
  userId: string;
  name: string;
  score: number;
};

export interface ISocketContextState {
  socket: Socket | undefined;
  users: UserType[];
  user: UserType;
  song: SongType;
  pushedBell: string;
}

export type SongType = {
  position: string;
  status: string;
};

export const defaultSocketContextState: ISocketContextState = {
  socket: undefined,
  users: [],
  user: {
    socketId: "",
    userId: "",
    name: "",
    score: 0,
  },
  song: {
    position: "",
    status: "",
  },
  pushedBell: "",
};

export type TSocketContextActions =
  | "update_socket"
  | "update_uid"
  | "update_users"
  | "remove_user"
  | "set_song"
  | "set_name"
  | "push_bell"
  | "set_score";
export type TSocketContextPayload = any;

export interface ISocketContextActions {
  type: TSocketContextActions;
  payload: TSocketContextPayload;
}

export const SocketReducer = (
  state: ISocketContextState,
  action: ISocketContextActions
) => {
  switch (action.type) {
    case "update_socket":
      return { ...state, socket: action.payload as Socket };
    case "update_uid":
      return {
        ...state,
        user: {
          ...state.user,
          userId: action.payload as string,
        },
      };
    case "update_users":
      return { ...state, users: action.payload as UserType[] };
    case "remove_user":
      return {
        ...state,
        users: state.users.filter(
          (user) => user.userId !== (action.payload as string)
        ),
      };
    case "set_song":
      return {
        ...state,
        song: JSON.parse(action.payload as string) as SongType,
      };
    case "set_name":
      return {
        ...state,
        users: action.payload.users,
        ...(state.user.userId === action.payload.userId && {
          user: {
            ...state.user,
            name: action.payload.name,
          },
        }),
      };
    case "push_bell":
      return {
        ...state,
        pushedBell:
          (action.payload.users as UserType[]).find(
            (user) => user.userId === action.payload.userId
          )?.name || "",
      };
    case "set_score":
      return {
        ...state,
        users: action.payload.users,
        ...(state.user.userId === action.payload.userId && {
          user: {
            ...state.user,
            score: action.payload.score,
          },
        }),
      };
    default:
      return state;
  }
};

export interface ISocketContextProps {
  SocketState: ISocketContextState;
  SocketDispatch: React.Dispatch<ISocketContextActions>;
}

const SocketContext = createContext<ISocketContextProps>({
  SocketState: defaultSocketContextState,
  SocketDispatch: () => {},
});

export const SocketContextConsumer = SocketContext.Consumer;
export const SocketContextProvider = SocketContext.Provider;

export default SocketContext;
