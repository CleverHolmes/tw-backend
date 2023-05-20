import React, { useEffect, useState } from "react"
import { CSVLink } from "react-csv"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { main_api } from "../../../api/axios_helper"
import CreateIcon from "../../../assets/icons/CreateIcon"
import ExportIcon from "../../../assets/icons/ExportIcon"
import CustomInput from "../../../components/CustomInput"
import IconButton from "../../../components/IconButton"
import Table from "../../../components/Table"

function PetList() {
  const [activeTab, setActiveTab] = useState("pets")
  const [activeButton, setActiveButton] = useState("all")

  const [isLoading, setIsloading] = useState(false)

  const [list, setList] = useState([])

  const GetPets = () => {
    setIsloading(true)
    main_api
      .get("/api/v1/client_pet/")
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
    GetPets()
  }, [])

  return (
    <>
      <ActionButtons>
        <TabContainer>
          <TabButton
            onClick={() => setActiveTab("pets")}
            active={activeTab === "pets"}
          >
            PETS
          </TabButton>
          <TabButton
            onClick={() => setActiveTab("vaccinations")}
            active={activeTab === "vaccinations"}
            marginLeft="30px"
          >
            Vaccinations
          </TabButton>
        </TabContainer>

        <CSVLink
          data={list}
          filename={"pet-list.csv"}
          style={{ textDecoration: "none" }}
          target="_blank"
        >
          <IconButton
            fill="#fff"
            border="1px solid #D0D5DD"
            margin="0 20px"
            text="Download"
            icon={ExportIcon}
          />
        </CSVLink>
      </ActionButtons>
      {activeTab == "vaccinations" && (
        <>
          <VaccinationTabContainer>
            <VaccinationButton
              onClick={() => setActiveButton("all")}
              active={activeButton === "all"}
              marginLeft="30px"
            >
              All Vaccinations
            </VaccinationButton>
            <VaccinationButton
              onClick={() => setActiveButton("missing")}
              active={activeButton === "missing"}
              marginLeft="30px"
            >
              Missing Vaccinations
            </VaccinationButton>
          </VaccinationTabContainer>
          <ActionButtons>
            <SelectContainer>
              <CustomInput
                type="select"
                label="For"
                placeholder=""
                options={[{ value: 1, label: "All Pets" }]}
                value={{ value: 1, label: "All Pets" }}
                vertical={false}
                border={"1px solid #E4EAF0"}
                // onChange={selected_staff_number}
              />
            </SelectContainer>
            {activeButton === "all" ? (
              <>
                <SelectContainer>
                  <CustomInput
                    type="select"
                    label="For vaccinations that"
                    placeholder=""
                    options={[{ value: 1, label: "Have any expiration date" }]}
                    value={{ value: 1, label: "Have any expiration date" }}
                    vertical={false}
                    border={"1px solid #E4EAF0"}
                    // onChange={selected_staff_number}
                  />
                </SelectContainer>
                <SelectContainer>
                  <CustomInput
                    type="select"
                    label="Include"
                    placeholder=""
                    options={[{ value: 1, label: "All Vaccinations" }]}
                    value={{ value: 1, label: "All Vaccinations" }}
                    vertical={false}
                    border={"1px solid #E4EAF0"}
                    // onChange={selected_staff_number}
                  />
                </SelectContainer>
              </>
            ) : (
              <SelectContainer>
                <CustomInput
                  type="select"
                  label="Pets that"
                  placeholder=""
                  options={[{ value: 1, label: "Have no vaccination" }]}
                  value={{ value: 1, label: "Have no vaccination" }}
                  vertical={false}
                  border={"1px solid #E4EAF0"}
                  // onChange={selected_staff_number}
                />
              </SelectContainer>
            )}
            <ActionButton marginLeft="30px">Run Report</ActionButton>
          </ActionButtons>
        </>
      )}
      <Table
        headers={[
          { title: "Name", id: "name", clickable: true, hasProfileImage: true },
          { title: "Birth Date", id: "birth_date" },
          { title: "Primary Vet", id: "primary_vet", clickable: true }
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

export default PetList
