/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { ethers } from "ethers";
import { useState } from "react";

import { Menu } from "@headlessui/react";
import Link from "next/link";
import { FunctionComponent } from "react";

import { useWeb3React } from "@web3-react/core"
import { useEffect } from "react"
import { injected } from "./connectors"

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
  const { active, account, library, connector, activate, deactivate } = useWeb3React()

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

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem('isWalletConnected') === 'true') {
        try {
          await activate(injected)
          localStorage.setItem('isWalletConnected', true)
        } catch (ex) {
          console.log(ex)
        }
      }
    }
    connectWalletOnPageLoad()
  }, [])

  return (
    <>
    <div className="ml-2 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-full shadow-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer hover:scale-105" onClick={connectWallet}>
      {balance == '' ? 
        <div className='flex items-center h-[100%] justify-center mr-[5px]'></div> : 
        <div className='flex items-center h-[100%] justify-center mr-[5px]'>{balance.slice(0,4)} Matic</div> 
      }
      {address == '' ? 
      <div className='h-[100%] flex items-center justify-center py-[5px] rounded-[10px]'>
        Connect Wallet</div> : 
        <div className='h-[100%] flex items-center justify-center py-[5px] rounded-[10px]'>
          {address.slice(0,6)}...{address.slice(39)} 
        </div>
        }
    </div>
    </>
  );
};


export default Wallet;