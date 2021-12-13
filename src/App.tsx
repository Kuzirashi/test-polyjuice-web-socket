import React from 'react'
import { listenBlocks } from './contracts/hooks';

import { ConnectButton } from './metamask/containers/ConnectButton'
import { useWeb3 } from './polyjuice/hooks'

const App: React.FC = () => {
  const [connectedAccountAddress, setConnectedAccountAddress] = React.useState<string | null>(null);

  const web3 = useWeb3(connectedAccountAddress)

  listenBlocks(web3)

  return (
    <div>
      <ConnectButton
        onConnect={
          (connectedAccountAddress) => {
            console.log('on connect')
            setConnectedAccountAddress(connectedAccountAddress)
          }
        }
      />
    </div>
  );
}

export default App;
