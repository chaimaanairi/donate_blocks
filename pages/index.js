import React from 'react'
import Image from 'next/image'
import Help from "../public/images/help.png";


const index = () => {
  return (
    <div>
    <div id="home" className="flex md:flex-row flex-col justify-around items-center min-w-7xl">
      {/* textual area */}
      <div className="flex flex-col items-start justify-start md:ml-20 mx-10 mt-10 md:mt-0">
        <p className="text-black text-base text-green font-bold"> DonateBlock</p>
        <h2 className="font-bold md:text-6xl text-5xl text-gray-800">
        Advance your career 
        </h2>
        <p className="md:text-base text-sm font-semibold text-gray-700 mt-5">
          Gain and share new knowledge and skills.<br/>
You can upload any type of your training content to leave your fingerprint with us.<br/>
Create and upload your own videos and course photos, and share them with anyone.<br/>
Learn different areas in an easy way! Get unlimited access to all our courses.<br/>
<br/>
Get started !
        </p>
        
      </div>
      {/* image area */}
      <div className="pointer-events-none mr-20 p-10">
        <Image alt="bt" src={Help} width={500} height={500} objectFit="cover" />
      </div>
    </div>

    <div className="flex flex-col items-center justify-center mt-20">
      <h2 className="font-bold ms:text-4xl mx-10 text-3xl text-gray-800">
      You can donate on DonateBlocks in four easy steps:
      </h2>
      <div className="flex sm:flex-row flex-col sm:space-x-20 space-y-3 mb-5 mt-10 ">
        <div className="flex flex-col items-center justify-center border-[2px] h-[250px] w-[200px] p-3 bg-white rounded-[10px]">
          <h2 className="font-bold md:text-4xl text-3xl text-gray-800">STEP 1</h2>
          <p className=" text-sm font-semibold text-[#000] mt-5">
          Install the MetaMask extension on your browser and connect it to your <span className='font-bold'>DonateBlocks</span> account.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center border-[2px] h-[250px] w-[200px] p-3 bg-white rounded-[10px]">
          <h2 className="font-bold md:text-4xl text-3xl text-gray-800">STEP 2</h2>
          <p className=" text-sm font-semibold text-[#000] mt-5">
          Explore the campaign page to discover ongoing campaigns that you would like to contribute to.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center border-[2px] h-[250px] w-[200px] p-3 bg-white rounded-[10px]">
          <h2 className="font-bold md:text-4xl text-3xl text-gray-800">STEP 3</h2>
          <p className=" text-sm font-semibold text-[#000] mt-5">
          Read the details of each campaign and choose the one that resonates with you the most.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center border-[2px] h-[250px] w-[200px] p-3 bg-white rounded-[10px]">
          <h2 className="font-bold md:text-4xl text-3xl text-gray-800">STEP 4</h2>
          <p className=" text-sm font-semibold text-[#000] mt-5">
          Make your donation through MetaMask and contribute to a brighter future for those in need.          </p>
        </div>
      </div>
    </div>


    </div>
  )
}

export default index
