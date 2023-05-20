import React, { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import styled from "styled-components"
import NavItem from "./NavItem"

import HomeIcon from "../assets/icons/HomeIcon"
import GroupIcon from "../assets/icons/GroupIcon"
import SchedulerIcon from "../assets/icons/SchedulerIcon"
import ApprovalIcon from "../assets/icons/ApprovalIcon"
import InvoicingIcon from "../assets/icons/InvoicingIcon"
import ServiceIcon from "../assets/icons/ServiceIcon"
import ReportIcon from "../assets/icons/ReportIcon"
import SettingsIcon from "../assets/icons/SettingsIcon"
import LogoutIcon from "../assets/icons/LogoutIcon"
import MessageIcon from "../assets/icons/MessageIcon"
import ChatIcon from "../assets/icons/ChatIcon"
import MailIcon from "../assets/icons/MailIcon"

function SidebarNav() {
  const [isHover, setIsHover] = useState(false)
  const [isExtraHover, setIsExtraHover] = useState(false)
  const [selectedHasExtra, setSelectedHasExtra] = useState(false)

  useEffect(() => {
    if (selectedHasExtra) {
      setIsHover(false)
    }
  }, [selectedHasExtra])

  let activeStyle = {
    textDecoration: "underline"
  }

  let activeClassName = "underline"

  return (
    <Container
      onMouseOver={() =>
        !selectedHasExtra ? setIsHover(true) : setIsExtraHover(true)
      }
      onMouseLeave={() =>
        !selectedHasExtra ? setIsHover(false) : setIsExtraHover(false)
      }
    >
      <LogoContainer>
        <Logo
          src={
            isHover || isExtraHover
              ? require("../assets/images/logo.png")
              : require("../assets/images/logo-small.png")
          }
        />
      </LogoContainer>
      <SideMainContainer>
        <NavContainer>
          <NavList>
            <NavListItem>
              <NavItem
                extraCallback={setSelectedHasExtra}
                isHover={isHover}
                text="Home"
                icon={HomeIcon}
                to={"/company"}
              />
            </NavListItem>
            <NavListItem>
              <NavItem
                extraCallback={setSelectedHasExtra}
                isHover={isHover}
                isExtraHover={isExtraHover}
                extras={[
                  { name: "Clients List", link: "" },
                  { name: "Pet List", link: "/pet-list" },
                  { name: "Vet List", link: "/vet-list" },
                  { name: "Keys List", link: "/key-list" }
                ]}
                text="Clients"
                icon={GroupIcon}
                hasExtras={true}
                to={"/company/clients"}
              />
            </NavListItem>
            <NavListItem>
              <NavItem
                extraCallback={setSelectedHasExtra}
                isHover={isHover}
                text="Scheduler"
                icon={SchedulerIcon}
                to={"/scheduler"}
              />
            </NavListItem>
            <NavListItem>
              <NavItem
                extraCallback={setSelectedHasExtra}
                isHover={isHover}
                text="Staff"
                icon={GroupIcon}
                to={"/company/staff"}
              />
            </NavListItem>
            <NavListItem>
              <NavItem
                extraCallback={setSelectedHasExtra}
                isHover={isHover}
                text="Approvals"
                icon={ApprovalIcon}
                to={"/approvals"}
              />
            </NavListItem>
            <NavListItem>
              <NavItem
                extraCallback={setSelectedHasExtra}
                isHover={isHover}
                text="Invoicing"
                icon={InvoicingIcon}
                to={"/company/invoicing"}
              />
            </NavListItem>
            <NavListItem>
              <NavItem
                extraCallback={setSelectedHasExtra}
                isHover={isHover}
                isExtraHover={isExtraHover}
                text="Services"
                icon={ServiceIcon}
                extras={[
                  { name: "Services & Holidays", link: "" },
                  { name: "Packages", link: "/packages" },
                ]}
                hasExtras={true}
                to={"/company/services"}
              />
            </NavListItem>
            <NavListItem>
              <NavItem
                extraCallback={setSelectedHasExtra}
                isHover={isHover}
                text="Reports"
                icon={ReportIcon}
                to={"/reports"}
              />
            </NavListItem>
            <NavListItem>
              <NavItem
                extraCallback={setSelectedHasExtra}
                isHover={isHover}
                text="Settings"
                icon={SettingsIcon}
                to={"/company/settings"}
              />
            </NavListItem>
          </NavList>
        </NavContainer>
        <LogoutContainer>
          <NavItem
            extraCallback={setSelectedHasExtra}
            isHover={isHover}
            text="Log Out"
            icon={LogoutIcon}
            to="/logout"
          />
        </LogoutContainer>
      </SideMainContainer>
    </Container>
  )
}
const Container = styled.div`
  width: 80px;
  min-height: 100vh;
  border-right: 1px solid #e4eaf0;
  display: flex;
  flex-direction: column;
  &:hover {
    min-width: 240px;
  }
`
const LogoContainer = styled.div`
  width: 100%;
  height: 75px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  border-bottom: 1px solid #E4EAF0;
  padding: 15px 0;
`
const SideMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`
const Logo = styled.img`
  height: 55.52220916748047px;
  width: 165.99986267089844px;
  object-fit: contain;
`

const NavContainer = styled.nav`
  width: 100%;
  padding-top: 70px;
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`

const NavList = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
`

const NavListItem = styled.li`
  list-style-type: none;
  margin: 10px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  // align-items: center;
  margin-left: 12px;
`

const LogoutContainer = styled.div`
  width: 100%;
  margin-bottom: 50px;
  display: flex;
  align-items: flex-start;
  // justify-content: center;
  margin-left: 12px;
`

export default SidebarNav
