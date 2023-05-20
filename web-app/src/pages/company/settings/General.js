import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { main_api } from "../../../api/axios_helper"
import CustomInput from "../../../components/CustomInput"

function General() {
  const [isLoading, setIsloading] = useState(false)
  const [activeButton, setActiveButton] = useState("all")

  const [list, setList] = useState([])
  const [tabItems, setTabItems] = useState([
    "General",
    "Client Fields",
    "Pet Fields",
    "Flags",
    "Messaging",
    "Saved Replies",
    "Scheduler",
    "Themes"
  ])
  const [activeTab, setActiveTab] = useState(tabItems[0])

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
      <PrimaryInfoContainer>
        <Title>Primary Contact Details</Title>

        <FormRow>
          <RowItem>
            <CustomInput
              // value={zip}
              // onChange={setzip}
              label={"Company Name"}
              padding={"6px 14px"}
              border={"1px solid #CAD3DC"}
            />
          </RowItem>
        </FormRow>
        <FormRow>
          <RowItem>
            <CustomInput
              // value={zip}
              // onChange={setzip}
              label={"Company Email"}
              padding={"6px 14px"}
              border={"1px solid #CAD3DC"}
            />
          </RowItem>
        </FormRow>
        <FormRow>
          <RowItem>
            <CustomInput
              // value={zip}
              // onChange={setzip}
              label={"Company Website"}
              padding={"6px 14px"}
              border={"1px solid #CAD3DC"}
            />
          </RowItem>
        </FormRow>
        <FormRow>
          <RowItem>
            <CustomInput
              // value={zip}
              // onChange={setzip}
              label={"Primary Phone"}
              padding={"6px 14px"}
              border={"1px solid #CAD3DC"}
            />
          </RowItem>
        </FormRow>
        <FormRow>
          <RowItem>
            <CustomInput
              // value={zip}
              // onChange={setzip}
              label={"Secondary Phone"}
              padding={"6px 14px"}
              border={"1px solid #CAD3DC"}
            />
          </RowItem>
        </FormRow>
      </PrimaryInfoContainer>
      <AddressContainer>
        <Title>Address</Title>

        <FormRow>
          <RowItem>
            <CustomInput
              // value={zip}
              // onChange={setzip}
              label={"Address 1"}
              padding={"6px 14px"}
              border={"1px solid #CAD3DC"}
            />
          </RowItem>
        </FormRow>
        <FormRow>
          <RowItem>
            <CustomInput
              // value={zip}
              // onChange={setzip}
              label={"Address 2 "}
              padding={"6px 14px"}
              border={"1px solid #CAD3DC"}
            />
          </RowItem>
        </FormRow>
        <FormRow>
          <RowItem>
            <CustomInput
              // value={zip}
              // onChange={setzip}
              label={"City"}
              padding={"6px 14px"}
              border={"1px solid #CAD3DC"}
            />
          </RowItem>
        </FormRow>
        <FormRow>
          <RowItem>
            <CustomInput
              // value={zip}
              // onChange={setzip}
              label={"State"}
              padding={"6px 14px"}
              border={"1px solid #CAD3DC"}
            />
          </RowItem>
        </FormRow>
        <FormRow>
          <RowItem>
            <CustomInput
              // value={zip}
              // onChange={setzip}
              label={"Zip Code"}
              padding={"6px 14px"}
              border={"1px solid #CAD3DC"}
            />
          </RowItem>
        </FormRow>
      </AddressContainer>
      <AddressContainer>
        <Title>Locale</Title>

        <FormRow>
          <RowItem>
            {/* <CustomInput
              // value={zip}
              // onChange={setzip}
              label={"Address 1"}
              padding={"6px 14px"}
              border={"1px solid #CAD3DC"}
            /> */}

            <CustomInput
              type="select"
              options={[{ value: 1, label: "US - Dollar" }]}
              // value={selectInvoice}
              // vertical={false}
              // onChange={setSelectInvoice}
              border={"1px solid #E4EAF0"}
              label={"Currency"}
              height="40px"
              selectWidth="230px"
            />
          </RowItem>
        </FormRow>
      </AddressContainer>
      <Button>Save Changes</Button>
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

const PrimaryInfoContainer = styled.div`
  width: 595px;
  // height: 632px;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(110, 110, 110, 0.3);
  border-radius: 16px;
  padding: 35px;
  box-sizing: border-box;
`

const AddressContainer = styled.div`
  width: 595px;
  margin-top: 40px;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(110, 110, 110, 0.3);
  border-radius: 16px;
  padding: 35px;
  box-sizing: border-box;
`

const Title = styled.h2`
  font-weight: 700;
  font-size: 28px;
  line-height: 38px;
  display: flex;
  align-items: flex-end;
  text-align: center;
  color: #414d55;
  margin: 0px;
`

const FormRow = styled.div`
  display: flex;
  margin-top: 40px;
  align-items: center;
`

const RowItem = styled.div`
  width: 100%;
  height: 58px;
  // margin-right: 50px;
`

const Button = styled.button`
  height: 39px;
  background: #e9bd5a;
  border-radius: 6px;
  padding: 6px 20px;
  border: none;
  margin-top: 44px;
  margin-left: 420px;

  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
`

export default General
