import React, { useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MessageIcon from "../assets/icons/MessageIcon"
import NotificationIcon from "../assets/icons/NotificationIcon"
import SearchIcon from "../assets/icons/SearchIcon"
import TaskIcon from "../assets/icons/TaskIcon"

function HeaderNav() {
  let navigate = useNavigate()
  let pathName = useLocation().pathname;

  return (
    <HeaderContainer>
      <PageTitle>{
        pathName.includes('invoicing') ? 'Invoice'
          : pathName.includes('services') ? 'Services and Holidays'
            : pathName.includes('company/message') ? 'Messages'
              : ''}
      </PageTitle>
      <HeaderRightContainer>
        <SearchContainer>
          <LogoSearch>{SearchIcon}</LogoSearch>
          <Search placeholder="Search anything here" />
        </SearchContainer>
        <NotificationContainer>
          <Logo>{TaskIcon}</Logo>
        </NotificationContainer>
        <NotificationContainer>
          <Logo>{MessageIcon}</Logo>
        </NotificationContainer>
        <NotificationContainer>
          <Logo>{NotificationIcon}</Logo>
        </NotificationContainer>
        <UserContainer></UserContainer>
      </HeaderRightContainer>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  width: 100%;
  height: 75px; 
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-bottom: 1px solid #E4EAF0;;
`

const HeaderRightContainer = styled.div`
  display: flex;
`

const NotificationContainer = styled.div`
  height: 100%;
  width: 48px;
  border-radius: 8px;
  border: 1px solid #e4eaf0;
  box-sizing: border-box;
  margin-right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const SearchContainer = styled.div`
  height: 100%;
  width: 352px;
  border-radius: 8px;
  border: 1px solid #e4eaf0;
  box-sizing: border-box;
  margin-right: 16px;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
`

const UserContainer = styled.div`
  height: 100%;
  width: 240px;
  border-radius: 8px;
  border: 1px solid #e4eaf0;
  padding: 12px 16px 12px 16px;
  box-sizing: border-box;
`

const Logo = styled.svg`
  height: 24px;
  width: 24px;
  object-fit: contain;
  fill: transparent;
`

const LogoSearch = styled.svg`
  height: 24px;
  width: 24px;
  margin-left: 16px;
  object-fit: contain;
  fill: transparent;
  position: absolute;
`

const Search = styled.input`
  height: 95%;
  width: 100%;
  object-fit: contain;
  border: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  padding-left: 40px;
  &:focus {
    border: none;
  }
`

const PageTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: #414D55;
`;

export default HeaderNav
