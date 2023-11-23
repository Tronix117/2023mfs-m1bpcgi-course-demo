import { type Message } from '../../server/socketio';

type MessengerMessageProps = Message;

export const MessengerMessage: React.FC<MessengerMessageProps> = ({
  pseudo,
  createdAt,
  text,
}) => (
  <li>
    ({createdAt}) {pseudo} — {text}
  </li>
);

export default MessengerMessage;
