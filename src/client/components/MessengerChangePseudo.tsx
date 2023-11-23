import { useState } from 'react';

import useSocket from '../useSocket';

export const MessengerChangePseudo: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  const { socket } = useSocket();

  /**
   *
   */
  function changePseudo() {
    socket.emit('setPseudo', inputValue);
  }

  return (
    <>
      <h4>Change pseudo</h4>
      <input
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.currentTarget.value)}
      />
      <button onClick={() => changePseudo()}>ChangePseudo</button>
    </>
  );
};

export default MessengerChangePseudo;
