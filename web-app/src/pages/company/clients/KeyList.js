import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { main_api } from "../../../api/axios_helper"
import CreateIcon from "../../../assets/icons/CreateIcon"
import ExportIcon from "../../../assets/icons/ExportIcon"
import CustomInput from "../../../components/CustomInput"
import IconButton from "../../../components/IconButton"
import Table from "../../../components/Table"

function KeyList() {
  const [activeTab, setActiveTab] = useState("keys")
  const [activeButton, setActiveButton] = useState("missing")

  const [isLoading, setIsloading] = useState(false)

  const [list, setList] = useState([])

  const GetVet = () => {
    setIsloading(true)
    main_api
      .get("/api/v1/keys/")
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
    GetVet()
  }, [])

  return (
    <>
      <ActionButtons>
        <TabContainer>
          <TabButton
            onClick={() => setActiveTab("keys")}
            active={activeTab === "keys"}
          >
            Keys
          </TabButton>
          <TabButton
            onClick={() => setActiveTab("key-report")}
            active={activeTab === "key-report"}
            marginLeft="30px"
          >
            Key Report
          </TabButton>
        </TabContainer>
        {activeTab === "keys" && (
          <>
            <IconButton
              background="#E9BD5A"
              color={"#fff"}
              text="Bulk Reassign Keys"
              icon={CreateIcon}
            />
            <IconButton
              fill="#fff"
              border="1px solid #D0D5DD"
              margin="0 20px"
              text="Download Key Data"
              icon={ExportIcon}
            />
          </>
        )}
      </ActionButtons>

      {activeTab == "key-report" && (
        <>
          <VaccinationTabContainer>
            <VaccinationButton
              onClick={() => setActiveButton("missing")}
              active={activeButton === "missing"}
              marginLeft="30px"
            >
              Missing Keys
            </VaccinationButton>
            <VaccinationButton
              onClick={() => setActiveButton("none-needed")}
              active={activeButton === "none-needed"}
              marginLeft="30px"
            >
              Key No Longer Needed
            </VaccinationButton>
          </VaccinationTabContainer>
          <ActionButtons>
            {activeButton == "missing" ? (
              <>
                <SelectContainer>
                  <CustomInput
                    type="select"
                    label="For visits on or between"
                    placeholder=""
                    options={[
                      { value: 1, label: "Jun 30 2022 to Jul 6, 2022" }
                    ]}
                    value={{ value: 1, label: "Jun 30 2022 to Jul 6, 2022" }}
                    vertical={false}
                    border={"1px solid #E4EAF0"}
                    // onChange={selected_staff_number}
                  />
                </SelectContainer>
                <SelectContainer>
                  <CustomInput
                    type="select"
                    label="assigned to"
                    placeholder=""
                    options={[{ value: 1, label: "Any Staff" }]}
                    value={{ value: 1, label: "Any Staff" }}
                    vertical={false}
                    border={"1px solid #E4EAF0"}
                    // onChange={selected_staff_number}
                  />
                </SelectContainer>
              </>
            ) : (
              <>
                <SelectContainer>
                  <CustomInput
                    type="select"
                    label="Show keys assigned to staff who have no visits on or between"
                    placeholder=""
                    options={[
                      { value: 1, label: "Jun 30 2022 to Jul 6, 2022" }
                    ]}
                    value={{ value: 1, label: "Jun 30 2022 to Jul 6, 2022" }}
                    vertical={false}
                    border={"1px solid #E4EAF0"}
                    // onChange={selected_staff_number}
                  />
                </SelectContainer>
                <SelectContainer>
                  <CustomInput
                    type="select"
                    label="limit to"
                    placeholder=""
                    options={[{ value: 1, label: "Any Staff" }]}
                    value={{ value: 1, label: "Any Staff" }}
                    vertical={false}
                    border={"1px solid #E4EAF0"}
                    // onChange={selected_staff_number}
                  />
                </SelectContainer>
              </>
            )}
          </ActionButtons>
          <ActionButton>Run Report</ActionButton>
        </>
      )}
      <Table
        headers={[
          { title: "Name/Code", id: "keys" },
          { title: "Client", id: "user", clickable: true },
          { title: "With", id: "with" }
        ]}
        data={list}
      />
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
  margin-right: 18px;
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
  margin-bottom: 20px;

  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
  color: #ffffff;

  &:hover {
    background-color: lightblue;
  }
`

export default KeyList
