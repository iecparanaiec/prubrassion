// src/server/socket.js
import { Server as IOServer } from 'socket.io';

let io;
export function initIO(httpServer) {
  io = new IOServer(httpServer, { cors: { origin: '*' } });
  return io;
}
export function getIO() {
  if (!io) throw new Error('Socket.io no inicializado');
  return io;
}
