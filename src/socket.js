import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
// const URL =
//     process.env.NODE_ENV === "production"
//         ? "https://fast-chat-backend.onrender.com"
//         : "http://localhost:6900";
const URL =
    process.env.NODE_ENV === "production"
        ? "https://fast-chat-backend.onrender.com"
        : "https://fast-chat-backend.onrender.com";
export const socket = io(URL);
export default socket;
