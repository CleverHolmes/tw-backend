import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import CustomInput from "../../../components/CustomInput"
import { main_api } from "../../../api/axios_helper"
import { Toast } from "primereact/toast"

const durationUnitData = [
  { value: "minutes", label: "Minutes" },
  { value: "hours", label: "Hours" }
]

const trackingData = [
  { value: "disable", label: "Disable" },
  { value: "enable", label: "Enable" }
]
const reminderData = [
  { value: "no", label: "No Reminder" },
  { value: "start", label: "After Service Start" },
  { value: "end", label: "After Service End" }
]
const staffRateUnitData = [
  { value: "%", label: "%" },
  { value: "$", label: "$" }
]
const extraRateUnitData = [
  { value: "extra pet", label: "Extra pet" },
  { value: "extra pet +", label: "Extra pet +" }
]
const staffPetRateData = [
  { value: "%", label: "% of total" },
  { value: "$", label: "$ per pet" }
]

function Setup({ setIsUpdated, isUpdated, data, getData }) {
  const [currentId, setCurrentId] = useState()
  const [durationUnit, setDurationUnit] = useState(durationUnitData[0])
  const [appTimerUnit, setAppTimerUnit] = useState(durationUnitData[0])
  const [tracking, setTracking] = useState(trackingData[0])
  const [reminder, setReminder] = useState(reminderData[0])
  const [staffRateUnit, setStaffRateUnit] = useState(staffRateUnitData[0])
  const [extraRateUnit, setExtraRateUnit] = useState(extraRateUnitData[0])
  const [staffPetRate, setStaffPetRate] = useState(staffPetRateData[0])
  const setupFormRef = useRef()
  const navigate = useNavigate()
  const toast = useRef(null)

  const cancelChange = () => {
    navigate("/company/services")
  }

  const setupService = async e => {
    e.preventDefault()
    const setupFormData = new FormData(e.target)
    setupFormData.append("duration_unit", durationUnit.value)
    setupFormData.append("mobile_app_timer_unit", appTimerUnit.value)
    setupFormData.append("gps_route_tracking", tracking.value)
    setupFormData.append("late_reminder", reminder.value)
    setupFormData.append("default_staff_rate_unit", staffRateUnit.value)
    setupFormData.append("extra_pet_rate_unit", extraRateUnit.value)
    setupFormData.append("staff_extra_pet_rate_unit", staffPetRate.value)
    let res
    if (data || isUpdated) {
      res = await main_api.put(
        "/api/v1/services/" + currentId + "/",
        setupFormData
      )
    } else {
      res = await main_api.post("/api/v1/services/", setupFormData)
    }
    if (res.status === 201 || res.status === 200) {
      navigate("/company/services/add-service/" + res.data.id)
      setCurrentId(res.data.id)
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
      setCurrentId(data.id)
      const setupForm = setupFormRef.current
      setupForm.service_name.value = data.service_name
      setupForm.default_duration.value = data.default_duration
      setupForm.mobile_app_timer.value = data.mobile_app_timer
      setupForm.selectable_by_client.checked = data.selectable_by_client
      setupForm.description.value = data.description
      setupForm.private_note.value = data.private_note
      setupForm.cost.value = data.cost
      setupForm.taxable.checked = data.taxable
      setupForm.default_staff_rate.value = data.default_staff_rate
      setupForm.extra_pet_rate.value = data.extra_pet_rate
      setupForm.staff_extra_pet_rate.value = data.staff_extra_pet_rate
      if (data.duration_unit) {
        setDurationUnit(
          durationUnitData.find(item => item.value === data.duration_unit)
        )
      }
      if (data.mobile_app_timer_unit) {
        setAppTimerUnit(
          durationUnitData.find(
            item => item.value === data.mobile_app_timer_unit
          )
        )
      }
      if (data.gps_route_tracking) {
        setTracking(
          trackingData.find(item => item.value === data.gps_route_tracking)
        )
      }
      if (data.late_reminder) {
        setReminder(
          reminderData.find(item => item.value === data.late_reminder)
        )
      }
      if (data.default_staff_rate_unit) {
        setStaffRateUnit(
          staffRateUnitData.find(
            item => item.value === data.default_staff_rate_unit
          )
        )
      }
      if (data.extra_pet_rate_unit) {
        setExtraRateUnit(
          extraRateUnitData.find(
            item => item.value === data.extra_pet_rate_unit
          )
        )
      }
      if (data.staff_extra_pet_rate_unit) {
        setStaffPetRate(
          staffPetRateData.find(
            item => item.value === data.staff_extra_pet_rate_unit
          )
        )
      }
    }
  }, [data])

  return (
    <>
      <Toast ref={toast} />
      <AddServiceForm onSubmit={setupService} ref={setupFormRef}>
        <ActionButtons>
          <ActionButton type="submit">Save Change</ActionButton>
          <ActionButton type="button" bg="#CAD3DC" onClick={cancelChange}>
            Cancel Changes
          </ActionButton>
        </ActionButtons>
        <FormPanel>
          <FormTitle>General</FormTitle>
          <CustomInput
            label="Service Name"
            name="service_name"
            labelSize="14px"
            labelWeight="400"
            labelMargin="0 0 14px 0"
            labelColor="#5E5E5E"
            width="500px"
            margin="0 0 20px 0"
            vertical={true}
            padding="10px 15px"
            border={"1px solid #E4EAF0"}
            required
          />
          <FormLabel>Default Duration</FormLabel>
          <FormElements>
            <div>
              <CustomInput
                labelColor="#5E5E5E"
                placeholder="30"
                width="87px"
                name="default_duration"
                height="40px"
                margin="0 10px 0 0"
                padding="10px 15px"
                border={"1px solid #E4EAF0"}
                required
              />
            </div>
            <div>
              <CustomInput
                type="select"
                options={durationUnitData}
                value={durationUnit}
                onChange={setDurationUnit}
                vertical={false}
                border={"1px solid #E4EAF0"}
                height="40px"
                selectHeight="40px"
                selectWidth="138px"
                required
              />
            </div>
          </FormElements>
          <FormLabel>Mobile App Timer</FormLabel>
          <FormElements>
            <div>
              <CustomInput
                labelColor="#5E5E5E"
                name="mobile_app_timer"
                placeholder="30"
                width="87px"
                height="40px"
                margin="0 10px 0 0"
                padding="10px 15px"
                border={"1px solid #E4EAF0"}
                required
              />
            </div>
            <div>
              <CustomInput
                type="select"
                options={durationUnitData}
                value={appTimerUnit}
                onChange={setAppTimerUnit}
                vertical={false}
                border={"1px solid #E4EAF0"}
                height="40px"
                selectHeight="40px"
                selectWidth="138px"
                required
              />
            </div>
          </FormElements>
          <FormLabel>Selected by Client?</FormLabel>
          <FormElements>
            <CheckboxLabel>
              <CheckBoxContainer>
                <CheckBox type="checkbox" name="selectable_by_client" />
              </CheckBoxContainer>
              Yes, client can select this service when requesting service.
            </CheckboxLabel>
          </FormElements>
          <FormLabel>GPS Route Tracking</FormLabel>
          <FormElements>
            <div>
              <CustomInput
                type="select"
                options={trackingData}
                value={tracking}
                onChange={setTracking}
                vertical={false}
                border={"1px solid #E4EAF0"}
                height="40px"
                selectHeight="40px"
                selectWidth="138px"
                required
              />
            </div>
          </FormElements>
          <FormLabel>Late Reminder</FormLabel>
          <FormElements>
            <div>
              <CustomInput
                type="select"
                options={reminderData}
                value={reminder}
                onChange={setReminder}
                vertical={false}
                border={"1px solid #E4EAF0"}
                height="40px"
                selectHeight="40px"
                selectWidth="194px"
                required
              />
            </div>
          </FormElements>
          <FormLabel>Description</FormLabel>
          <FormTextArea name="description" />
          <FormLabel>Private Note</FormLabel>
          <FormTextArea name="private_note" />
          <FormTitle>Rates</FormTitle>
          <FormLabel>Cost</FormLabel>
          <FormElements>
            <FormInputContainer>
              $<FormInput type="input" name="cost" placeholder="0" />
            </FormInputContainer>
          </FormElements>
          <FormLabel>Taxable?</FormLabel>
          <FormElements>
            <CheckboxLabel>
              <CheckBoxContainer>
                <CheckBox type="checkbox" name="taxable" />
              </CheckBoxContainer>
              Service is Taxable
            </CheckboxLabel>
          </FormElements>
          <FormLabel>Default Staff Rate</FormLabel>
          <FormElements>
            <div>
              <CustomInput
                labelColor="#5E5E5E"
                name="default_staff_rate"
                placeholder="30"
                width="87px"
                height="40px"
                margin="0 10px 0 0"
                padding="10px 15px"
                border={"1px solid #E4EAF0"}
                required
              />
            </div>
            <div>
              <CustomInput
                type="select"
                options={staffRateUnitData}
                value={staffRateUnit}
                onChange={setStaffRateUnit}
                vertical={false}
                border={"1px solid #E4EAF0"}
                height="40px"
                selectHeight="40px"
                selectWidth="80px"
                required
              />
            </div>
          </FormElements>
          <FormLabel>Extra Pet Rates</FormLabel>
          <FormElements>
            <div>
              <CustomInput
                type="select"
                options={extraRateUnitData}
                value={extraRateUnit}
                onChange={setExtraRateUnit}
                vertical={false}
                border={"1px solid #E4EAF0"}
                height="40px"
                selectHeight="40px"
                margin="0 20px 0 0"
                selectWidth="150px"
                required
              />
            </div>
            <FormInputContainer width="103px">
              $
              <FormInput
                type="input"
                name="extra_pet_rate"
                placeholder="0"
                required
              />
            </FormInputContainer>
          </FormElements>
          <FormLabel>Staff Extra Pet Rate</FormLabel>
          <FormElements>
            <div>
              <CustomInput
                labelColor="#5E5E5E"
                name="staff_extra_pet_rate"
                placeholder="5"
                width="79px"
                height="40px"
                margin="0 10px 0 0"
                padding="10px 15px"
                border={"1px solid #E4EAF0"}
                required
              />
            </div>
            <div>
              <CustomInput
                type="select"
                options={staffPetRateData}
                value={staffPetRate}
                onChange={setStaffPetRate}
                vertical={false}
                border={"1px solid #E4EAF0"}
                height="40px"
                selectHeight="40px"
                selectWidth="150px"
                required
              />
            </div>
          </FormElements>
          <ActionButtons justify="center">
            <ActionButton type="submit">Save Change</ActionButton>
            <ActionButton type="button" bg="#CAD3DC" onClick={cancelChange}>
              Cancel Changes
            </ActionButton>
          </ActionButtons>
        </FormPanel>
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
  border: 0;
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
const AddServiceForm = styled.form``
const FormPanel = styled.div`
  padding: 33px 22px 74px 22px;
  border-radius: 16px;
  width: 667px;
  box-shadow: 0px 2px 8px rgba(110, 110, 110, 0.3);
`
const FormTitle = styled.h3`
  font-size: 28px;
  font-weight: 700;
  color: #414d55;
  margin-bottom: 30px;
`
const FormLabel = styled.label`
  display: block;
  margin-bottom: 14px;
  font-size: 14px;
  font-weight: 400;
  color: #5e5e5e;
`
const FormElements = styled.div`
  display: flex;
  margin-bottom: 30px;
  align-items: center;
`
const CheckBoxContainer = styled.span`
  height: 12px;
  width: 12px;
  border-radius: 1px;
  border: 1px solid #a2c4d4;
  margin-right: 13px;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`
const CheckBox = styled.input`
  height: 8px;
  width: 8px;
  border-radius: 1px;
  appearance: none;
  margin: 0px;

  &:checked {
    background-color: #e9bd5a;
  }
`
const CheckboxLabel = styled.label`
  font-size: 12px;
  font-weight: 400;
`
const FormTextArea = styled.textarea`
  max-width: 500px;
  width: 100%;
  height: 70px;
  border: 1px solid #cad3dc;
  border-radius: 5px;
  margin-bottom: 30px;
`
const FormInputContainer = styled.label`
  width: ${props => props.width ?? "165px"};
  height: 40px;
  display: flex;
  align-items: center;
  border: 1px solid #cad3dc;
  border-right: 0;
  border-radius: 5px;
  padding-left: 15px;
  font-size: 14px;
  justify-content: space-between;
  color: #8b8698;
`
const FormInput = styled.input`
  width: calc(100% - 20px);
  height: 40px;
  border: 1px solid #cad3dc;
  outline: none;
  padding: 10px 20px;
  color: #8b8698;
`
export default Setup
