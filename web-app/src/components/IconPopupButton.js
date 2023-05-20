import React, { useState } from "react"
import styled from "styled-components"
import WhiteArrowDownIcon from '../assets/images/arrow-down_icon_white.svg'
import Dropdown from 'react-bootstrap/Dropdown';

function IconPopupButton({
  background,
  color,
  border,
  margin,
  text,
  icon,
  fill,
  onClick = () => null
}) {
  return (
    <DropdownContainer bg={background} border={border} margin={margin}>
      <Dropdown.Toggle
        border={border}
        margin={margin}
        bg={background}
      >
        <TextContainer>
          <Icon fill={fill}>{icon}</Icon>
          <Text color={color}>{text}</Text>
        </TextContainer>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#">Action</Dropdown.Item>
        <Dropdown.Item href="#">Another action</Dropdown.Item>
        <Dropdown.Item href="#">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </DropdownContainer>
  )
}

const DropdownContainer = styled(Dropdown)`
  .dropdown-toggle {
    background-color: ${props => props.bg ?? '#E9BD5A'};
    border-color: ${props => props.bg ?? '#E9BD5A'};
    border: ${props => props.border ?? "none"};
    margin: ${props => props.margin ?? "0"};
    border-radius: 4px;
    height: 44px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    &:hover, &:focus, &:focus-visible, &:active {
      background-color: ${props => props.bg ?? '#E9BD5A'} !important;
      border-color: ${props => props.bg ?? '#E9BD5A'} !important;
      box-shadow: none !important;
    }
  }
`;

const TextContainer = styled.div`
    display: flex;
    align-items: center;
    margin-right: 16px;
    padding-right: 16px;
    height: 100%;
    border-right: 1px solid #fff;
`

const Icon = styled.svg`
  height: 20px;
  width: 20px;
  resize-mode: contain;
  stroke: ${props => props.color ?? "#000"};
  fill: ${props => props.fill ?? "#000"};
`

const Text = styled.span`
  margin-left: 13px;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: ${props => props.color ?? "#191D23"};
`
const IconCover = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #fff;
  width: 44px;
  height: 44px;
`

const IconArrow = styled.img`
  width: 11px;
  height: 7px;
`

export default IconPopupButton
