/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import Image from "next/image";
import {ethers} from 'ethers';
import DonationTracking from '../artifacts/contracts/DonationTracking.sol/DonationTracking.json'
import DonationEvent from '../artifacts/contracts/DonationTracking.sol/DonationEvent.json'
import { useEffect, useState } from "react";


export default function Detail({Data, DonationsData}) {
  const [mydonations, setMydonations] = useState([]);
  const [story, setStory] = useState('');
  const [amount, setAmount] = useState();
  const [change, setChange] = useState(false);

  useEffect(() => {
    const Request = async () => {
      let storyData;
      
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const Web3provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = Web3provider.getSigner();
      const Address = await signer.getAddress();

      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      );
    
      const contract = new ethers.Contract(
        Data.address,
        DonationEvent.abi,
        provider
      );

      fetch('https://donateblock.infura-ipfs.io/ipfs/' + Data.storyUrl)
            .then(res => res.text()).then(data => storyData = data);

      const MyDonations = contract.filters.donated(Address);
      const MyAllDonations = await contract.queryFilter(MyDonations);

      setMydonations(MyAllDonations.map((e) => {
        return {
          donar: e.args.donar,
          amount: ethers.utils.formatEther(e.args.amount),
          timestamp : parseInt(e.args.timestamp)
        }
      }));

      setStory(storyData);
    }

    Request();
  }, [change])


  const DonateFunds = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      const contract = new ethers.Contract(Data.address, DonationEvent.abi, signer);
      
      const transaction = await contract.donate({value: ethers.utils.parseEther(amount)});
      await transaction.wait();

      setChange(true);
      setAmount('');
      
  } catch (error) {
      console.log(error);
  }
  
  }
  return (
    <div className="flex justify-between p-[20px] w-[98%]">
      <div className="w-[45%]">
        <div className="relative w-[100%] h-[350px]">
          <Image
            alt="donateblock dapp"
            layout="fill"
            src={
              "https://donateblock.infura-ipfs.io/ipfs/" + Data.image
            }
          />
        </div>
        <div className="font mt-10">
          {story}
        </div>
      </div>
      <div className="w-[50%]">
        <div className="font p-0 m-0 ">{Data.title}</div>
        <div className="flex w-[100%] items-center mt-[10px] justify-between">
          <div className="px-[8px] py-[15px] border-none rounded-[8px] outline-none w-[40%] h-[40%]" value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder="Enter Amount To Donate" />
          <div className="font flex justify-center w-[40%] p-[15px] bg-[#00b712] border-none cursor-pointer font-bold rounded-[8px]" onClick={DonateFunds}>Donate</div>
        </div>
        <div className="flex w-[100%] justify-between mt-[10px]">
          <div className="w-[45%] p-[8px] rounded-[8px] text-center">
            <div className="font m-[2px] p-0">Required Amount</div>
            <div className="font m-[2px] p-0">{Data.requiredAmount} Matic</div>
          </div>
          <div className="w-[45%] p-[8px] rounded-[8px] text-center">
            <div className="font m-[2px] p-0">Received Amount</div>
            <div className="font m-[2px] p-0">{Data.receivedAmount} Matic</div>
          </div>
        </div>
        <div className="h-[280 px] mt-[15px] ">
       <div className="h-[65%] overflow-y-auto">
            <div className="font p-[4px] bg-[#4cd137] text-xs uppercase">Recent Donation</div>
            {DonationsData.map((e) => {
              return (
                <div className="flex justify-between mt-[4px] px-[4px] py-[8px]" key={e.timestamp}>
                <div className="font2 m-0 p-0">{e.donar.slice(0,6)}...{e.donar.slice(39)}</div>
                <div className="font2 m-0 p-0">{e.amount} Matic</div>
                <div className="font2 m-0 p-0">{new Date(e.timestamp * 1000).toLocaleString()}</div>
              </div>
              )
            })
            }
          </div>
          <div className="h-[35%] overflow-y-auto">
            <div className="font p-[4px] bg-[#4cd137] text-xs uppercase">My Past Donation</div>
            {mydonations.map((e) => {
              return (
                <div className="flex justify-between mt-[4px] px-[4px] py-[8px]"  key={e.timestamp}>
                <div className="font2 m-0 p-0">{e.donar.slice(0,6)}...{e.donar.slice(39)}</div>
                <div className="font2 m-0 p-0">{e.amount} Matic</div>
                <div className="font2 m-0 p-0">{new Date(e.timestamp * 1000).toLocaleString()}</div>
              </div>
              )
            })
            }
          </div>
        </div>
      </div>
    </div>
  );
}


export async function getStaticPaths() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL
  );

  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_ADDRESS,
    DonationTracking.abi,
    provider
  );

  const getAllDonationEvents = contract.filters.donationEventCreated();
  const AllDonationEvents = await contract.queryFilter(getAllDonationEvents);

  return {
    paths: AllDonationEvents.map((e) => ({
        params: {
          address: e.args.donationEventAddress.toString(),
        }
    })),
    fallback: "blocking"
  }
}

export async function getStaticProps(context) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL
  );

  const contract = new ethers.Contract(
    context.params.address,
    DonationEvent.abi,
    provider
  );

  const title = await contract.title();
  const requiredAmount = await contract.requiredAmount();
  const image = await contract.image();
  const storyUrl = await contract.story();
  const owner = await contract.owner();
  const receivedAmount = await contract.receivedAmount();

  const Donations = contract.filters.donated();
  const AllDonations = await contract.queryFilter(Donations);


  const Data = {
      address: context.params.address,
      title, 
      requiredAmount: ethers.utils.formatEther(requiredAmount), 
      image, 
      receivedAmount: ethers.utils.formatEther(receivedAmount), 
      storyUrl, 
      owner,
  }

  const DonationsData =  AllDonations.map((e) => {
    return {
      donar: e.args.donar,
      amount: ethers.utils.formatEther(e.args.amount),
      timestamp : parseInt(e.args.timestamp)
  }});

  return {
    props: {
      Data,
      DonationsData
    },
    revalidate: 10
  }


}
