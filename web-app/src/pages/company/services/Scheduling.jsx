import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import CustomInput from "../../../components/CustomInput"
import axios from "axios"
import { Toast } from "primereact/toast"
import { main_api } from "../../../api/axios_helper"

const serviceData = [
  {
    value: "not limited",
    label: "Not Limited To Specific Blocks"
  },
  {
    value: "limited",
    label: "Limited to specific blocks"
  }
]

const weekDays = [
  { title: "Sunday", value: "Sun" },
  { title: "Monday", value: "Mon" },
  { title: "Tuesday", value: "Tue" },
  { title: "Wednesday", value: "Wed" },
  { title: "Thursday", value: "Thu" },
  { title: "Friday", value: "Fri" },
  { title: "Saturday", value: "Sat" }
]

const dayShift = [
  { title: "Early Morning", value: "Ear" },
  { title: "Morning", value: "Mor" },
  { title: "Afternoon", value: "Aft" },
  { title: "Evening", value: "Eve" }
]

function Scheduling({ data, getData }) {
  const [service, setService] = useState(serviceData[0])
  const [selectedSchedule, setSelectedSchedule] = useState([])
  const navigate = useNavigate()
  const toast = useRef(null)

  const cancelChange = () => {
    navigate("/company/services")
  }

  const handleSelect = (e, value) => {
    if (value.length === 3 && dayShift.find(item => item.value === value)) {
      if (e.target.checked) {
        setSelectedSchedule([
          ...selectedSchedule.filter(item => !item.includes(value)),
          ...weekDays.map(item => item.value + "-" + value)
        ])
      } else {
        setSelectedSchedule([
          ...selectedSchedule.filter(item => !item.includes(value))
        ])
      }
    } else if (selectedSchedule.find(item => item.includes(value))) {
      setSelectedSchedule([
        ...selectedSchedule.filter(item => !item.includes(value))
      ])
    } else {
      if (value.length === 3) {
        if (weekDays.find(item => item.value === value)) {
          value = dayShift.map(item => value + "-" + item.value)
          setSelectedSchedule([...selectedSchedule, ...value])
        } else {
          value = []
          if (e.target.checked) {
            dayShift.map(item =>
              weekDays.map(week => value.push(week.value + "-" + item.value))
            )
          }
          setSelectedSchedule([...value])
        }
      } else {
        setSelectedSchedule([...selectedSchedule, value])
      }
    }
  }

  const addServiceScheduling = async () => {
    const formData = new FormData()
    if (service.value === "limited") {
      formData.append("service_scheduling", selectedSchedule.join(", "))
    } else {
      formData.append("service_scheduling", service.value)
    }
    const res = await main_api.put(
      "/api/v1/services/" + data.id + "/",
      formData
    )

    if (res.status === 201 || res.status === 200) {
      toast.current.show({
        severity: "success",
        summary: "Saved!",
        life: 3000
      })
      getData()
    } else {
      toast.current.show({ severity: "error", summary: "Error", life: 3000 })
    }
  }

  useEffect(() => {
    if (service.value === "not limited") setSelectedSchedule([])
  }, [service])

  useEffect(() => {
    if (data.service_scheduling === "not limited") {
      setService(serviceData[0])
    } else {
      setService(serviceData[1])
      if (data.service_scheduling) {
        setSelectedSchedule(data.service_scheduling.split(","))
      }
    }
  }, [data])

  return (
    <>
      <Toast ref={toast} />
      <FormPanel>
        <ActionButtons>
          <ActionButton onClick={addServiceScheduling}>
            Save Change
          </ActionButton>
          <ActionButton bg="#CAD3DC" onClick={cancelChange}>
            Cancel Changes
          </ActionButton>
        </ActionButtons>
        <FormTitle>Limit To Times</FormTitle>
        <MainPanel>
          <FormItem>
            <FormLabel>Service Is</FormLabel>
            <CustomInput
              type="select"
              options={serviceData}
              value={service}
              onChange={setService}
              vertical={false}
              border={"1px solid #E4EAF0"}
              height="40px"
              selectHeight="40px"
              selectWidth="264px"
            />
          </FormItem>
          {service.value === "limited" && (
            <>
              <FormItem>
                <FormLabel>Toggle All</FormLabel>
                <CheckboxLabel>
                  <CheckBoxContainer>
                    <CheckBox
                      type="checkbox"
                      onChange={e => handleSelect(e, "all")}
                    />
                  </CheckBoxContainer>
                  All Items
                </CheckboxLabel>
              </FormItem>
              <FormItem align="start">
                <FormLabel>Toggle Schedule Blocks</FormLabel>
                <div>
                  {dayShift.map((day, index) => (
                    <CheckboxLabel margin="0 0 5px 0" key={index}>
                      <CheckBoxContainer>
                        <CheckBox
                          type="checkbox"
                          onChange={e => handleSelect(e, day.value)}
                        />
                      </CheckBoxContainer>
                      {day.title}
                    </CheckboxLabel>
                  ))}
                </div>
              </FormItem>
            </>
          )}
        </MainPanel>
        {service.value === "limited" && (
          <>
            <SelectTable>
              {weekDays.map((weekDay, index) => (
                <TableColumn key={index}>
                  <CheckboxLabel className="title table-checkbox">
                    {weekDay.title}
                    <CheckBoxContainer>
                      <CheckBox
                        type="checkbox"
                        name="taxable"
                        checked={
                          selectedSchedule.find(k => k.includes(weekDay.value))
                            ? true
                            : false
                        }
                        onChange={e => handleSelect(e, weekDay.value)}
                      />
                    </CheckBoxContainer>
                  </CheckboxLabel>
                  {dayShift.map((item, i) => (
                    <CheckboxLabel key={i} className="table-checkbox">
                      {item.title}
                      <CheckBoxContainer>
                        <CheckBox
                          type="checkbox"
                          name="taxable"
                          checked={
                            selectedSchedule.find(k =>
                              k.includes(weekDay.value + "-" + item.value)
                            )
                              ? true
                              : false
                          }
                          onChange={e =>
                            handleSelect(e, weekDay.value + "-" + item.value)
                          }
                        />
                      </CheckBoxContainer>
                    </CheckboxLabel>
                  ))}
                </TableColumn>
              ))}
            </SelectTable>
          </>
        )}
        <ActionButtons>
          <ActionButton onClick={addServiceScheduling}>
            Save Change
          </ActionButton>
          <ActionButton bg="#CAD3DC" onClick={cancelChange}>
            Cancel Changes
          </ActionButton>
        </ActionButtons>
      </FormPanel>
    </>
  )
}

