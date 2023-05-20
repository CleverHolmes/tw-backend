import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import CustomInput from "../../../components/CustomInput"
import { main_api } from "../../../api/axios_helper"
import { Toast } from "primereact/toast"

const hourEnabledData = [
  { value: true, label: "Yes, I Charge Extra After Hours" },
  { value: false, label: "No, I do not charge for after-hours" }
]
const workHoursData = [
  { value: "8:00 AM", label: "8:00 AM" },
  { value: "9:00 AM", label: "9:00 AM" },
  { value: "10:00 AM", label: "10:00 AM" },
  { value: "11:00 AM", label: "11:00 AM" },
  { value: "12:00 AM", label: "12:00 PM" },
  { value: "1:00 PM", label: "1:00 PM" },
  { value: "2:00 PM", label: "2:00 PM" },
  { value: "3:00 PM", label: "3:00 PM" },
  { value: "4:00 PM", label: "4:00 PM" },
  { value: "5:00 PM", label: "5:00 PM" },
  { value: "6:00 PM", label: "6:00 PM" },
  { value: "7:00 PM", label: "7:00 PM" },
  { value: "8:00 PM", label: "8:00 PM" },
  { value: "9:00 PM", label: "9:00 PM" },
  { value: "10:00 PM", label: "10:00 PM" },
  { value: "11:00 PM", label: "11:00 PM" },
  { value: "0:00 AM", label: "0:00 AM" },
  { value: "1:00 AM", label: "1:00 AM" },
  { value: "2:00 AM", label: "2:00 AM" },
  { value: "3:00 AM", label: "3:00 AM" },
  { value: "4:00 AM", label: "4:00 AM" },
  { value: "5:00 AM", label: "5:00 AM" },
  { value: "6:00 AM", label: "6:00 AM" },
  { value: "7:00 AM", label: "7:00 AM" }
]
const workHourShiftData = [
  { value: "day", label: "Day Shift" },
  { value: "swing", label: "Swing Shift" },
  { value: "night", label: "Night Shift" }
]
const feeChargedData = [
  { value: "$", label: "$" },
  { value: "%", label: "%" }
]

