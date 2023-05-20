import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import HeaderNav from "../../components/HeaderNav"
import SidebarNav from "../../components/SidebarNav"

function Home() {
  let navigate = useNavigate()

  return (
    <>
      <Title>Getting Started Guide</Title>
      <Steps>
        <ProgressContainer>
          <ProgressText>3 steps to complete</ProgressText>
          <ProgressStepsContainer>
            {new Array(10).fill(0).map((d, i) => (
              <ProgressSteps
                radius={
                  i == 0
                    ? "6px 0px 0px 6px"
                    : i == 9
                    ? "0px 6px 6px 0px"
                    : "0px 0px 0px 0px"
                }
                completed={i < 7}
                key={i}
              />
            ))}
          </ProgressStepsContainer>
        </ProgressContainer>

        <ItemList>
          <CheckBoxContainer>
            <CheckBox checked type="checkbox" />
          </CheckBoxContainer>
          <TextContent>1. Create an Account</TextContent>
        </ItemList>
        <Divider />
        <ItemList>
          <CheckBoxContainer>
            <CheckBox checked type="checkbox" />
          </CheckBoxContainer>
          <TextContent>2. Adding a Service</TextContent>
        </ItemList>
        <Divider />
        <ItemList>
          <CheckBoxContainer>
            <CheckBox checked type="checkbox" />
          </CheckBoxContainer>
          <TextContent>3. Adding a Client</TextContent>
        </ItemList>
        <Divider />
        <ItemList>
          <CheckBoxContainer>
            <CheckBox checked type="checkbox" />
          </CheckBoxContainer>
          <TextContent>4. Scheduling an Event</TextContent>
        </ItemList>
        <Divider />
        <ItemList>
          <CheckBoxContainer>
            <CheckBox type="checkbox" />
          </CheckBoxContainer>
          <TextContent>5. Adding a Staff Member</TextContent>
        </ItemList>
      </Steps>
    </>
  )
}

const Title = styled.h1`
  font-weight: 700;
  font-size: 30px;
  line-height: 41px;
  color: #414d55;
`

const Steps = styled.div`
  margin-top: 20px;
  border-radius: 16px;
  border: 1px solid #e4eaf0;
  width: 100%;
  max-width: 1084px;
  padding: 9px 0 20px 0;
  overflow: auto;
`

const ProgressContainer = styled.div`
  width: 1033px;
  height: 60.62px;
  margin-left: 26px;
  margin-bottom: 10px;
`

const ProgressText = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 1.21205px;
  color: #000000;
`

const ProgressStepsContainer = styled.div`
  margin-top: 7px;
  width: 1033px;
  height: 31.62px;
  display: flex;
  justify-content: space-between;
`

const ProgressSteps = styled.div`
  width: 100.14px;
  height: 31.62px;
  background: ${props => (props?.completed ? "#e9bd5a" : "#D9D9D9")};
  border-radius: ${props => props?.radius ?? "0px"};
`

const Divider = styled.div`
  width: 100%;
  height: 2px;
  background: #d9d9d9;
`

const ItemList = styled.div`
  width: 100%;
  height: 55px;
  padding-left: 26px;
  display: flex;
  align-items: center;
`

const TextContent = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  color: #000000;
  letter-spacing: 1.21205px;
`

const CheckBoxContainer = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #a2c4d4;
  margin-right: 19px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CheckBox = styled.input`
  height: 12px;
  width: 12px;
  border-radius: 2px;
  margin: 6px;
  appearance: none;
  margin: 0px;
  &:checked {
    background-color: #e9bd5a;
  }
`

export default Home
