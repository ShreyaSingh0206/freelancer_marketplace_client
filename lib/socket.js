// frontend/lib/socket.js
import { io } from "socket.io-client";

let socket = null;

export function getSocket() {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_API_URL, {
      withCredentials: true, // important - sends cookies for JWT auth
    });
  }
  return socket;
}
