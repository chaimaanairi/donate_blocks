import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const networks = {
  polygon: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Polygon Testnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
};


const Wallet = () => {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');

  useEffect(() => {
    const storedAddress = localStorage.getItem('walletAddress');
    const storedBalance = localStorage.getItem('walletBalance');

    if (storedAddress && storedBalance) {
      setAddress(storedAddress);
      setBalance(storedBalance);
    }
  }, []);

  const connectWallet = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
      if (provider.network !== 'matic') {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              ...networks['polygon'],
            },
          ],
        });
      }
      const account = provider.getSigner();
      const walletAddress = await account.getAddress();
      const walletBalance = ethers.utils.formatEther(await account.getBalance());
  
      setAddress(walletAddress);
      setBalance(walletBalance);
  
      localStorage.setItem('walletAddress', walletAddress);
      localStorage.setItem('walletBalance', walletBalance);
    } catch (error) {
      console.log('Error connecting wallet:', error);
    }
  };  

  return (
    <>
      {address ? (
        <div className="mr-2 inline-flex items-center rounded-2xl bg-white text-black px-2 py-1 text-sm font-medium">
          <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-gray-500" fill="currentColor" viewBox="0 0 8 8">
            <circle cx={4} cy={4} r={3} />
          </svg>
          {networks['polygon'].chainName}
        </div>
      ) : null}
      {balance ? (
        <div className="mr-2 inline-flex items-center rounded-2xl bg-white text-black px-2 py-1 text-sm font-medium">
          {balance.slice(0, 4)} Matic
        </div>
      ) : null}
      <div
        className="ml-2 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-full shadow-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer hover:scale-105"
        onClick={connectWallet}
      >
        {address ? (
          <div className="h-[100%] flex items-center justify-center py-[5px] rounded-[10px]">
            {address.slice(0, 6)}...{address.slice(39)}
          </div>
        ) : (
          <div className="h-[100%] flex items-center justify-center py-[5px] rounded-[10px]">Connect Wallet</div>
        )}
      </div>
    </>
  );
};

export default Wallet;
