import styled from 'styled-components';
import FormLeftWrapper from './formLeftWrapper'
import FormRightWrapper from './formRightWrapper'
import { createContext, useState } from 'react';
import {TailSpin} from 'react-loader-spinner';
import {ethers} from 'ethers';
import {toast} from 'react-toastify';
import DonationTracking from '../artifacts/contracts/DonationTracking.sol/DonationTracking.json'

const FormState = createContext();

const Form = () => {
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
                    <FormLeftWrapper />
                    
                    <FormRightWrapper />
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