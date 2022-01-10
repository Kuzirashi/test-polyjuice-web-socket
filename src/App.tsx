import React from 'react'
import { listenBlocks } from './contracts/hooks';

import { ConnectButton } from './metamask/containers/ConnectButton'
import { InputField } from './components/InputField'
import { useEthers, useWeb3 } from './polyjuice/hooks'

import Web3 from 'web3'
import { useERC20Contract } from './contracts/hooks'

const TRANSFER_ADDRESS = '0x80be658438074c9b615e6554f10c6fd5677f8ad3'

const App: React.FC = () => {
  const [connectedAccountAddress, setConnectedAccountAddress] = React.useState<string | null>(null);
  const [blockNumber, setBlockNumber] = React.useState<number | null>(null);
  const [latestTransactionHash, setLatestTransactionHash] = React.useState<string | null>(null)
  const [balance, setBalance] = React.useState<BigInt | null>(null);
  const [decimals, setDecimals] = React.useState<number | null>(null);
  const [transferValue, setTransferValue] = React.useState<number>(0)

  const web3 = useWeb3(connectedAccountAddress)
  const ethers = useEthers(connectedAccountAddress)

  const wCKBAddress = '0xc03da4356b4030f0ec2494c18dcfa426574e10d5'
  const polyConnectedAccountAddress = '0xeefd96eddcbc7971c48e0534fe1d2737f61679c7'
  const erc20 = useERC20Contract(wCKBAddress, web3)

  if (web3) {
    web3.eth
    .subscribe('newBlockHeaders', async (error, result) => {
        if (!error) {
          setBlockNumber(result.number)
        } else {
          console.error(error)
        }
    })
  }

  if (ethers) {
    console.log('ethers', ethers)
    ethers.on('block', (blockNumber: number) => {
      console.log('ethers New Block from ethers:', blockNumber)
    })
  }

  const transfer = async () => {
    console.log('transfer')
    if (decimals) {
      const weiTransferValue = Web3.utils.toBN(transferValue).mul(Web3.utils.toBN(10).pow(Web3.utils.toBN(decimals)))
      console.log('transfer amount', weiTransferValue.toString())
      const transactionHash = await erc20?.methods.transfer(TRANSFER_ADDRESS, weiTransferValue).send({ from: connectedAccountAddress })
      console.log('transaction hash', transactionHash)
      setLatestTransactionHash(transactionHash)

      const balance = await erc20?.methods
        .balanceOf(polyConnectedAccountAddress)
        .call()
      console.log('balance', balance)
    }
  }

  React.useEffect(() => {
    async function getBlockNumber() {
      if(web3) {
        const blockNumber = await web3.eth.getBlockNumber()

        setBlockNumber(blockNumber)
      }
    }

    getBlockNumber()
  }, [web3])

  React.useEffect(() => {
    async function listenBalance() {
      console.log('erc20', erc20?.options.address)
      const balance = await erc20?.methods
        .balanceOf(polyConnectedAccountAddress)
        .call()

      const decimals = await erc20?.methods.decimals().call()
      console.log('balance', balance)
      console.log('decimals', decimals)

      setBalance(balance)
      setDecimals(Web3.utils.toNumber(decimals))
    }
    console.log('erc20', erc20)

    if (erc20) {
      console.log('get balance')
      listenBalance()
    }
  }, [erc20])
  
  // React.useEffect(() => {
  //   async function listenBalance() {
  //     console.log('erc20', erc20?.options.address)
  //     const balance = await erc20?.methods
  //       .balanceOf(polyConnectedAccountAddress)
  //       .call()

  //     const decimals = await erc20?.methods.decimals().call()
  //     console.log('balance', balance)
  //     console.log('decimals', decimals)

  //     setBalance(balance)
  //     setDecimals(Web3.utils.toNumber(decimals))
  //   }
  //   console.log('erc20', erc20)

  //   if (latestTransactionHash) {
  //     console.log('get balance')
  //     listenBalance()
  //   }
  // }, [latestTransactionHash])

  React.useEffect(() => {
    async function listenBalance() {
      console.log('erc20', erc20?.options.address)
      const balance = await erc20?.methods
        .balanceOf(polyConnectedAccountAddress)
        .call()

      const decimals = await erc20?.methods.decimals().call()
      console.log('balance', balance)
      console.log('decimals', decimals)

      setBalance(balance)
      setDecimals(Web3.utils.toNumber(decimals))
    }

    if (blockNumber) {
      listenBalance()
    }
  }, [blockNumber])
  // listenBlocks(web3)

  return (
    <div style={{ display: 'flex'}}>
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        <ConnectButton
          onConnect={
            (connectedAccountAddress) => {
              console.log('on connect')
              setConnectedAccountAddress(connectedAccountAddress)
            }
          }
        />
        <div>
          {connectedAccountAddress ? connectedAccountAddress : undefined}
        </div>
        <div>
          block number: {blockNumber}
        </div>
        <div style={{ marginTop: 16, marginBottom: 16 }}>
          <div style={{ marginBottom: 8 }}>balance: {balance}</div>
          <InputField
            label="Transfer"
            value={transferValue}
            onClick={transfer}
            onChange={(value) => setTransferValue(value)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
