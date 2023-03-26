import React from 'react'
import styled from 'styled-components';
import HeaderLogo from './headerLogo'
import HeaderNav from './headerNav'
import HeaderRight from './headerRight'

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderLogo />
      <HeaderNav />
      <HeaderRight />
    </HeaderWrapper>
  )
};

const HeaderWrapper = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export default Header