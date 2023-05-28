import React from 'react'
import styled from 'styled-components';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaidIcon from '@mui/icons-material/Paid';
import EventIcon from '@mui/icons-material/Event';
import Image from 'next/image';
import { ethers } from 'ethers';
import DonationTracking from '../artifacts/contracts/DonationTracking.sol/DonationTracking.json'
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [donationEventsData, setDonationEventsData] = useState([]);

  useEffect(() => {
    const Request = async () => {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const Web3provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = Web3provider.getSigner();
      const Address = await signer.getAddress();

      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      );
  
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_ADDRESS,
        DonationTracking.abi,
        provider
      );
  
      const getAllDonationEvents = contract.filters.donationEventCreated(null, null, Address);
      const AllDonationEvents = await contract.queryFilter(getAllDonationEvents);
      const AllData = AllDonationEvents.map((e) => {
      return {
        title: e.args.title,
        image: e.args.imgURI,
        owner: e.args.owner,
        timeStamp: parseInt(e.args.timestamp),
        amount: ethers.utils.formatEther(e.args.requiredAmount),
        address: e.args.donationEventAddress
      }
      })  
      setDonationEventsData(AllData)
    }
    Request();
  }, [])

  return (
    <div className="flex flex-col items-center">
      {/* Title + Intro */}
      <div className='mt-20 flex flex-col items-center w-[75%]'>
        <h2 className='text-3xl font-bold'>My Donation Events</h2>
        <p className='mt-5 text-lg font-semibold'>Here you can see all the donation events you have created.</p>
      </div>

      {/* Cards Container */}
      <div className='grid lg:grid-cols-3 grid-col items-center w-[75%] mt-[25px]'>

      {donationEventsData.map((e) => {
        return (
          
          <div key={e.title} className='p-2 rounded-[15px] bg-gray-400 m-4 mt-[20px]' >
          
          <div className='flex flex-row items-center justify-center'>
            <div className='relative h-[150px] w-[45%] m-2'>
            <Image 
            className='rounded-[8px]'
              alt="donateBlock dapp"
              layout='fill' 
              src={"https://donateblock.infura-ipfs.io/ipfs/" + e.image} 
            />
          </div>

        <div className='flex flex-col items-start'>
          <div className='flex flex-row justify-center mx-[2px] p-[5px]'>
            <div className=' flex items-center font-bold mr-2'><AccountBoxIcon className='mx-1' />Owner: </div> 
            <div className='flex items-center font-semibold'>{e.owner.slice(0,10)}...{e.owner.slice(39)}</div>
          </div>
          <div className='flex flex-row justify-center mx-[2px] p-[5px]'>
            <div className='flex items-center font-bold mr-2'><PaidIcon className='mx-1' />Amount: </div> 
            <div className='flex items-center font-semibold'>{e.amount} Matic</div>
          </div>
          <div className='flex flex-row justify-center mx-[2px] p-[5px]'>
            <div className='flex items-center font-bold mr-2'><EventIcon className='mx-1'/>Date: </div>
            <div className='flex items-center  font-semibold'>{new Date(e.timeStamp * 1000).toLocaleString()}</div>
          </div>
      </div>

          </div>

          <div className='flex justify-center font-bold text-2xl my-0 p-[5px]'>
            {e.title}
          </div>

          
          <Link className='flex justify-center' passHref href={'/' + e.address}>
            <div className='mt-5 font-bold hover:scale-105 bg-[#fff] py-3 px-5 text-center w-[200px] rounded-[10px]'>
            Go to DonationEvent
          </div>
          </Link>
        </div>
        
        )
      })}
        {/* Card */}
      </div>
    </div>
  )
}

