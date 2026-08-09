import { io } from 'socket.io-client';

// Single socket instance shared across components
const socket = io('http://localhost:3000');

export default socket;
