import ERC20_JSON from './abi/ERC20.json'

import { useEffect, useState } from 'react'


import Web3 from 'web3';
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'

export const useERC20Contract = (erc20Address: string, web3: Web3 | null) => {
    const [erc20, setERC20] = useState<Contract | null>()

    useEffect(() => {
        if (web3) {
            const erc20 = new web3.eth.Contract(ERC20_JSON.abi as AbiItem[], '')

            setERC20(erc20)
        }
    }, [erc20Address, web3])

    return erc20
}

export const listenBlocks = (web3: Web3 | null) => {
    console.log('listen blocks')

    if (web3) {
        console.log('subscribe block')
        web3.eth
            .subscribe('newBlockHeaders', (error, result) => {
                if (!error) {
                    console.log(result)
                }
                console.error(error)
            })
            .on("connected", function(subscriptionId){
                console.log('connected', subscriptionId);
            })
            .on("data", function(blockHeader){
                console.log('block header', blockHeader);
            })
            .on("error", console.error);
    }
}