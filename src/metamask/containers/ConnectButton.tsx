import MetaMaskOnboarding from '@metamask/onboarding';
import React from 'react';

import { MetamaskActions } from '../types'

const ONBOARD_TEXT = 'Click here to install MetaMask!';
const CONNECT_TEXT = 'Connect';
const CONNECTED_TEXT = 'Connected';

interface IConnectButtonProps {
    onConnect: (connectedAccountAddress: string) => void
}

export const ConnectButton: React.FC<IConnectButtonProps> = ({ onConnect }) => {
    const [buttonText, setButtonText] = React.useState(ONBOARD_TEXT);
    const [isDisabled, setDisabled] = React.useState(false);
    const [accounts, setAccounts] = React.useState<string[]>([]);
    const onboarding = React.useRef<MetaMaskOnboarding>();

    const handleRequestAccount = (accounts: string[]) => {
        const [connectedAccount] = accounts
        setAccounts(accounts);

        onConnect(connectedAccount)
    }

    React.useEffect(() => {
        if (!onboarding.current) {
            onboarding.current = new MetaMaskOnboarding();
        }
    }, []);

    React.useEffect(() => {
        console.log('effect')
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            console.log('metamask installed')
            if (accounts.length > 0) {
                console.log('connect')
                setButtonText(CONNECTED_TEXT);
                setDisabled(true);
                onboarding.current?.stopOnboarding();
            } else {
                console.log('connected')
                setButtonText(CONNECT_TEXT);
                setDisabled(false);
            }
        }
    }, [accounts]);

    React.useEffect(() => {
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            window.ethereum
                .request({ method: MetamaskActions.requestAccounts })
                .then(handleRequestAccount);
            window.ethereum.on(MetamaskActions.accountsChanged, handleRequestAccount);
            return () => {
                window.ethereum.off(MetamaskActions.accountsChanged, handleRequestAccount);
            };
        }
    }, []);

    const onClick = () => {
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            window.ethereum
                .request({ method: MetamaskActions.requestAccounts })
                .then((accounts: string[]) => handleRequestAccount(accounts));
        } else {
            onboarding.current?.startOnboarding();
        }
    };

    return (
        <button disabled={isDisabled} onClick={onClick}>
            {buttonText}
        </button>
    );
}