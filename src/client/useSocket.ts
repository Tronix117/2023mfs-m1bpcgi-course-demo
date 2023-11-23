import { type Socket, io } from 'socket.io-client';

import {
  type ClientToServerEvents,
  type ServerToClientEvents,
} from '../server/socketio';

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

/**
 *
 */
export function useSocket() {
  return { socket };
}

export default useSocket;
