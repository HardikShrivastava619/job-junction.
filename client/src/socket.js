import { io } from "socket.io-client";

const socket = io(`http://localhost:1800`, {
  transports: ["websocket"],
  withCredentials: true,
});

export default socket;
