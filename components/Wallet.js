import React from 'react'
import { ethers } from "ethers";
import { useState } from "react";

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
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  const connectWallet = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    if (provider.network !== "matic") {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks["polygon"],
          },
        ],
      });
    } 
      const account = provider.getSigner();
      const Address = await account.getAddress();
      setAddress(Address);
      const Balance = ethers.utils.formatEther(await account.getBalance());
      setBalance(Balance);
    
  };

  return (
    <div className='bg-white font flex items-center justify-between rounded-[10px] font-bold cursor-pointer' onClick={connectWallet}>
      {balance == '' ? 
        <div className='flex items-center h-[100%] justify-center mr-[5px]'></div> : 
        <div className='flex items-center h-[100%] justify-center mr-[5px]'>{balance.slice(0,4)} Matic</div> 
      }
      {address == '' ? 
      <div className='h-[100%] flex items-center justify-center py-[5px] rounded-[10px]'>
        Connect Wallet</div> : 
        <div className='h-[100%] flex items-center justify-center py-[5px] rounded-[10px]'>
          {address.slice(0,6)}...{address.slice(39)}
        </div>}
    </div>
  );
};


export default Wallet;