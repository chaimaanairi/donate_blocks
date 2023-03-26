import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

export default function Footer() {
  return ( 
    <>
      <div className="mt-14 bg-black h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-20">
        <div className="p-5 ">
          <ul>
            <p className="text-white font-bold text-3xl pb-6">
              Smart<span className="text-green">Fingerprint</span>
            </p>
            <div className="flex gap-6 pb-5">
              <FaInstagram className="text-2xl cursor-pointer text-white hover:text-green" />
              <FaTwitter className="text-2xl cursor-pointer text-white hover:text-green" />
              <FaLinkedin className="text-2xl cursor-pointer text-white hover:text-green" />
              <FaYoutube className="text-2xl cursor-pointer text-white hover:text-green" />
            </div>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <p className="text-white font-bold text-2xl pb-4">Platform</p>
            <li className="text-gray-200 text-sm pb-2 font-semibold hover:text-green cursor-pointer">
              Education
            </li>
            <li className="text-gray-200 text-sm pb-2 font-semibold hover:text-green cursor-pointer">
              E-learning
            </li>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <p className="text-white font-bold text-2xl pb-4">Features</p>
            <li className="text-gray-200 text-sm pb-2 font-semibold hover:text-green cursor-pointer">
              Trust
            </li>
            <li className="text-gray-200 text-sm pb-2 font-semibold hover:text-green cursor-pointer">
              Security
            </li>
            <li className="text-gray-200 text-sm pb-2 font-semibold hover:text-green cursor-pointer">
              Data traceability 
            </li>

          </ul>
        </div>
        <div className="p-5">
          <ul>
            <p className="text-white font-bold text-2xl pb-4">Supported by</p>
            <li className="text-gray-200 text-sm pb-2 font-semibold hover:text-green cursor-pointer">
              Ethereum Network
            </li>
            <li className="text-gray-200 text-sm pb-2 font-semibold hover:text-green cursor-pointer">
            Ropsten Test Network
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-center  p-5 bg-black">
        <h1 className="text-sm text-gray-200 font-semibold">
        All Rights Reserved by <span className="hover:text-green font-bold cursor-pointer">Smart Fingerprint</span> Build by <span className="hover:text-green font-bold cursor-pointer">@Chaimaa</span>  | Copyright © {new Date().getFullYear()} 
        </h1>
      </div>
    </>
  );
}

