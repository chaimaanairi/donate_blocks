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
        <h2 className="mb-10 text-4xl font-bold">DonationEvent Details</h2>
        <p className="text-xl ml-10">bellow the donationevent details</p>
      </div>
      <div className="mb-20 flex lg:flex-row flex-col lg:items-start items-center">
        <div className="relative lg:w-[50%] w-[100%] h-[350px]">
          <Image
            alt="donateblock dapp"
            layout="fill"
            src={
              "https://donateblock.infura-ipfs.io/ipfs/" + Data.image
            }
          />
        </div>
        <div className="flex flex-col m-10">
          <h2 className="text-4xl font-bold">{Data.title}</h2>
          <h2>DonationEvent Creator</h2>
          <p className="bg-gray-200 mb-10">{Data.address}</p>
          <h2>DonationEvent Description</h2>
          <p className="bg-gray-200">{story}</p>
      </div>
      <div className="flex flex-col m-10">
          <div className="bg-gray-200 mb-10">
            <FundText>Required Amount</FundText>
            <FundText>{Data.requiredAmount} Matic</FundText>
          </div>
          <div className="bg-gray-200">
            <FundText>Received Amount</FundText>
            <FundText>{Data.receivedAmount} Matic</FundText>
          </div>
          
        </div>
      </div>
      <div className="mb-20  flex lg:flex-row flex-col  lg:items-start items-center">
        <div className="flex flex-col m-10 lg:w-[50%] w-[100%]">
          <h2 className="text-2xl font-bold">All Donations</h2>
          <Donated>
          <LiveDonation>
            <div className="uppercase  p-[4px] text-center bg-[4cd137]">Recent Donation</div>
            {DonationsData.map((e) => {
              return (
                <div  className="flex justify-between mt-[4px] px-[4px] py-[8px]" key={e.timestamp}>
                <p>{e.donar.slice(0,6)}...{e.donar.slice(39)}</p>
                <p>{e.amount} Matic</p>
                <p>{new Date(e.timestamp * 1000).toLocaleString()}</p>
              </div>
              )
            })
            }
          </LiveDonation>
          <div className="h-[35%] overflow-y-auto">
            <div className="uppercase  p-[4px] text-center bg-[4cd137]">My Past Donation</div>
            {mydonations.map((e) => {
              return (
                <div className="flex justify-between mt-[4px] px-[4px] py-[8px]" key={e.timestamp}>
                <p>{e.donar.slice(0,6)}...{e.donar.slice(39)}</p>
                <p>{e.amount} Matic</p>
                <p>{new Date(e.timestamp * 1000).toLocaleString()}</p>
              </div>
              )
            })
            }
          </div>
        </Donated>  
      </div>
      <div className="flex flex-col m-10">
      <div className="flex justify-between items-center mt-[10px] w-[100%]">
          <input className="px-[8px] py-[15px] border-none w-[40%] h-[40px]" value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder="Enter Amount To Donate" />
          <button className="flex justify-center font-bold w-[30%] p-[10px] bg-gray-300 cursor-pointer rounded-2xl" onClick={DonateFunds}>
            Donate 
          </button>
      </div>
      {/**share in social media */}
      <div className="mt-20 bg-gray-200">
          <h2 className="text-xl font-bold flex justify-center">Share the donationEvent in Social Media</h2>
          <div className="flex flex-row">
            <div className="flex flex-row m-10">
            <div className="flex flex-col">
              <h2>Share in Twitter</h2>
              <a href={`https://twitter.com/intent/tweet?text=Donate to ${Data.title} at ${Data.address}&url=https://donateblock.vercel.app/donationevent/${Data.address}`} target="_blank">
              <img src="./twitter"/>
              </a>
            </div>
            <div className="flex flex-col">
              <h2>Share in Facebook</h2>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=https://donateblock.vercel.app/donationevent/${Data.address}`} target="_blank">
              <Image alt="fb" src={Facebook} width={20} height={20}  />
              </a>
              </div>
              <div className="flex flex-col">
              <h2>Share in Instagram</h2>
              <a href={`https://www.instagram.com/sharer/sharer.php?u=https://donateblock.vercel.app/donationevent/${Data.address}`} target="_blank">
              <img src="./instagram"/> 
              </a>
              </div>
              <div className="flex flex-col">
              <h2>Share in Whatsapp</h2>
              <a href={`https://api.whatsapp.com/send?text=Donate to ${Data.title} at ${Data.address} https://donateblock.vercel.app/donationevent/${Data.address}`} target="_blank">
              <img src="./Whatsapp"/> 
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

const FundText = styled.p`
  margin: 2px;
  padding: 0;
  font-family: "Poppins";
  font-size: normal;
`;
const Donated = styled.div`
  height: 280px;
  margin-top: 15px;
  background-color: ${(props) => props.theme.bgDiv};
`;
const LiveDonation = styled.div`
  height: 65%;
  overflow-y: auto;
`;


