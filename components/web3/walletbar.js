  /* eslint-disable jsx-a11y/alt-text */
  import { useState } from "react";

import React from "react";

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


export default function WalletBar() {
  const [address, setAddress] = useState("");
 // const { network } = useNetwork();

 return (
  <section className="my-10 text-black bg-[#C3CEDA] rounded-3xl">
  <div className="px-8 pb-5">
  <div className="text-2xl pb-9 pt-3">
    <p className="text-black font-bold text-base"> DonateBlocks</p>
  </div>  

  <div className="mb-5">        
    <h2 className="text-2xl pb-4">Hello, 
    {address == '' ? 
      <div className=''></div> : 
        <div className='text-black'>
          {address.slice(0,6)}...{address.slice(39)} 
        </div>
        }
    </h2>
    <h2 className="subtitle  text-xl mb-2">I hope you are having a great day!</h2>
    <p className="text-black ">

    Welcome to <span className="font-bold"> DonateBlocks </span>, where you can browse and support various charitable causes. 
    Below you will find a list of all existing campaigns, each one representing a unique opportunity<br/>  to make a difference in the world.<br/> 
    Remember, every donation counts and together we can make a significant difference in the world. <br/> 
    Thank you for choosing <span className="font-bold"> DonateBlocks </span> as your platform for charitable giving.    <br/> 
    </p> 
  </div>

    <div className="flex justify-between items-center">
      <div className="sm:flex sm:justify-center lg:justify-start">
          <div className="">
        </div>
      </div>

      <div>
    
          <div>
            
            <span>Currently on </span>
            <strong className="text-2xl"> 
            {networks["polygon"].chainName}
            </strong>

          </div>
        
      </div>

      </div>
    </div>
    </section>
)
}


