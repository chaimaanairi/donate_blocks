/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import Image from "next/image";
import {ethers} from 'ethers';
import DonationTracking from '../artifacts/contracts/DonationTracking.sol/DonationTracking.json'
import DonationEvent from '../artifacts/contracts/DonationTracking.sol/DonationEvent.json'
import { useEffect, useState } from "react";
import {Facebook} from "../public/images/facebook.png"

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function Detail({Data, DonationsData}) {
  const [mydonations, setMydonations] = useState([]);
  const [story, setStory] = useState();
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
  }  }

  return (
    <div className="m-10 flex flex-col justify-center">
      {/* title + intro */}
      <div className="my-20 flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold">DonationEvent Details</h2>
      </div>
      <div className=" flex lg:flex-row flex-col lg:items-start items-center">
        <div className="relative lg:w-[50%] w-[100%] h-[350px]">
          <Image
          className="rounded-[10px]"
            alt="donateblock dapp"
            layout="fill"
            src={
              "https://donateblock.infura-ipfs.io/ipfs/" + Data.image
            }
          />
        </div>
        <div className="flex flex-col m-10">
          <h2 className=" mb-10 text-3xl font-bold">{Data.title}</h2>
          <h2 className="flex justify-center text-[18px] font-bold">DonationEvent Creator</h2>
          <p className="bg-gray-200 mt-3 mb-10 p-4 rounded-[10px] ">{Data.address}</p>
          <h2 className="flex justify-center text-[18px] font-bold">DonationEvent Description</h2>
          <p className="bg-gray-200 mt-3 mb-10 p-4 rounded-[10px]">{story}</p>
      </div>
      <div className="flex flex-col m-10">
          <div className="bg-gray-200 mb-10 mt-3 p-4 rounded-[10px] w-[190px]">
            <p className="flex justify-center m-[2px] font-bold">Required Amount</p>
            <p className="flex justify-center m-[2px] font-normal">{Data.requiredAmount} Matic</p>
          </div>
          <div className="bg-gray-200 mb-10 mt-3 p-4 rounded-[10px] w-[190px]">
            <p className="flex justify-center m-[2px] font-bold">Received Amount</p>
            <p className="flex justify-center m-[2px] font-normal">{Data.receivedAmount} Matic</p>
          </div>
          
        </div>
      </div>
      <div className=" flex lg:flex-row flex-col lg:items-start items-center">
        <div className="flex flex-col mx-5 lg:w-[50%] w-[100%]">
          <h2 className="text-2xl font-bold">All Donations</h2>
          <div className="h-[280px] mt-[15px]">
          <div className="h-[65%] p-5 overflow-y-auto bg-slate-300 rounded-[8px]">
            <div className="uppercase text-center font-bold mb-5">Recent Donation</div>
            {DonationsData.map((e) => {
              return (
                <div  className="flex justify-between mt-[4px] px-[4px] py-[8px]" key={e.timestamp}>
                <p>{e.donar}</p>
                <p>{e.amount} Matic</p>
                <p>{new Date(e.timestamp * 1000).toLocaleString()}</p>
              </div>
              )
            })
            }
          </div>
          <div className="mt-5 h-[65%] p-5 overflow-y-auto bg-slate-300 rounded-[8px]">
            <div className="uppercase text-center font-bold mb-5">My Past Donation</div>
            {mydonations.map((e) => {
              return (
                <div className="flex justify-between mt-[4px] px-[4px] py-[8px]" key={e.timestamp}>
                <p>{e.donar}</p>
                <p>{e.amount} Matic</p>
                <p>{new Date(e.timestamp * 1000).toLocaleString()}</p>
              </div>
              )
            })
            }
          </div>
        </div>  
      </div>
      <div className="flex flex-col my-[40px] mx-[50px]">
      <div className="bg-[#6AA4B0] py-4 rounded-[10px] flex flex-row mt-20 items-center lg:mt-[10px] w-[100%]">
          <input className="rounded-full mx-10 px-[8px] py-[15px] border-[1px] border-black w-[50%] h-[40px]" value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder="Enter Amount To Donate" />
          <button className="ml-2 inline-flex items-center px-4 py-1.5 border text-[15px] font-bold rounded-full shadow-sm text-black bg-white cursor-pointer hover:scale-105" onClick={DonateFunds}>
            Donate 
          </button>
      </div>
      {/**share in social media */}
      <div className="mt-[50px] bg-gray-200 p-5 rounded-[8px]">
          <h2 className="text-xl font-bold flex justify-center">Share the donation event on social media</h2>
          <div className="flex flex-row  justify-center">
            <div className="flex flex-row mt-[20px]">
            <div className="flex flex-col mx-6">
              <a href={`https://twitter.com/intent/tweet?text=Donate to ${Data.title} at ${Data.address}&url=https://donateblock.vercel.app/donationevent/${Data.address}`} target="_blank">
              <TwitterIcon size={32} round={true} />
              </a>
            </div>
            <div className="flex flex-col mx-6">
              <a href={`https://www.facebook.com/sharer/sharer.php?u=https://donateblock.vercel.app/donationevent/${Data.address}`} target="_blank">
              <FacebookIcon size={32} round={true} />
              </a>
              </div>
              <div className="flex flex-col mx-6">
              <a href={`https://www.instagram.com/sharer/sharer.php?u=https://donateblock.vercel.app/donationevent/${Data.address}`} target="_blank">
              <InstagramIcon size={32} round={true}/> 
              </a>
              </div>
              <div className="flex flex-col mx-6">
              <a href={`https://api.whatsapp.com/send?text=Donate to ${Data.title} at ${Data.address} https://donateblock.vercel.app/donationevent/${Data.address}`} target="_blank">
              <WhatsAppIcon size={32} round={true} /> 
              </a>
              </div>
            </div>
          </div>
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
