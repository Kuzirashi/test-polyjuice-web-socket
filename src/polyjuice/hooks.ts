import { useEffect, useState } from 'react'
import { WebsocketProvider } from 'web3-providers-ws'

import { PolyjuiceWebsocketProvider } from "@polyjuice-provider/web3"
import { PolyjuiceWebsocketProvider as EthersPolyjuiceWebsocketProvider } from "@polyjuice-provider/ethers"
import config from "../godwoken.config.json"
import Web3 from 'web3'
import { providers } from 'ethers'

export const useWeb3 = (connectedAccountAddress: string | null) => {
    const [web3, setWeb3] = useState<Web3 | null>(null)

    const options = {
        timeout: 30000, // ms

        clientConfig: {
          // Useful if requests are large
          maxReceivedFrameSize: 100000000,   // bytes - default: 1MiB
          maxReceivedMessageSize: 100000000, // bytes - default: 8MiB
    
          // Useful to keep a connection alive
          keepalive: true,
          keepaliveInterval: 60000 // ms
        },
    
        // Enable auto reconnection
        reconnect: {
            auto: true,
            delay: 5000, // ms
            maxAttempts: 5,
            onTimeout: false
        }
    };

    useEffect(() => {
        if (connectedAccountAddress) {
            const provider = new PolyjuiceWebsocketProvider(
                config.nervos.godwoken.wsUrl, {
                rollupTypeHash: config.nervos.rollupTypeHash,
                ethAccountLockCodeHash: config.nervos.ethAccountLockCodeHash,
                web3Url: config.nervos.godwoken.rpcUrl
            }, options)

            const web3 = new Web3(provider as WebsocketProvider)
            setWeb3(web3)
        }
    }, [connectedAccountAddress])

    return web3
}

export const useEthers = (connectedAccountAddress: string | null) => {
    const [ethers, setEthers] = useState<providers.WebSocketProvider | null>(null)

    const options = {
        timeout: 30000, // ms

        clientConfig: {
          // Useful if requests are large
          maxReceivedFrameSize: 100000000,   // bytes - default: 1MiB
          maxReceivedMessageSize: 100000000, // bytes - default: 8MiB
    
          // Useful to keep a connection alive
          keepalive: true,
          keepaliveInterval: 60000 // ms
        },
    
        // Enable auto reconnection
        reconnect: {
            auto: true,
            delay: 5000, // ms
            maxAttempts: 5,
            onTimeout: false
        }
    };

    useEffect(() => {
        if (connectedAccountAddress) {
            const provider = new EthersPolyjuiceWebsocketProvider({
                rollupTypeHash: config.nervos.rollupTypeHash,
                ethAccountLockCodeHash: config.nervos.ethAccountLockCodeHash,
                web3Url: config.nervos.godwoken.rpcUrl
            }, config.nervos.godwoken.wsUrl)
            provider.on('block', () => console.log('block new'))
            const ethers = provider as providers.WebSocketProvider
            setEthers(ethers)
        }
    }, [connectedAccountAddress])

    return ethers
}