function AutoFee({ data, getData }) {
  const [hourEnabled, setHourEnabled] = useState(hourEnabledData[0])
  const [workHours, setWorkHours] = useState(workHoursData[0])
  const [workHourShift, setWorkHourShift] = useState(workHourShiftData[0])
  const [feeCharged, setFeeCharged] = useState(feeChargedData[0])
  const [staffRate, setStaffRate] = useState(feeChargedData[0])
  const [weekendFees, setWeekendFees] = useState(hourEnabledData[0])
  const [weekendFeeCharged, setWeekendFeeCharged] = useState(feeChargedData[0])
  const [staffRateWeekend, setStaffRateWeekend] = useState(feeChargedData[0])
  const navigate = useNavigate()
  const formRef = useRef()
  const toast = useRef(null)

  const cancelChange = () => {
    navigate("/company/services")
  }

  const setupService = async e => {
    e.preventDefault()
    const setupFormData = new FormData(e.target)
    setupFormData.append("after_hours_enabled", hourEnabled.value)
    setupFormData.append("work_hours", workHours.value)
    setupFormData.append("work_hours_shift", workHourShift.value)
    setupFormData.append("additional_fee_charged_unit", feeCharged.value)
    setupFormData.append("staff_rate_for_after_hours_unit", staffRate.value)
    setupFormData.append("weekend_fees_enabled", weekendFees.value)
    setupFormData.append("weekend_fee_charged_unit", weekendFeeCharged.value)
    setupFormData.append("staff_rate_for_weekend_unit", staffRateWeekend.value)
    setupFormData.append("service", data.id)
    let res
    if (data?.serviceautofee_set.length) {
      res = await main_api.put(
        "/api/v1/services-auto-fees/" + data.serviceautofee_set[0].id + "/",
        setupFormData
      )
    } else {
      res = await main_api.post("/api/v1/services-auto-fees/", setupFormData)
    }
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
    if (data) {
      console.log(data.serviceautofee_set)
      if (data.serviceautofee_set.length) {
        const autoFeeData = data.serviceautofee_set[0]
        const form = formRef.current
        form.additional_fee_charged.value = autoFeeData.additional_fee_charged
        form.staff_rate_for_weekend.value = autoFeeData.staff_rate_for_weekend
        form.staff_rate_for_after_hours.value =
          autoFeeData.staff_rate_for_after_hours
        form.weekend_fee_charged.value = autoFeeData.weekend_fee_charged
        setHourEnabled(
          hourEnabledData.find(
            item => item.value === autoFeeData.after_hours_enabled
          )
        )
        setWorkHours(
          workHoursData.find(item => item.value === autoFeeData.work_hours)
        )
        setWorkHourShift(
          workHourShiftData.find(
            item => item.value === autoFeeData.work_hours_shift
          )
        )
        setFeeCharged(
          feeChargedData.find(
            item => item.value === autoFeeData.additional_fee_charged_unit
          )
        )
        setStaffRate(
          feeChargedData.find(
            item => item.value === autoFeeData.staff_rate_for_after_hours_unit
          )
        )
        setWeekendFees(
          hourEnabledData.find(
            item => item.value === autoFeeData.weekend_fees_enabled
          )
        )
        setWeekendFeeCharged(
          feeChargedData.find(
            item => item.value === autoFeeData.weekend_fee_charged_unit
          )
        )
        setStaffRateWeekend(
          feeChargedData.find(
            item => item.value === autoFeeData.staff_rate_for_weekend_unit
          )
        )
      }
    }
  }, [data])

  return (
    <>
      <Toast ref={toast} />
      <FormTitle>After Hours</FormTitle>
      <AddServiceForm onSubmit={setupService} ref={formRef}>
        <ActionButtons>
          <ActionButton type="submit">Save Change</ActionButton>
          <ActionButton type="button" bg="#CAD3DC" onClick={cancelChange}>
            Cancel Changes
          </ActionButton>
        </ActionButtons>
        <FormPanel>
          <FormElements>
            <FormLabel>After Hours Enabled?</FormLabel>
            <CustomInput
              type="select"
              options={hourEnabledData}
              value={hourEnabled}
              onChange={setHourEnabled}
              vertical={false}
              border={"1px solid #E4EAF0"}
              height="40px"
              selectHeight="40px"
              selectWidth="264px"
            />
          </FormElements>
          <FormElements>
            <FormLabel>Work hours</FormLabel>
            <div>
              <CustomInput
                type="select"
                options={workHoursData}
                value={workHours}
                onChange={setWorkHours}
                vertical={false}
                border={"1px solid #E4EAF0"}
                height="40px"
                margin="0 10px 0 0"
                selectHeight="40px"
                selectWidth="154px"
              />
            </div>
            <div>
              <CustomInput
                type="select"
                options={workHourShiftData}
                value={workHourShift}
                onChange={setWorkHourShift}
                vertical={false}
                border={"1px solid #E4EAF0"}
                height="40px"
                selectHeight="40px"
                selectWidth="138px"
              />
            </div>
          </FormElements>
          <FormElements>
            <FormLabel>Additional Fee Charged to Client</FormLabel>
            <div>
              <CustomInput
                vertical={false}
                name="additional_fee_charged"
                border={"1px solid #E4EAF0"}
                height="40px"
                padding="10px 15px"
                margin="0 10px 0 0"
                selectHeight="40px"
                width="94px"
                required
              />
            </div>
            <div>
              <CustomInput
                type="select"
                options={feeChargedData}
                value={feeCharged}
                onChange={setFeeCharged}
                vertical={false}
                border={"1px solid #E4EAF0"}
                height="40px"
                selectHeight="40px"
                selectWidth="86px"
              />
            </div>
          </FormElements>
          <FormElements>
            <FormLabel>Staff Rate For After Hours</FormLabel>
            <div>
              <CustomInput
                name="staff_rate_for_after_hours"
                vertical={false}
                border={"1px solid #E4EAF0"}
                height="40px"
                padding="10px 15px"
                margin="0 10px 0 0"
                selectHeight="40px"
                width="94px"
                required
              />
            </div>
            <div>
              <CustomInput
                type="select"
                options={feeChargedData}
                value={staffRate}
                onChange={setStaffRate}
                vertical={false}
                border={"1px solid #E4EAF0"}
                height="40px"
                selectHeight="40px"
                selectWidth="86px"
              />
            </div>
          </FormElements>
        </FormPanel>
        <FormPanel>
          <FormElements>
            <FormLabel>Weekend Fees Enabled?</FormLabel>
            <CustomInput
              type="select"
              options={hourEnabledData}
              value={weekendFees}
              onChange={setWeekendFees}
              vertical={false}
              border={"1px solid #E4EAF0"}
              height="40px"
              selectHeight="40px"
              selectWidth="264px"
            />
          </FormElements>
          <FormElements>
            <FormLabel>Weekend Fees Charged to Client</FormLabel>
            <div>
              <CustomInput
                vertical={false}
                name="weekend_fee_charged"
                border={"1px solid #E4EAF0"}
                height="40px"
                padding="10px 15px"
                margin="0 10px 0 0"
                selectHeight="40px"
                width="94px"
                required
              />
            </div>
            <div>
              <CustomInput
                type="select"
                options={feeChargedData}
                value={weekendFeeCharged}
                onChange={setWeekendFeeCharged}
                vertical={false}
                border={"1px solid #E4EAF0"}
                height="40px"
                selectHeight="40px"
                selectWidth="86px"
              />
            </div>
          </FormElements>
          <FormElements>
            <FormLabel>Staff Rate For Weekend</FormLabel>
            <div>
              <CustomInput
                vertical={false}
                name="staff_rate_for_weekend"
                border={"1px solid #E4EAF0"}
                height="40px"
                padding="10px 15px"
                margin="0 10px 0 0"
                selectHeight="40px"
                width="94px"
                required
              />
            </div>
            <div>
              <CustomInput
                type="select"
                options={feeChargedData}
                value={staffRateWeekend}
                onChange={setStaffRateWeekend}
                vertical={false}
                border={"1px solid #E4EAF0"}
                height="40px"
                selectHeight="40px"
                selectWidth="86px"
              />
            </div>
          </FormElements>
        </FormPanel>
        <ActionButtons>
          <ActionButton type="submit">Save Change</ActionButton>
          <ActionButton type="button" bg="#CAD3DC" onClick={cancelChange}>
            Cancel Changes
          </ActionButton>
        </ActionButtons>
      </AddServiceForm>
    </>
  )
}

const ActionButtons = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 40px;
  justify-content: ${props => props.justify === "center" && "center"};
`

const ActionButton = styled.button`
  width: 106px;
  height: 28px;
  border-radius: 6px;
  color: #fff;
  display: flex;
  align-items: center;
  border: 0;
  outline: 0;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
  font-weight: 400;
  background: ${props => props.bg ?? "#e9bd5a"};

  &:first-child {
    margin-right: 11px;
  }
`
const AddServiceForm = styled.form``
const FormPanel = styled.div`
  padding: 33px 28px 3px 28px;
  border-radius: 16px;
  width: 667px;
  box-shadow: 0px 2px 8px rgba(110, 110, 110, 0.3);
  margin-bottom: 40px;

  &:first-of-type {
    margin-bottom: 100px;
  }
`
const FormTitle = styled.h3`
  font-size: 28px;
  font-weight: 700;
  color: #414d55;
  margin-bottom: 30px;
`
const FormLabel = styled.label`
  min-width: 136px;
  max-width: 136px;
  margin-right: 30px;
  font-size: 14px;
  font-weight: 400;
  color: #000;
`
const FormElements = styled.div`
  display: flex;
  margin-bottom: 30px;
  align-items: center;
`
export default AutoFee
