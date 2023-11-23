import { useEffect, useState } from 'react';

import useSocket from '../useSocket';

import Messenger from './Messenger';

export const SocketIO: React.FC = () => {
  const { socket } = useSocket();

  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    /**
     *
     */
    function onConnect() {
      setIsConnected(true);
    }
    /**
     *
     */
    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    // La fonction de retour du useEffect sera exécutée lorsqu'on sortira du composant ou que le useEffect sera ré-exécuté si une dépendance change
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, [socket]);

  return (
    <div>
      <h2>SocketIO</h2>
      <p>{isConnected ? <Messenger /> : 'Disconnected'}</p>
    </div>
  );
};

export default SocketIO;
