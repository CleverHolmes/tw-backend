import React, { useEffect, useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import CreateIcon from "../assets/icons/CreateIcon"

function NavItem({
  text,
  icon,
  to = "",
  hasExtras,
  isExtraHover,
  isHover,
  extraCallback,
  extras = []
}) {
  let navigate = useNavigate()

  const { pathname } = useLocation()
  var dd = pathname.includes(to)
  const [is_active, setIsActive] = useState(
    pathname == to || pathname.includes(to)
  )
  useEffect(() => {
    is_active && extraCallback(hasExtras)
  }, [])

  useEffect(() => {
    setIsActive(pathname == to || pathname.includes(to))
  }, [pathname])

  return (
    <>
      <Container
        onClick={() => navigate(to)}
        isHover={isHover}
        active={is_active}
        type="button"
      >
        <LogoContainer isHover={isHover}>
          <Logo active={is_active}>{icon}</Logo>
        </LogoContainer>
        {isHover && (
          <>
            <LogoText active={is_active}>{text}</LogoText>
            {hasExtras && (
              <ExtraContainer>
                <Logo active={is_active}>{CreateIcon}</Logo>
              </ExtraContainer>
            )}
          </>
        )}
      </Container>
      {hasExtras && is_active && isExtraHover && (
        <ExtraContent>
          {extras.map((e, i) => (
            <ExtraButton
              key={i}
              onClick={() => navigate(to + e.link)}
              active={
                pathname.replace(to, "") == e.link
              }
            >
              {e.name}
            </ExtraButton>
          ))}
        </ExtraContent>
      )}
    </>
  )
}
const Container = styled.button`
  width: ${props => (props.isHover ? "180px" : "56px")};
  height: 48px;
  background: ${props => (props.active ? "#e9bd5a" : "transparent")};
  display: flex;
  border-radius: 8px;
  padding: 12px 16px 12px 16px;
  border-width: 0px;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: lightblue;
  }
`
const LogoContainer = styled.div`
  height: 24px;
  width: 24px;
  margin-right: ${props => (props.isHover ? "16px" : "0")};
`
const ExtraContainer = styled.div`
  height: 24px;
  width: 24px;
  margin-left: auto;
`

const Logo = styled.svg`
  height: 100%;
  width: 100%;
  object-fit: contain;
  stroke: ${props => (props.active ? "#fff" : "#8B8698")};
  fill: transparent;
`

const LogoText = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: ${props => (props.active ? "#fff" : "#8b8698")};
`

const ExtraContent = styled.div`
  padding-top: 50px;
  width: 140px;
  height: 100%;
  position: absolute;
  left: 77px;
  // left: 100px;
  top: 75px;
  border-left: 1px solid #e4eaf0;
  padding-left: 18px;
`
const ExtraButton = styled.button`
  width: 135px;
  height: 29px;
  background: ${props => (props.active ? "#e9bd5a" : "transparent")};
  border-radius: 5px;
  border: none;
  color: ${props => (props.active ? "#fff" : "#8B8698")};
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    background: lightblue;
  }
`

export default NavItem
