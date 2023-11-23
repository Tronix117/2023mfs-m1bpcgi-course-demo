import { type Server } from 'socket.io';

export interface Message {
  pseudo: string;
  text: string;
  createdAt: number;
}

export interface ServerToClientEvents {
  messageAdded: (message: Message) => void;
  participantList: () => void;
  participantJoined: () => void;
  participantLeft: () => void;
  roomAdded: (room: string) => void;
}

export interface ClientToServerEvents {
  changeActiveRoom: (room: string) => void;
  createMessage: (payload: { text: string }) => void;
  getMessageHistory: (callback: (messages: Message[]) => void) => void;
  getRooms: (callback: (rooms: string[]) => void) => void;
  setPseudo: (pseudo: string) => void;
}

export interface InterServerEvents {}

export interface SocketData {
  pseudo: string;
  activeRoom: string;
}

export type IoServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

const messagesByRoom: Record<string, Message[]> = {};

/**
 *
 */
export function handleSocketIo(io: IoServer) {
  io.on('connection', async (socket) => {
    console.log('nouvelle connection');

    socket.data.pseudo = `anonymous-${Math.floor(Math.random() * 1000)}`;
    await socket.join('general');
    socket.data.activeRoom = 'general';

    socket.on('createMessage', (payload) => {
      // verify payload with Zod

      const message: Message = {
        pseudo: socket.data.pseudo,
        text: payload.text,
        createdAt: Date.now(),
      };

      const roomName = socket.data.activeRoom ?? 'general';

      if (!messagesByRoom[roomName]) {
        messagesByRoom[roomName] = [];
      }
      messagesByRoom[roomName].push(message);

      io.to(roomName).emit('messageAdded', message);
    });

    socket.on('getMessageHistory', (callback) => {
      callback?.(messagesByRoom[socket.data.activeRoom] ?? []);
    });

    socket.on('getRooms', (callback) => {
      const roomList = Array.from(io.sockets.adapter.rooms.keys());
      callback?.(roomList);
    });

    socket.on('setPseudo', (pseudo) => {
      socket.data.pseudo = pseudo;
    });

    socket.on('changeActiveRoom', async (newRoom) => {
      const promises: (void | Promise<void>)[] = [];

      const rooms = io.sockets.adapter.rooms;
      if (!rooms.get(newRoom)) {
        io.emit('roomAdded', newRoom);
      }

      const previousRoom = socket.data.activeRoom;
      promises.push(socket.leave(previousRoom));

      socket.data.activeRoom = newRoom;
      promises.push(socket.join(newRoom));

      await Promise.all(promises);

      socket.broadcast.to(previousRoom).emit('participantLeft');
      socket.broadcast.to(newRoom).emit('participantJoined');
    });

    socket.on('disconnect', () => {
      console.log('socket disconnected');
    });
  });
}

export default handleSocketIo;
