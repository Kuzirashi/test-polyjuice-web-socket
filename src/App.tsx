import React from 'react'
import { AddressTranslator } from 'nervos-godwoken-integration';

import { listenBlocks } from './contracts/hooks';

import { ConnectButton } from './metamask/containers/ConnectButton'
import { InputField } from './components/InputField'
import { useEthers, useWeb3 } from './polyjuice/hooks'

import Web3 from 'web3'
import { useERC20Contract } from './contracts/hooks'

const addressTranslator = new AddressTranslator();

const App: React.FC = () => {
  const [connectedAccountAddress, setConnectedAccountAddress] = React.useState<string | null>(null);
  const [blockNumber, setBlockNumber] = React.useState<number | null>(null);
  const [latestTransactionHash, setLatestTransactionHash] = React.useState<string | null>(null)
  const [ckbBalance, setCkbBalance] = React.useState<BigInt | null>(null);
  const [tokenBalance, setTokenBalance] = React.useState<BigInt | null>(null);
  const [decimals, setDecimals] = React.useState<number | null>(null);
  const [transferValue, setTransferValue] = React.useState<number>(0)
  const [depositAddress, setDepositAddress] = React.useState<string | null>(null)

  const web3 = useWeb3(connectedAccountAddress)
  const ethers = useEthers(connectedAccountAddress)

  const wCKBAddress = '0x0815b0d4e58c8e707a85e774c37cab65480f66e9'
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

  const deposit = async () => {
    console.log('deposit')
    if (decimals) {
      const weiTransferValue = Web3.utils.toBN(transferValue).mul(Web3.utils.toBN(10).pow(Web3.utils.toBN(decimals)))
      console.log('deposit amount', weiTransferValue.toString())
      const transactionHash = await erc20?.methods.deposit().send({ from: connectedAccountAddress, value: weiTransferValue })
      console.log('transaction hash', transactionHash)
      setLatestTransactionHash(transactionHash)

      const balance = await erc20?.methods
        .balanceOf(connectedAccountAddress)
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
        .balanceOf(connectedAccountAddress)
        .call()

      const decimals = await erc20?.methods.decimals().call()
      console.log('balance', balance)
      console.log('decimals', decimals)

      setTokenBalance(balance)
      setDecimals(Web3.utils.toNumber(decimals))
    }
    console.log('erc20', erc20)

    if (erc20) {
      console.log('get balance')
      listenBalance()
    }
  }, [erc20])

  React.useEffect(() => {
    async function fetchCkbBalance() {
      console.log();
      if (ethers && connectedAccountAddress) {
        const ckbBalance = await ethers?.getBalance(connectedAccountAddress);
        console.log('fetchCkbBalance', ckbBalance);
        setCkbBalance(ckbBalance.toBigInt());
        await addressTranslator.init();
        const newDepositAddress = await addressTranslator.getLayer2DepositAddress(connectedAccountAddress);
        setDepositAddress(newDepositAddress.toCKBAddress().toString());
      }
    }

    fetchCkbBalance();
  }, [connectedAccountAddress, ethers]);
  
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
        .balanceOf(connectedAccountAddress)
        .call()

      const decimals = await erc20?.methods.decimals().call()
      console.log('balance', balance)
      console.log('decimals', decimals)

      setTokenBalance(balance)
      setDecimals(Web3.utils.toNumber(decimals))
    }

    if (blockNumber) {
      listenBalance()
    }
  }, [blockNumber])
  // listenBlocks(web3)

  return (<>
    <div style={{ display: 'flex'}}>
      
      <div style={{ display: 'flex', flexDirection: 'column'}}>
      <h1>Wrapped CKB on Godwoken Testnet</h1>
      <br/><br/>

        <ConnectButton
          onConnect={
            (connectedAccountAddress) => {
              console.log('on connect')
              setConnectedAccountAddress(connectedAccountAddress)
            }
          }
        />
        <br/>
        <div>
          Account: {connectedAccountAddress ? connectedAccountAddress : undefined}
        </div>
        <div style={{ marginTop: 16, marginBottom: 16 }}>
          Godwoken Testnet balances:
          <div style={{ marginBottom: 8, marginTop: 8 }}>CKB Balance: {ckbBalance?.toString()} Shannons</div>
          <div style={{ marginBottom: 8 }}>wCKB Balance: {tokenBalance} Shannons</div>
          <InputField
            label="Deposit CKB to get wCKB"
            value={transferValue}
            onClick={deposit}
            onChange={(value) => setTransferValue(value)}
          />
          The above value is in CKB unit (not in Shannons). Refresh the page after sending transaction.
        </div>
      </div>
    </div>
    <br/>
    <br/>
    <div style={{ maxWidth: '60%', wordWrap: 'break-word' }}>
    Layer 2 deposit address: {depositAddress}
    <br/><br />
    You can paste above address in <a href="https://faucet.nervos.org/">https://faucet.nervos.org/</a> to get CKB on Layer 2.
    </div>
  </>
  );
}

export default App;
