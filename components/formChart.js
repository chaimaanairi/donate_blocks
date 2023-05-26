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

const FormDown = () => {
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
    <div className='flex flex-col'>
      <div className='mb-5'>
        <label className='font-bold mb-2'>DonationEvent Title</label>
        <input className='p-[15px] mt-[4px] border-[1px] w-[100%] rounded-[8px] border-black' onChange={Handler.FormHandler} value={Handler.form.donationEventTitle} placeholder='donationEvent Title' name='donationEventTitle'>
        </input>
      </div>
      <div className='mb-5'>
        <label className='font-bold mb-2'>DonationEvent Description</label>
        <textarea className='p-[15px] mt-[4px] border-[1px] max-w-[100%] min-w-[100%] min-h-[160px] rounded-[8px] border-black'  onChange={Handler.FormHandler} value={Handler.form.story} name="story" placeholder='Describe Your Story'>
        </textarea>
      </div>
      <div className='flex flex-col mt-[4px]'>
        <div className='flex justify-between w-[100%]'>
          <div className='flex flex-col w-[45%] mb-5'>
            <label className='font-bold mb-2'>Required Amount</label>
            <input className='p-[10px] mt-[4px] border-[1px] w-[100%] rounded-[8px] border-black'  onChange={Handler.FormHandler} value={Handler.form.requiredAmount} name="requiredAmount" type={'number'} placeholder='Required Amount'></input>
          </div>
          <div className='flex flex-col w-[45%]'>
            <label className='font-bold'>Choose Category</label>
            <select className='p-[10px] mt-[4px] border-[1px] border-black w-[100%] rounded-[8px]' onChange={Handler.FormHandler} value={Handler.form.category} name="category">
              <option>Education</option>
              <option>Health</option>
              <option>Animal</option>
            </select>
          </div>
        </div>
      </div>
      <div className='flex flex-row w-[100%] mb-5 '>
      <div className='flex justify-between w-[100%]'>
      {/* Image */}
      <div className='flex flex-col mt-[10px] w-[45%]'>
        <label className='font-bold mb-2'>Select Image</label>
        <input className='mt-[4px] w-[100%]' alt="dapp" onChange={Handler.ImageHandler} type={'file'} accept='image/*'>
        </input>
      </div>
      {/* Upload Files to IPFS */}
       {uploadLoading == true ? <button className='w-[45%] mt-[30px] p-2 font-bold rounded-[8px] bg-slate-400'><TailSpin color='#fff' height={20} /></button> :
        uploaded == false ? 
        <button className='w-[45%] mt-[30px] p-2 font-bold rounded-[8px] bg-slate-400' onClick={uploadFiles}>
          Upload Files to IPFS
        </button>
        : <button className='w-[45%] mt-[30px] p-2 font-bold rounded-[8px] bg-slate-400' style={{cursor: "no-drop"}}>Files uploaded Sucessfully</button>
      }
       </div>
      </div>
      {/* Start DonationEvent */}
      <div className='flex justify-center'>
      <button className=' w-[60%] mt-[30px] p-2 font-bold rounded-[8px] bg-[#6AA4B0]' onClick={Handler.startDonationEvent}>
        Start DonationEvent
      </button>
      </div>
    </div>
  )
}


export default FormDown