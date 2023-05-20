import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

function Terms() {
  let navigate = useNavigate()
  const [active_tab, setActiveTab] = useState("ToU")

  return (
    <Container>
      <Header>
        <MenuList>
          <MenuItem
            onClick={() => setActiveTab("ToU")}
            active={active_tab === "ToU"}
          >
            Terms of Use
          </MenuItem>
          <MenuItem
            onClick={() => setActiveTab("Pp")}
            active={active_tab === "Pp"}
          >
            Privacy policy
          </MenuItem>
          <MenuItem
            onClick={() => setActiveTab("ToS")}
            active={active_tab === "ToS"}
          >
            Terms of Service
          </MenuItem>
        </MenuList>
      </Header>
    </Container>
  )
}
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`

const Header = styled.div`
  width: 100%;
  height: 64px;
  border-bottom: 1px solid #d8d8d8;
  padding-left: 103px;
  display: flex;
`

const MenuList = styled.ul`
  margin: 0;
  height: 100%;
  display: flex;
`

const MenuItem = styled.li`
  padding: 33px 30px 19px 30px;
  list-style-type: none;

  font-weight: 400;
  font-size: 17px;
  line-height: 11px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.01em;
  color: #000000;
  cursor: pointer;

  border-bottom: ${props => (props.active ? "4px solid #E9BD5A" : "0")};

  &:hover {
    border-bottom: 4px solid lightblue;
  }
`

export default Terms
