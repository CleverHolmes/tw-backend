import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { main_api } from "../../../../api/axios_helper"
import ReloadIcon from "../../../../assets/icons/ReloadIcon"
import CustomInput from "../../../../components/CustomInput"

function History() {
  const [activeTab, setActiveTab] = useState("misc")
  let { clientId } = useParams()

  const [isLoading, setIsloading] = useState(false)

  const [list, setList] = useState([])

  const getHistory = () => {
    setIsloading(true)
    main_api
      .get(`/api/v1/history/?cid=${clientId}`)
      .then(({ data }) => {
        setList(data)
        setIsloading(false)
      })
      .catch(error => {
        console.log(error?.response?.data)
        setIsloading(false)
      })
  }

  useEffect(() => {
    getHistory()
  }, [])

  return (
    <>
      <ActionButtons>
        <TabContainer>
          <TabButton
            onClick={() => setActiveTab("misc")}
            active={activeTab === "misc"}
          >
            Miscellaneous
          </TabButton>
          <TabButton
            onClick={() => setActiveTab("conversations")}
            active={activeTab === "conversations"}
            marginLeft="30px"
          >
            Conversations
          </TabButton>
          <TabButton
            onClick={() => setActiveTab("updates")}
            active={activeTab === "updates"}
            marginLeft="30px"
          >
            Profile Updates
          </TabButton>
        </TabContainer>
      </ActionButtons>
      <FilterContainer>
        <Result>Max Results:</Result>

        <SelectContainer>
          <CustomInput
            type="select"
            placeholder=""
            options={[{ value: 1, label: "250" }]}
            value={{ value: 1, label: "250" }}
            vertical={false}
            border={"1px solid #E4EAF0"}
            // onChange={selected_staff_number}
          />
        </SelectContainer>

        <SelectContainer>
          <CustomInput
            type="select"
            placeholder=""
            options={[{ value: 1, label: "All Time" }]}
            value={{ value: 1, label: "All Time" }}
            vertical={false}
            border={"1px solid #E4EAF0"}
            // onChange={selected_staff_number}
          />
        </SelectContainer>
        <ReloadIconContainer>{ReloadIcon}</ReloadIconContainer>
      </FilterContainer>
      <ListLogs>
        <CurrentDate>Today</CurrentDate>
        {list.map((item, i) => (
          <LogCard key={i}>
            <ProfileImage
              src={
                "https://cdn.pixabay.com/photo/2016/01/04/21/57/woman-1121654__480.png"
              }
            />
            <LogText>{item?.user}</LogText>
            <LogText2>
              {item?.action_name + " " + item?.action_details}
            </LogText2>
          </LogCard>
        ))}
        {list.length == 0 && <p>...</p>}
      </ListLogs>
    </>
  )
}
const ActionButtons = styled.div`
  display: flex;
  margin-bottom: 27px;
`

const TabContainer = styled.div`
  padding: 10px 16px;
  height: 54px;
  box-sizing: border-box;
  background: #fcfcfc;
  box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  display: flex;
`
const TabButton = styled.button`
  background-color: ${props => (props.active ? "#FBF2DE" : "transparent")};
  padding: 9px 8px;
  height: 34px;
  border-radius: 4px;
  border: none;
  margin-left: ${props => props.marginLeft ?? "0"};
  cursor: pointer;

  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
  color: ${props => (props.active ? "#E9BD5A" : "#000")};

  &:hover {
    background-color: lightblue;
  }
`
const VaccinationTabContainer = styled.div`
  height: 24px;
  width: 274px;
  display: flex;
  box-sizing: border-box;
  background: #f2f6f9;
  border: 1px solid #d8e2e8;
  border-radius: 6px;
  margin-bottom: 20px;
  justify-content: space-between;
`

const VaccinationButton = styled.button`
  background-color: ${props => (props.active ? "#FFFFFF" : "transparent")};
  padding: 0 16px;
  height: 34px;
  cursor: pointer;
  // width: 123px;
  height: 24px;
  border: ${props => (props.active ? "1px solid #d8e2e8" : "none")};
  border-radius: 6px;

  font-weight: 400;
  font-size: 12px;
  line-height: 11px;
  color: ${props => (props.active ? "#1B2126" : "#9FA9B2")};

  &:hover {
    background-color: lightblue;
  }
`

const SelectContainer = styled.div``

const ActionButton = styled.button`
  background-color: #e9bd5a;
  padding: 6px 14px;
  height: 28px;
  border-radius: 4px;
  border: none;
  margin-left: ${props => props.marginLeft ?? "0"};
  cursor: pointer;
  align-self: center;

  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
  color: #ffffff;

  &:hover {
    background-color: lightblue;
  }
`

const FilterContainer = styled.div`
  height: 64px;
  background: #f7f8f9;
  border-radius: 4px;
  padding: 12px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`

const ReloadIconContainer = styled.svg`
  width: 24px;
  height: 24px;
  background: #e9bd5a;
  border-radius: 6px;
  padding: 6px 5px;
  fill: #e9bd5a;
  box-sizing: border-box;
  cursor: pointer;
  margin-left: 20px;
`

const Result = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  text-transform: uppercase;
  margin-left: 30px;
  color: #000000;
`
const ListLogs = styled.div`
  margin-top: 20px;
`

const CurrentDate = styled.span`
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.01px;
  color: #000000;
  margin-bottom: 4px;
`

const LogCard = styled.div`
  background: #ffffff;
  border: 1px solid #ffffff;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  box-sizing: border-box;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 10px 17.38px;
  margin-bottom: 5px;
`
const ProfileImage = styled.img`
  width: 62.83px;
  height: 60px;
  border-radius: 100%;
  object-fit: cover;
`
const LogText = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  letter-spacing: 1.21205px;
  color: #0496ff;
  margin-left: 21px;
`
const LogText2 = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  letter-spacing: 1.21205px;
  color: #000000;
  margin-left: 5px;
`

export default History
