import styled from 'styled-components';
import { FormState } from './form';
import { useContext } from 'react';

const FormUp = () => {
  const Handler = useContext(FormState);

  return (
    <div className=''>
      <div className='mb-5'>
        <label className='font-bold mb-2'>DonationEvent Title</label>
        <input className='p-[15px] mt-[4px] border-[1px] w-[100%] rounded-[8px] border-black' onChange={Handler.FormHandler} value={Handler.form.campaignTitle} placeholder='Campaign Title' name='campaignTitle'>
        </input>
      </div>
      <div className='mb-5'>
        <label className='font-bold mb-2'>DonationEvent Description</label>
        <textarea className='p-[15px] mt-[4px] border-[1px] max-w-[100%] min-w-[100%] min-h-[160px] rounded-[8px] border-black'  onChange={Handler.FormHandler} value={Handler.form.story} name="story" placeholder='Describe Your Story'>
        </textarea>
      </div>
    </div>
  )
}

export default FormUp;