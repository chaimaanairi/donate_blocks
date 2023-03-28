import styled from 'styled-components';
import { FormState } from './form';
import { useContext } from 'react';

const FormLeftWrapper = () => {
  const Handler = useContext(FormState);

  return (
    <>
     {/* FormLeftWrapper */}
        <div className='w-[48%]'>
            <div className='font flex flex-col mt-[10px]'>
                <label>DonationEvent Title</label>
                <input className='p-[15px] mt-[4px] border-none rounded-[8px] outline-0 w-[100%]' onChange={Handler.FormHandler} value={Handler.form.donationEventTitle} placeholder='DonationEvent Title' name='donationEventTitle'>
                </input>
            </div>
            <div className='font flex flex-col mt-[10px]'>
                <label>Story</label>
                <textarea className='p-[15px] mt-[4px] border-none rounded-[8px] outline-0	 max-w-[100%] min-w-[100%] overflow-hidden min-h-[160px]' onChange={Handler.FormHandler} value={Handler.form.story} name="story" placeholder='Describe Your Story'>
                </textarea>
            </div>
        </div>
    </>
  )
}

const FormLeft = styled.div`
  width:48%;
`

const FormInput = styled.div`
  display:flex ;
  flex-direction:column;
  font-family:'poppins';
  margin-top:10px ;
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

const TextArea = styled.textarea`
  padding:15px;
  background-color:${(props) => props.theme.bgDiv} ;
  color:${(props) => props.theme.color} ;
  margin-top:4px;
  border:none;
  border-radius:8px ;
  outline:none;
  font-size:large;
  max-width:100%;
  min-width:100%;
  overflow-x:hidden;
  min-height:160px ;
`

export default FormLeftWrapper;