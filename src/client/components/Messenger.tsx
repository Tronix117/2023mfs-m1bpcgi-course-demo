/* eslint-disable promise/always-return */
import { useEffect, useState } from 'react';

import { type Message, type ServerToClientEvents } from '../../server/socketio';
import useSocket from '../useSocket';

import MessengerChangePseudo from './MessengerChangePseudo';
import MessengerRoomManager from './MessengerRoomManager';
import MesssengerMessage from './MesssengerMessage';

export const Messenger: React.FC = () => {
  const { socket } = useSocket();

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    /**
     *
     */
    const onMessageAdded: ServerToClientEvents['messageAdded'] = (message) => {
      setMessages((previousMessages) => [...previousMessages, message]);
    };

    socket.on('messageAdded', onMessageAdded);

    socket
      .emitWithAck('getMessageHistory')
      .then((messageHistory) => {
        setMessages(messageHistory);
      })
      .catch((error) => {
        console.log('err', error);
      });

    return () => {
      socket.off('messageAdded', onMessageAdded);
    };
  }, [socket]);

  const sendMessage = () => {
    socket.emit('createMessage', { text: inputValue });
    setInputValue('');
  };

  return (
    <div>
      <h3>Messenger</h3>
      <MessengerChangePseudo />
      <hr />
      <MessengerRoomManager />
      <hr />
      <h4>Messages</h4>
      <ul>
        {messages.map((message) => (
          <MesssengerMessage {...message} />
        ))}
      </ul>
      <input
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.currentTarget.value)}
      />
      <button onClick={() => sendMessage()}>Envoyer</button>
    </div>
  );
};

export default Messenger;
