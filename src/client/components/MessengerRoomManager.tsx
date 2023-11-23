/* eslint-disable promise/always-return */
import { useEffect, useState } from 'react';

import { type ServerToClientEvents } from '../../server/socketio';
import useSocket from '../useSocket';

export const MessengerRoomManager: React.FC = () => {
  const { socket } = useSocket();
  const [roomList, setRoomList] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    /**
     *
     */
    const onRoomAdded: ServerToClientEvents['roomAdded'] = (room) => {
      setRoomList((previousRoom) => [...previousRoom, room]);
    };

    socket.on('roomAdded', onRoomAdded);

    socket
      .emitWithAck('getRooms')
      .then((rooms) => {
        setRoomList(rooms);
      })
      .catch((error) => {
        console.log('err', error);
      });

    return () => {
      socket.off('roomAdded', onRoomAdded);
    };
  }, [socket]);

  /**
   *
   */
  function changeRoom(roomName: string) {
    socket.emit('changeActiveRoom', roomName);
  }

  return (
    <>
      <h4>Room selector</h4>
      {roomList.map((roomName) => (
        <button
          onClick={() => {
            changeRoom(roomName);
          }}
        >
          {roomName}
        </button>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.currentTarget.value)}
      />
      <button onClick={() => changeRoom(inputValue)}>Create room</button>
    </>
  );
};

export default MessengerRoomManager;
