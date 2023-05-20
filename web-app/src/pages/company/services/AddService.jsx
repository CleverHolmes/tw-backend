import React, { useEffect, useState } from "react"
import styled from "styled-components"
import AutoFee from "./AutoFee"
import FrequencyDiscounts from "./FrequencyDiscounts"
import Scheduling from "./Scheduling"
import Setup from "./SetUp"
import { useLocation } from "react-router-dom"
import { main_api } from "../../../api/axios_helper"

const tabItems = [
  { name: "Setup" },
  { name: "Scheduling" },
  { name: "Auto Fees" },
  { name: "Frequency Discounts" }
]

function AddService() {
  const [activeTabItem, setActiveTabItem] = useState(tabItems[0])
  const [isUpdatedMode, setIsUpdated] = useState(false)
  const [serviceId, setServiceId] = useState()
  const [data, setData] = useState()
  const location = useLocation()

  useEffect(() => {
    const id = +location.pathname.split("add-service/")[1]
    if (Number.isInteger(id)) {
      setServiceId(id)
      setIsUpdated(true)
    }
  }, [location.pathname])

  const getServiceById = async () => {
    const { data } = await main_api.get("/api/v1/services/" + serviceId + "/")
    setData({ ...data })
  }

  useEffect(() => {
    if (serviceId) {
      getServiceById()
    }
  }, [serviceId])

  return (
    <>
      <TabBar>
        {tabItems.map((item, index) => (
          <TabItem
            active={item === activeTabItem}
            onClick={() => setActiveTabItem(item)}
            key={index}
            disabled={!isUpdatedMode}
          >
            {item.name}
          </TabItem>
        ))}
      </TabBar>
      <ContentContainer>
        {activeTabItem === tabItems[0] && (
          <Setup
            data={data}
            isUpdated={isUpdatedMode}
            setIsUpdated={setIsUpdated}
            getData={getServiceById}
          />
        )}
        {activeTabItem === tabItems[1] && (
          <Scheduling data={data} getData={getServiceById} />
        )}
        {activeTabItem === tabItems[2] && (
          <AutoFee data={data} getData={getServiceById} />
        )}
        {activeTabItem === tabItems[3] && (
          <FrequencyDiscounts data={data} getData={getServiceById} />
        )}
      </ContentContainer>
    </>
  )
}

const TabBar = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 12px 16px;
  height: 61px;
  width: 424px;
  background: #fcfcfc;
  box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  box-sizing: border-box;
`

const ContentContainer = styled.div`
  background: #ffffff;
  box-sizing: border-box;
`
const TabItem = styled.button`
  padding: 9px 8px;
  height: 37px;
  background: ${props =>
    props.active ? "rgba(233, 189, 90, 0.2)" : "transparent"};
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: ${props => (props.active ? "#e9bd5a" : "#000")};
  /* &:not(:last-child) {
    margin-right: 30px;
  } */

  &:not(:disabled) {
    &:hover {
      background: lightblue;
      color: #000;
    }
  }
`
export default AddService
