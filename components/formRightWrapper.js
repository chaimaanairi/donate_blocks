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
    <>
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
                        </div>*
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
</>
  )
}

const FormRight = styled.div`
  width:45%;
`

const FormInput = styled.div`
  display:flex ;
  flex-direction:column;
  font-family:'poppins';
  margin-top:10px ;
`

const FormRow = styled.div`
  display: flex;
  justify-content:space-between;
  width:100% ;
`

const Input = styled.input`
  padding:15px;
  background-color:${(props) => props.theme.bgDiv} ;
  color:${(props) => props.theme.color} ;
  margin-top:4px;
  border:none ;
  border-radius:8px ;
  outline:none;
  font-size:large;
  width:100% ;
` 

const RowFirstInput = styled.div`
  display:flex ;
  flex-direction:column ;
  width:45% ;
`

const RowSecondInput = styled.div`
  display:flex ;
  flex-direction:column ;
  width:45% ;
`

const Select = styled.select`
  padding:15px;
  background-color:${(props) => props.theme.bgDiv} ;
  color:${(props) => props.theme.color} ;
  margin-top:4px;
  border:none ;
  border-radius:8px ;
  outline:none;
  font-size:large;
  width:100% ;
`

const Image = styled.input`
  background-color:${(props) => props.theme.bgDiv} ;
  color:${(props) => props.theme.color} ;
  margin-top:4px;
  border:none ;
  border-radius:8px ;
  outline:none;
  font-size:large;
  width:100% ;
  &::-webkit-file-upload-button {
    padding: 15px ;
    background-color: ${(props) => props.theme.bgSubDiv} ;
    color: ${(props) => props.theme.color} ;
    outline:none ;
    border:none ;
    font-weight:bold ;
  }  
`

const Button = styled.button`
  display: flex;
  justify-content:center;
  width:100% ;
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

export default FormRightWrapper