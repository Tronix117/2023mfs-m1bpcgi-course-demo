import SocketIO from '../../components/SocketIO';
import TRpc from '../../components/TRpc';

export const HomePage: React.FC = () => {
  return (
    <div>
      <TRpc />
      <SocketIO />
    </div>
  );
};

export default HomePage;
