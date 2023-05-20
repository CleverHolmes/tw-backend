import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { userHasValidToken } from "../../api/auth"
import HeaderNav from "../HeaderNav"
import SidebarNav from "../SidebarNav"

const ProtectedRoute = ({ Page }) => {
  const hasValidToken = userHasValidToken()
  const [isExpanded, setIsExpanded] = useState(false)
  let navigate = useNavigate()
  let pathName = useLocation().pathname;
  useEffect(() => {
    if (!hasValidToken) {
      navigate("/company/signin")
    }
  }, [])
  return hasValidToken ? (
    <Container>
      <SidebarNav />
      <Body expanded={isExpanded}>
        <HeaderNav />
        <Content
          height={pathName.includes('company/message') ? 'calc(100% - 75px)' : 'auto'}
          marginTop={pathName.includes('company/message') && '0'}
          padding={pathName.includes('company/message') && '0'}
        >
          <Page />
        </Content>
      </Body>
    </Container>
  ) : (
    <></>
  )
}

const Container = styled.div`
  display: flex;
`

const Body = styled.div`
  flex: 1;
  /* width: calc(100vw - ${props => (props.expanded ? "240px" : "80px")}); */
  overflow: auto;
`

const Content = styled.div`
  height: ${props => props.height ? props.height : "auto"};
  margin-top: ${props => props.marginTop ? props.marginTop : "20px"};
  padding: ${props => props.padding ? props.padding : "25px"};
`

export default ProtectedRoute