const ActionButtons = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: ${props => props.justify === "center" && "center"};

  &:not(:last-child) {
    margin-bottom: 53px;
  }
`
const ActionButton = styled.div`
  width: 106px;
  height: 28px;
  border-radius: 6px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
  font-weight: 400;
  background: ${props => props.bg ?? "#e9bd5a"};

  &:first-child {
    margin-right: 11px;
  }
`
const FormPanel = styled.form``
const MainPanel = styled.div`
  padding: 30px 17px;
  border-radius: 16px;
  width: 667px;
  box-shadow: 0px 2px 8px rgba(110, 110, 110, 0.3);
  margin-bottom: 20px;
`
const FormTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #414d55;
  margin-bottom: 20px;
`
const FormItem = styled.div`
  display: flex;
  align-items: ${props => props.align ?? "center"};
  margin-bottom: 15px;
`
const FormLabel = styled.label`
  width: 150px;
  min-width: 150px;
  text-align: end;
  font-size: 14px;
  font-weight: 400;
  color: #000;
  margin-right: 40px;
`
const CheckBoxContainer = styled.span`
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #a2c4d4;
  margin-right: 5px;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`
const CheckBox = styled.input`
  height: 12px;
  width: 12px;
  border-radius: 2px;
  appearance: none;
  margin: 0px;

  &:checked {
    background-color: #e9bd5a;
  }
`
const CheckboxLabel = styled.label`
  font-size: 12px;
  font-weight: 400;
  display: block;
  margin-bottom: 5px;

  &.title {
    font-size: 15px;
    font-weight: 600;
    border-top: 1px solid #e8e8e8;
  }

  &.table-checkbox {
    display: flex;
    height: 49px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e8e8e8;
    padding: 17px;
    margin-bottom: 0;
  }
`

const SelectTable = styled.div`
  width: 1146px;
  display: flex;
`
const TableColumn = styled.div`
  flex: 1;
  border-right: 1px solid #e8e8e8;

  &:first-child {
    border-left: 1px solid #e8e8e8;
  }
`
export default Scheduling
