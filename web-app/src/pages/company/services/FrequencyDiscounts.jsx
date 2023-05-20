import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import CustomInput from "../../../components/CustomInput"
import { main_api } from "../../../api/axios_helper"
import { Toast } from "primereact/toast"

const frequencyPeriodData = [
  { value: 1, label: "No, Frequency Discounts Offered" },
  {
    value: 2,
    label: "Daily/Weekly (Sun-Sat)/Monthly"
  }
]
const payData = [{ value: "override", label: "Override Pay Rate:" }]
const payUnit = [{ value: "$", label: "$" }]

function FrequencyDiscounts({ data, getData }) {
  const [frequencyPeriod, setFrequencyPeriod] = useState(frequencyPeriodData[0])
  const [selectedLevel, setSelectedLevel] = useState([])
  const [level1Pay, setLevel1Pay] = useState(payData[0])
  const [level2Pay, setLevel2Pay] = useState(payData[0])
  const [level3Pay, setLevel3Pay] = useState(payData[0])
  const [level4Pay, setLevel4Pay] = useState(payData[0])
  const [level1PayUnit, setLevel1PayUnit] = useState(payUnit[0])
  const [level2PayUnit, setLevel2PayUnit] = useState(payUnit[0])
  const [level3PayUnit, setLevel3PayUnit] = useState(payUnit[0])
  const [level4PayUnit, setLevel4PayUnit] = useState(payUnit[0])
  const formRef = useRef()
  const navigate = useNavigate()
  const toast = useRef(null)

  const cancelChange = () => {
    navigate("/company/services")
  }

  const handleSelectedLevel = (e, value) => {
    if (e.target.checked) {
      setSelectedLevel([...selectedLevel, value])
    } else {
      setSelectedLevel([...selectedLevel.filter(item => item !== value)])
    }
  }

  const addFrequency = async e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const formObj = Object.fromEntries(formData.entries())
    let addFormData
    selectedLevel.map(level => {
      addFormData = new FormData()
      addFormData.append("level", level)
      addFormData.append("when", formObj[level + "-when"])
      addFormData.append("charge", formObj[level + "-charge"])
      addFormData.append("charge", formObj[level + "-charge"])
      if (level === 1) {
        addFormData.append("pay_type", level1Pay.value)
        addFormData.append("pay_unit", level1PayUnit.value)
      } else if (level === 2) {
        addFormData.append("pay_type", level2Pay.value)
        addFormData.append("pay_unit", level2PayUnit.value)
      } else if (level === 3) {
        addFormData.append("pay_type", level3Pay.value)
        addFormData.append("pay_unit", level3PayUnit.value)
      } else {
        addFormData.append("pay_type", level4Pay.value)
        addFormData.append("pay_unit", level4PayUnit.value)
      }
      addFormData.append("pay_number", formObj[level + "-pay_number"])
      addFormData.append("service", data.id)

      const frequencies = data?.servicefrequencyperiod_set

      if (frequencies.find(val => val.level === level)) {
        main_api.put(
          "/api/v1/services-frequency-period/" +
            frequencies.find(val => val.level === level).id +
            "/",
          addFormData
        )
      } else {
        main_api.post("/api/v1/services-frequency-period/", addFormData)
      }
    })
    data?.servicefrequencyperiod_set.map(frequency => {
      if (!selectedLevel.find(level => level === frequency.level)) {
        main_api.delete(
          "/api/v1/services-frequency-period/" + frequency.id + "/"
        )
      }
    })
    toast.current.show({
      severity: "success",
      summary: "Saved!",
      life: 3000
    })
    getData()
  }

  const setFrequencies = () => {
    const frequencies = data?.servicefrequencyperiod_set
    const form = formRef.current
    if (frequencies.length) {
      frequencies.map(frequency => {
        selectedLevel.push(frequency.level)
        if (form[frequency.level + "-when"]) {
          form[frequency.level + "-when"].value = frequency.when
          form[frequency.level + "-charge"].value = frequency.charge
          form[frequency.level + "-pay_number"].value = frequency.pay_number
        }
        if (frequency.level === 1) {
          setLevel1Pay(payData.find(item => item.value === frequency.pay_type))
          setLevel1PayUnit(
            payUnit.find(item => item.value === frequency.pay_unit)
          )
        } else if (frequency.level === 2) {
          setLevel2Pay(payData.find(item => item.value === frequency.pay_type))
          setLevel2PayUnit(
            payUnit.find(item => item.value === frequency.pay_unit)
          )
        } else if (frequency.level === 3) {
          setLevel3Pay(payData.find(item => item.value === frequency.pay_type))
          setLevel3PayUnit(
            payUnit.find(item => item.value === frequency.pay_unit)
          )
        } else {
          setLevel4Pay(payData.find(item => item.value === frequency.pay_type))
          setLevel4PayUnit(
            payUnit.find(item => item.value === frequency.pay_unit)
          )
        }
      })
      setFrequencyPeriod(frequencyPeriodData[1])
      setSelectedLevel([...selectedLevel])
    }
  }

  useEffect(() => {
    if (frequencyPeriod.value === 1) {
      setSelectedLevel([])
    }
  }, [frequencyPeriod])
  useEffect(() => {
    if (data) {
      setFrequencies()
    }
  }, [data, formRef.current])

  return (
    <>
      <Toast ref={toast} />
      <FormPanel onSubmit={addFrequency} ref={formRef}>
        <ActionButtons>
          <ActionButton type="submit">Save Change</ActionButton>
          <ActionButton type="type" bg="#CAD3DC" onClick={cancelChange}>
            Cancel Changes
          </ActionButton>
        </ActionButtons>
        <FormTitle>Frequency Discounts</FormTitle>
        <SelectPanel>
          <DiscriptionText>
            Automatically discount service rates based on the number of
            scheduled events during the given timeframe (Daily, Weekly or
            Monthly) for a given client. These rates override any custom rates
            set on the Client's profile and any custom pay rates set for the
            staff.
          </DiscriptionText>
          <CustomInput
            type="select"
            label="Frequency Period?"
            labelMargin="0 30px 0 0"
            options={frequencyPeriodData}
            value={frequencyPeriod}
            onChange={setFrequencyPeriod}
            vertical={false}
            border={"1px solid #E4EAF0"}
            height="40px"
            selectHeight="40px"
            selectWidth="199px"
          />
        </SelectPanel>
        {frequencyPeriod.value === 2 &&
          [1, 2, 3, 4].map((item, index) => (
            <LevelPanel key={index}>
              <LevelLeftPanel>
                <FormElements>
                  <CheckboxLabel>
                    <CheckBoxContainer>
                      <CheckBox
                        type="checkbox"
                        checked={selectedLevel.find(level => level === item)}
                        onChange={e => handleSelectedLevel(e, item)}
                      />
                    </CheckBoxContainer>
                    {item}st Level
                  </CheckboxLabel>
                </FormElements>
              </LevelLeftPanel>
              <LevelRightPanel>
                <FormElements>
                  <FormLabel>When</FormLabel>
                  <div>
                    <CustomInput
                      name={item + "-when"}
                      placeholder="2"
                      border={"1px solid #E4EAF0"}
                      height="40px"
                      padding="10px 15px"
                      margin="0 10px 0 0"
                      width="68px"
                      required={selectedLevel.includes(item)}
                    />
                  </div>
                  visits per day are scheduled
                </FormElements>
                <FormElements>
                  <FormLabel>Charge</FormLabel>
                  <FormInputContainer>
                    $
                    <FormInput
                      name={item + "-charge"}
                      type="input"
                      placeholder="0"
                      required={selectedLevel.includes(item)}
                    />
                  </FormInputContainer>
                  per visit.
                </FormElements>
                <FormElements>
                  <FormLabel>Pay</FormLabel>
                  <CustomInput
                    type="select"
                    options={payData}
                    value={
                      item === 1
                        ? level1Pay
                        : item === 2
                        ? level2Pay
                        : item === 3
                        ? level3Pay
                        : level4Pay
                    }
                    onChange={
                      item === 1
                        ? setLevel1Pay
                        : item === 2
                        ? setLevel2Pay
                        : item === 3
                        ? setLevel3Pay
                        : setLevel4Pay
                    }
                    vertical={false}
                    border={"1px solid #E4EAF0"}
                    height="40px"
                    selectHeight="40px"
                    selectWidth="264px"
                  />
                </FormElements>
                <FormElements>
                  <FormLabel></FormLabel>
                  <div>
                    <CustomInput
                      name={item + "-pay_number"}
                      placeholder="0"
                      border={"1px solid #E4EAF0"}
                      height="40px"
                      padding="10px 15px"
                      margin="0 5px 0 0"
                      width="68px"
                      required={selectedLevel.includes(item)}
                    />
                  </div>
                  <div>
                    <CustomInput
                      type="select"
                      options={payUnit}
                      value={
                        item === 1
                          ? level1PayUnit
                          : item === 2
                          ? level2PayUnit
                          : item === 3
                          ? level3PayUnit
                          : level4PayUnit
                      }
                      onChange={
                        item === 1
                          ? setLevel1PayUnit
                          : item === 2
                          ? setLevel2PayUnit
                          : item === 3
                          ? setLevel3PayUnit
                          : setLevel4PayUnit
                      }
                      vertical={false}
                      border={"1px solid #E4EAF0"}
                      height="40px"
                      selectHeight="40px"
                      selectWidth="86px"
                    />
                  </div>
                </FormElements>
              </LevelRightPanel>
            </LevelPanel>
          ))}
        <ActionButtons>
          <ActionButton type="submit">Save Change</ActionButton>
          <ActionButton type="button" bg="#CAD3DC" onClick={cancelChange}>
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
  margin-bottom: 40px;
  justify-content: ${props => props.justify === "center" && "center"};
`

const ActionButton = styled.button`
  border: 0;
  outline: 0;
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

const DiscriptionText = styled.p`
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 20px;
`
const FormPanel = styled.form``
const SelectPanel = styled.div`
  padding: 20px 16px;
  border-radius: 16px;
  width: 851px;
  box-shadow: 0px 2px 8px rgba(110, 110, 110, 0.3);
  margin-bottom: 20px;
`
const FormTitle = styled.h3`
  font-size: 28px;
  font-weight: 700;
  color: #414d55;
  margin-bottom: 30px;
`

const FormLabel = styled.label`
  min-width: 50px;
  max-width: 50px;
  margin-right: 25px;
  font-size: 14px;
  font-weight: 400;
  color: #000;
`
const FormElements = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
`
const LevelPanel = styled.div`
  width: 539px;
  display: flex;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(110, 110, 110, 0.3);
  border-radius: 8px;
  margin-bottom: 10px;
`

const LevelLeftPanel = styled.div`
  width: 138px;
  border-right: 1px solid #e9edf0;
  padding: 35px 28px;
`

const LevelRightPanel = styled.div`
  flex: 1;
  padding: 22px 30px;
`

const CheckboxLabel = styled.label`
  font-size: 14px;
  font-weight: 400;
`
const CheckBoxContainer = styled.span`
  height: 12px;
  width: 12px;
  border-radius: 1px;
  border: 1px solid #a2c4d4;
  margin-right: 10px;
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

const FormInputContainer = styled.label`
  width: ${props => props.width ?? "123px"};
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
  margin-right: 21px;
`
const FormInput = styled.input`
  width: calc(100% - 20px);
  height: 40px;
  border: 1px solid #cad3dc;
  outline: none;
  padding: 10px 20px;
  color: #8b8698;
`
export default FrequencyDiscounts
