import { WalletContextProvider } from './components/WalletContextProvider';
import { Flams } from './components/Flams';

function App() {
  return (
    <WalletContextProvider>
      <Flams />
    </WalletContextProvider>
  );
}

export default App; 