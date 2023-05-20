import React, { useState } from "react"
import styled from "styled-components"
import CreateIcon from "../../../assets/icons/CreateIcon"
import CustomInput from "../../../components/CustomInput"
import IconButton from "../../../components/IconButton"
import Table from "../../../components/Table"
import CheckIcon from "../../../assets/images/check_icon.svg"

const holidayData = [
  {
    name: "Christmas Day",
    when: "December 25th",
    rate: "$135.00"
  },
  {
    name: "Independence Day",
    when: "Jul 4, 2022",
    rate: "$180.00"
  },
  {
    name: "Thanksgiving",
    when: "Nov 24, 2022",
    rate: "$120.00"
  },
  {
    name: "Labor Day",
    when: "Sep 5, 2022",
    rate: "$130.00"
  }
]

const disabledHoliday = [
  {
    service: "Standard Visit",
    cost: "$35.00",
    staffRate: "$35.00",
    taxable: "No"
  },
  {
    service: "Overnight Stay",
    cost: "$80.00",
    staffRate: "$80.00",
    taxable: "No"
  }
]
const Holiday = () => {
  const [holidays, setHolidays] = useState(holidayData)
  const [disabledHolidays, setDisabledHolidays] = useState(disabledHoliday)
  const [staffRate, setStaffRate] = useState(0)
  const [isCreate, setIsCreate] = useState(false)

  return (
    <>
      <StaffRateContainer>
        <InputContainer>
          <CustomInput
            label="Staff Rate for Holidays:"
            labelSize="14px"
            labelWeight="600"
            placeholder="50"
            width="64px"
            height="35px"
            margin="0 10px"
            vertical={false}
            padding="3px"
            border={"1px solid #E4EAF0"}
            value={staffRate}
            onChange={setStaffRate}
          />
        </InputContainer>
        <InputContainer>
          <CustomInput
            type="select"
            options={[{ value: 1, label: "$" }]}
            value={{ value: 1, label: "$" }}
            vertical={false}
            border={"1px solid #E4EAF0"}
            height="28px"
            selectHeight="35px"
            // selectWidth="48px"
            // onChange={selected_staff_number}
          />
        </InputContainer>
      </StaffRateContainer>
      <ActionButtons>
        <IconButton
          background="#E9BD5A"
          color={"#fff"}
          text="New Client"
          icon={CreateIcon}
          margin="0 20px 0 0"
          onClick={() => setIsCreate(true)}
        />
      </ActionButtons>
      <Table
        headers={[
          { title: "Name", id: "name" },
          { title: "When", id: "when" },
          { title: "Rate", id: "rate" },
          {
            title: "",
            id: "edit",
            clickable: true
          }
        ]}
        data={holidays}
      />
      <DisableTitle>Disabled Holidays</DisableTitle>
      <Table
        headers={[
          { title: "Service", id: "service" },
          { title: "Cost", id: "cost" },
          { title: "Staff Rate", id: "staffRate" },
          { title: "Taxable", id: "taxable" },
          {
            title: "",
            id: "edit",
            clickable: true
          }
        ]}
        data={disabledHolidays}
      />
    </>
  )
}

const StaffRateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  margin-bottom: 40px;
`
const InputContainer = styled.div`
  display: flex;
  align-items: center;
`

const ActionButtons = styled.div`
  display: flex;
  margin-bottom: 40px;
`
const DisableTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #414d55;
  margin-top: 40px;
  margin-bottom: 20px;
`
export default Holiday
