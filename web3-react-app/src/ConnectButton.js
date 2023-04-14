
import { React } from 'react';
import { useEffect } from 'react';

import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { ethers } from 'ethers';

export function ConnectButton() {

  const injectedConnector = new InjectedConnector();
  const { activate, active, chainId, account, library } = useWeb3React();

  async function connect() {
    try {
      await activate(injectedConnector);
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  }

  async function fetchDetails() {
    if (active && account && library) {
      const chainName = getChainName(chainId);
      const balance = await library.getBalance(account);
      const formattedBalance = ethers.utils.formatEther(balance);
  
      console.log('Chain ID:', chainId);
      console.log('Chain Name:', chainName);
      console.log('Account:', account);
      console.log('Account Balance:', formattedBalance);
    }
  }
  
  function getChainName(chainId) {
    switch (chainId) {
      case 1:
        return 'Ethereum Mainnet';
      case 3:
        return 'Ropsten Testnet';
      case 4:
        return 'Rinkeby Testnet';
      case 5:
        return 'Goerli Testnet';
      case 42:
        return 'Kovan Testnet';
      default:
        return 'Unknown';
    }
  }

  useEffect(() => {
    fetchDetails();
  }, [active, account, library]);

  return (
    <>
      <button onClick={connect}>
        Connect
      </button>
    </>
  );
}

export default ConnectButton;
