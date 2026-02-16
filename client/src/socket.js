import { io } from "socket.io-client";

const socket = io(`https://job-junction-dpvo.onrender.com`, {
  transports: ["websocket"],
  withCredentials: true,
});

export default socket;
