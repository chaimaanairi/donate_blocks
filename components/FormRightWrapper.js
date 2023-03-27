import React from 'react'
import styled from 'styled-components';
import { FormState } from './form';
import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import {TailSpin} from 'react-loader-spinner'
import {create as IPFSHTTPClient} from 'ipfs-http-client';

const projectId = process.env.NEXT_PUBLIC_IPFS_ID
const projectSecret = process.env.NEXT_PUBLIC_IPFS_KEY
const auth = 'Basic ' + Buffer.from(projectId + ":" + projectSecret).toString('base64')

const client = IPFSHTTPClient({
  host:'ipfs.infura.io',
  port:5001,
  protocol: 'https',
  headers: {
    authorization: auth
  }
})

const FormRightWrapper = () => {
  const Handler = useContext(FormState);

  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const uploadFiles = async (e) => {
    e.preventDefault();
    setUploadLoading(true);

    if(Handler.form.story !== "") {
      try {
        const added = await client.add(Handler.form.story);
        Handler.setStoryUrl(added.path)
      } catch (error) {
        toast.warn(`Error Uploading Story`);
      }
    }


      if(Handler.image !== null) {
          try {
              const added = await client.add(Handler.image);
              Handler.setImageUrl(added.path)
          } catch (error) {
            toast.warn(`Error Uploading Image`);
          }
      }

      setUploadLoading(false);
      setUploaded(true);
      Handler.setUploaded(true);
      toast.success("Files Uploaded Sucessfully")
}
  return (
    <div className='w-[45%]'>
      <div className='font flex flex-col mt-[10px]'>
        <div className='flex justify-between w-[100%]'>
          <div className='flex flex-col w-[45%]'>
            <label>Required Amount</label>
            <div className='p-[15px] mt-[4px] border-none rounded-[8px] outline-none w-[100%]' onChange={Handler.FormHandler} value={Handler.form.requiredAmount} name="requiredAmount" type={'number'} placeholder='Required Amount'></div>
          </div>
          <div className='flex flex-col w-[45%]'>
            <label>Choose Category</label>
            <div className='p-[15px] mt-[4px] border-none rounded-[8px] outline-none w-[100%]' onChange={Handler.FormHandler} value={Handler.form.category} name="category">
              <option>Education</option>
              <option>Health</option>
              <option>Animal</option>
            </div>
          </div>
        </div>
      </div>
      {/* Image */}
      <div className='font flex flex-col mt-[10px]'>
        <label>Select Image</label>
        <div className='mt-[4px] border-none rounded-[8px] outline-none w-[100%]' alt="dapp" onChange={Handler.ImageHandler} type={'file'} accept='image/*'>
        </div>
      </div>
      {uploadLoading == true ? <div className='button'><TailSpin color='#fff' height={20} /></div> :
        uploaded == false ? 
        <div className='button' onClick={uploadFiles}>
          Upload Files to IPFS
        </div>
        : <div className='button' style={{cursor: "no-drop"}}>Files uploaded Sucessfully</div>
      }
      <div className='button' onClick={Handler.startDonationEvent}>
        Start DonationEvent
      </div>
    </div>
  )
}

export default FormRightWrapper