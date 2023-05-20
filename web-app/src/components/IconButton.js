import React, { useState } from "react"
import styled from "styled-components"

function IconButton({
  background,
  color,
  border,
  margin,
  text,
  icon,
  padding,
  fill,
  onClick = () => null
}) {
  return (
    <Container
      onClick={onClick}
      border={border}
      margin={margin}
      bg={background}
      padding={padding}
    >
      <Icon fill={fill}>{icon}</Icon>
      <Text color={color}>{text}</Text>
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  align-items: center;
  padding: ${props => props.padding ?? "11px 16px"};
  border-radius: 4px;
  cursor: pointer;
  background: ${props => props.bg ?? "#fff"};
  border: ${props => props.border ?? "none"};
  margin: ${props => props.margin ?? "0"};
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

export default IconButton
