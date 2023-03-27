import React from 'react'
import styled from 'styled-components';
import FormRightWrapper from './formRightWrapper'
import { createContext, useState, useContext} from 'react';
import {TailSpin} from 'react-loader-spinner';
import {ethers} from 'ethers';
import {toast} from 'react-toastify';
import DonationTracking from '../artifacts/contracts/DonationTracking.sol/DonationTracking.json'
import {create as IPFSHTTPClient} from 'ipfs-http-client';

const FormState = createContext();

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

const Form = () => {

const Handler = useContext(FormState);

  const [form, setForm] = useState({
    donationEventTitle: "",
    story: "",
    requiredAmount: "",
    category: "education",
});

const [loading, setLoading] = useState(false);
const [address, setAddress] = useState("");
const [uploaded, setUploaded] = useState(false);

const [storyUrl, setStoryUrl] = useState();
const [imageUrl, setImageUrl] = useState();

const FormHandler = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value
    })
}

const [image, setImage] = useState(null);

const ImageHandler = (e) => {
    setImage(e.target.files[0]);
}

const startDonationEvent = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    if(form.donationEventTitle === "") {
      toast.warn("Title Field Is Empty");
    } else if(form.story === "" ) {
      toast.warn("Story Field Is Empty");
    } else if(form.requiredAmount === "") {
      toast.warn("Required Amount Field Is Empty");
    } else if(uploaded == false) {
        toast.warn("Files Upload Required")
    }
    else {        
      setLoading(true);  

      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_ADDRESS,
        DonationTracking.abi,
        signer
      );
        
      const DonationEventAmount = ethers.utils.parseEther(form.requiredAmount);

      const donationEventData = await contract.createDonationEvent(
        form.donationEventTitle,
        DonationEventAmount,
        imageUrl,
        form.category,
        storyUrl
      );

      await donationEventData.wait();   

      setAddress(donationEventData.to);
    }
}

const [uploadLoading, setUploadLoading] = useState(false);
 // const [uploaded, setUploaded] = useState(false);

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
  <FormState.Provider value={{form, setForm, image, setImage, ImageHandler, FormHandler, setImageUrl, setStoryUrl, startDonationEvent, setUploaded}} >
<FormWrapper>
    <FormMain>
        {loading == true ?
            address == "" ?
                <Spinner>
                    <TailSpin height={60} />
                </Spinner> :
            <Address>
                <h1>DonationEvent Started Sucessfully!</h1>
                <h1>{address}</h1>
                <Button>
                    Go To DonationEvent
                </Button>
            </Address>
            :
                <FormInputsWrapper>
                    {/* FormLeftWrapper */}
                    <div className='w-[48%]'>
                        <div className='font flex flex-col mt-[10px]'>
                            <label>DonationEvent Title</label>
                            <div className='p-[15px] mt-[4px] border-none rounded-[8px] outline-0	 w-[100%]' onChange={Handler.FormHandler} value={Handler.form.donationEventTitle} placeholder='DonationEvent Title' name='donationEventTitle'>
                            </div>
                        </div>
                        <div className='font flex flex-col mt-[10px]'>
                            <label>Story</label>
                            <div className='p-[15px] mt-[4px] border-none rounded-[8px] outline-0	 max-w-[100%] min-w-[100%] overflow-hidden min-h-[160px]' onChange={Handler.FormHandler} value={Handler.form.story} name="story" placeholder='Describe Your Story'>
                            </div>
                        </div>
                    </div>
                    
                    {/* FormRightWrapper */}

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


                </FormInputsWrapper>    
                           
        }
    </FormMain>
</FormWrapper>
</FormState.Provider>
)
}

const FormWrapper = styled.div`
    width: 100%;
    display:flex;
    justify-content:center;
`

const FormMain = styled.div`
    width:80%;
`

const FormInputsWrapper = styled.div`
    display:flex;
    justify-content:space-between ;
    margin-top:45px ;
`

const Spinner = styled.div`
    width:100%;
    height:80vh;
    display:flex ;
    justify-content:center ;
    align-items:center ;
`
const Address = styled.div`
    width:100%;
    height:80vh;
    display:flex ;
    display:flex ;
    flex-direction:column;
    align-items:center ;
    background-color:${(props) => props.theme.bgSubDiv} ;
    border-radius:8px;
`

const Button = styled.button`
    display: flex;
  justify-content:center;
  width:30% ;
  padding:15px ;
  color:white ;
  background-color:#00b712 ;
  background-image:
      linear-gradient(180deg, #00b712 0%, #5aff15 80%) ;
  border:none;
  margin-top:30px ;
  cursor: pointer;
  font-weight:bold ;
  font-size:large ;
`

export default Form;
export {FormState};