import React, { useState } from "react"
import styled from "styled-components"
import Service from "./Service"
import Holiday from "./Holiday"

function Services() {
  const [tabItems, setTabItems] = useState([
    { name: "Services" },
    { name: "Holidays" }
  ])
  const [activeTabItem, setActiveTabItem] = useState(tabItems[0])

  return (
    <>
      <TabBar>
        {tabItems.map((item, index) => (
          <TabItem
            active={item === activeTabItem}
            onClick={() => setActiveTabItem(item)}
            key={index}
          >
            {item.name}
          </TabItem>
        ))}
      </TabBar>
      <ContentContainer>
        {activeTabItem === tabItems[0] && <Service />}
        {activeTabItem === tabItems[1] && <Holiday />}
      </ContentContainer>
    </>
  )
}

const ContentContainer = styled.div`
  background: #ffffff;
  margin-top: 20px;
  padding: 10px;
  box-sizing: border-box;
`

const TabBar = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-start;
  align-items: center;
  padding: 12px 16px;
  height: 61px;
  width: 196px;
  margin-bottom: 54px;
  background: #fcfcfc;
  box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.06);
  border-radius: 6px;
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
  &:not(:last-child) {
    margin-right: 30px;
  }
  &:hover {
    background: lightblue;
  }
`
export default Services
