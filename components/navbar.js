import React from 'react'
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {App} from './layout';
import { useContext } from 'react';
import Wallet from './wallet';

const Header = () => {
  const Router = useRouter();
  const ThemeToggler = useContext(App);

  return (
    <div className='bg-[#acd1f5] mb-10 flex items-center justify-between h-[70px] w-[100%]'>
      <h1> DonateBlock</h1>
      
      <div>
        <HeaderNavWrapper>
          <Link passHref href={'/'}><HeaderNavLinks active={Router.pathname == "/" ? true : false} >
          Home
          </HeaderNavLinks></Link>
          <Link passHref href={'/allDonationEvent'}><HeaderNavLinks active={Router.pathname == "/allDonationEvent" ? true : false} >
            DonationEvents
          </HeaderNavLinks></Link>
          <Link passHref href={'/createDonationEvent'}><HeaderNavLinks active={Router.pathname == "/createDonationEvent" ? true : false} >
            Create DonationEvent
          </HeaderNavLinks></Link>
          <Link passHref href={'/dashboard'}><HeaderNavLinks active={Router.pathname == "/dashboard" ? true : false} >
            Dashboard
          </HeaderNavLinks></Link>
        </HeaderNavWrapper>
      </div>
      
      <div>
        <HeaderRightWrapper>
          <Wallet />
          <ThemeToggle onClick={ThemeToggler.changeTheme}>
          {ThemeToggler.theme === 'light' ? <DarkModeIcon /> : <Brightness7Icon />}
          </ThemeToggle>
        </HeaderRightWrapper>
      </div>
    
    </div>
  )
};

const HeaderNavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color:;
  padding: 6px;
  height: 50%;
  border-radius: 10px;
  `

const HeaderNavLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.active ? props.theme.bgSubDiv : props.theme.bgDiv };
  height: 100%;
  font-family: 'Roboto';
  margin: 5px;
  border-radius: 10px;
  padding: 0 5px 0 5px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  font-size: small;
`

const HeaderRightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  height: 50%;
`
const ThemeToggle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.bgDiv};
  height: 100%;
  padding: 5px;
  width: 45px;
  border-radius: 12px;
  cursor: pointer;
`

export default Header