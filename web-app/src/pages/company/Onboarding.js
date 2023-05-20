import React, { useEffect, useState } from "react"
import styled from "styled-components"
import ProgressBar from "@ramonak/react-progress-bar"
import CustomInput from "../../components/CustomInput"
import { basic_api } from "../../api/axios_helper"
import { useNavigate } from "react-router-dom"

function Onboarding() {
  let navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [previousSoftware, setPreviousSoftware] = useState(1)
  const [isLoading, setIsloading] = useState(false)

  const [business_year, setBusinessYear] = useState([])
  const [selected_business_year, setSelectedBusinessYear] = useState()
  const [staff_number, setStaffNumber] = useState([])
  const [selected_staff_number, setSelectedStaffNumber] = useState()
  const [currencies, setCurrencies] = useState([])
  const [selected_currencies, setSelectedCurrencies] = useState()
  const [software_list, setSoftwareList] = useState([])
  const [selected_software_list, setSelectedSoftwareList] = useState()

  const [website, setWebsite] = useState("")
  const [about, setAbout] = useState("")

  const [service_name, setServiceName] = useState("")
  const [service_duration, setServiceDuration] = useState("")
  const [service_cost, setServiceCost] = useState("")

  const [client_name, setClientName] = useState("")

  useEffect(() => {
    getBusinessYear()
    getStaffNumbers()
    getCurrency()
    getSoftwares()
  }, [])

  const getBusinessYear = () => {
    setIsloading(true)
    basic_api
      .get("/api/v1/business_year/")
      .then(({ data }) => {
        setIsloading(false)
        setBusinessYear(data)
      })
      .catch(error => {
        console.log(error?.response?.data)
        setIsloading(false)
      })
  }

  const getStaffNumbers = () => {
    setIsloading(true)
    basic_api
      .get("/api/v1/number_of_staff/")
      .then(({ data }) => {
        setIsloading(false)
        setStaffNumber(data)
      })
      .catch(error => {
        console.log(error?.response?.data)
        setIsloading(false)
      })
  }

  const getCurrency = () => {
    setIsloading(true)
    basic_api
      .get("/api/v1/currency_list/")
      .then(({ data }) => {
        setIsloading(false)
        setCurrencies(data)
      })
      .catch(error => {
        console.log(error?.response?.data)
        setIsloading(false)
      })
  }

  const getSoftwares = () => {
    setIsloading(true)
    basic_api
      .get("/api/v1/pet_sitting_software/")
      .then(({ data }) => {
        setIsloading(false)
        setSoftwareList(data)
      })
      .catch(error => {
        console.log(error?.response?.data)
        setIsloading(false)
      })
  }

  return (
    <Container>
      <HeaderProgress>
        {step > 1 ? (
          <PrevButton onClick={() => setStep(x => --x)}>
            Previous Step
          </PrevButton>
        ) : (
          <div />
        )}
        <NextButton
          onClick={() => {
            step == 5 ? navigate(`/company`) : setStep(x => ++x)
          }}
        >
          {step === 1
            ? "Build your Company Profile"
            : step === 5
            ? "Complete"
            : "Next Step"}
        </NextButton>
      </HeaderProgress>
      <ProgressBar
        completed={20 * step}
        baseBgColor="#F5F5F5"
        bgColor="#e9bd5a"
        height="3px"
        isLabelVisible={false}
      />
      <Content>
        {step === 1 ? (
          <>
            <H1Content>Unleash your business' potential!</H1Content>
            <TextContent>
              This is pet care software made for pet pros, by pet pros.
            </TextContent>
            <TextContent>
              How will furgis work for you? Take a tour through the platform.
            </TextContent>
            <IntroContainer></IntroContainer>
          </>
        ) : step === 2 ? (
          <>
            <H2Content>Introduce yourself</H2Content>
            <TextContent>
              We started our pet care journey in 2005. We've been through it,
              and we're here to ease your journey with our experience. Nice to
              meet you!
            </TextContent>
            <FormContainer>
              <ROWContainer>
                <P20 />
                <CustomInput
                  placeholder="www.website.com"
                  label="Company Website"
                  value={website}
                  onChange={setWebsite}
                />

                <P20 />
                <CustomInput
                  label="Number of Staff"
                  placeholder="Select your company size"
                  type="select"
                  options={staff_number.map(x => {
                    x.value = x.id
                    x.label = x.number_of_staff
                    return x
                  })}
                  value={selected_staff_number}
                  onChange={selected_staff_number}
                />

                <P20 />
                <CustomInput
                  placeholder="$ - US Dollar"
                  label="Currency"
                  type="select"
                  options={currencies.map(x => {
                    x.value = x.id
                    x.label = x.currency_name
                    return x
                  })}
                  value={selected_currencies}
                  onChange={setSelectedCurrencies}
                />
              </ROWContainer>
              <ROWContainer>
                <P20 />
                <CustomInput
                  placeholder="Less than a year"
                  label="How long have you been in business?"
                  type="select"
                  options={business_year.map(x => {
                    x.value = x.id
                    x.label = x.business_year
                    return x
                  })}
                  value={selected_business_year}
                  onChange={setSelectedBusinessYear}
                />

                <P20 />
                {previousSoftware === 0 ? (
                  <CustomInput
                    label="Have you used pet sitting software before?"
                    placeholder="Name"
                    type="select"
                    options={software_list.map(x => {
                      x.value = x.id
                      x.label = x.software_company_name
                      return x
                    })}
                    value={selected_software_list}
                    onChange={setSelectedSoftwareList}
                  />
                ) : (
                  <>
                    <CustomInput
                      placeholder="www.website.com"
                      label="Have you used pet sitting software before?"
                      type="grouped-radio"
                      options={[
                        { value: "yes", label: "Yes" },
                        { value: "no", label: "No" }
                      ]}
                      value={previousSoftware}
                      onChange={setPreviousSoftware}
                    />
                  </>
                )}

                <P20 />
                <CustomInput
                  placeholder="How did you hear about Furgis?"
                  label="How did you hear about Furgis?"
                  value={about}
                  onChange={setAbout}
                />
              </ROWContainer>
            </FormContainer>
          </>
        ) : step === 3 ? (
          <>
            <H2Content>Let's start building your service catalog!</H2Content>
            <TextContent>
              This is just the first of many. We'll add more later.
            </TextContent>
            <FormContainer2>
              <ROWContainer>
                <P20 />
                <TextContentBold>Service Name</TextContentBold>
                <TextContent marginTop="0px">
                  Provide a name that is familiar to your clients.
                </TextContent>

                <TextContentBold>Service Duration</TextContentBold>
                <TextContent marginTop="0px">
                  The time spent at this service. Typically in minutes or hours.
                </TextContent>

                <TextContentBold>Service Cost</TextContentBold>
                <TextContent marginTop="0px">
                  The rate you charge for this service.
                </TextContent>
              </ROWContainer>
              <ROWContainer>
                <P20 />
                <CustomInput
                  placeholder="Pet Sitting"
                  value={service_name}
                  onChange={setServiceName}
                />

                <P20 />
                <TimeContainer>
                  <TimeValue>
                    <CustomInput
                      placeholder="30"
                      value={service_duration}
                      onChange={setServiceDuration}
                    />
                  </TimeValue>
                  <TimeSelect>
                    <CustomInput placeholder="Minutes" type="select" />
                  </TimeSelect>
                </TimeContainer>

                <P20 />
                <CustomInput
                  placeholder="0"
                  value={service_cost}
                  onChange={setServiceCost}
                />
              </ROWContainer>
            </FormContainer2>
          </>
        ) : step === 4 ? (
          <>
            <H2Content>Let's start by adding a sample client!</H2Content>
            <TextContent>
              This is just for test. We'll add your actual clients later.
            </TextContent>
            <FormContainer2>
              <ROWContainer width="30%" style={{ marginTop: "20px" }}>
                <TextContentBold>Client Name</TextContentBold>
                <TextContent marginTop={"5px"}>Sample Client Name</TextContent>
              </ROWContainer>
              <ROWContainer width="70%">
                <P20 />
                <CustomInput
                  placeholder="Jane Doe"
                  value={client_name}
                  onChange={setClientName}
                />

                <ItemList>
                  <CheckBoxContainer>
                    <CheckBox type="checkbox" />
                  </CheckBoxContainer>
                  <TermsTextContent color="#4C5C94">
                    I have client data that I need help importing into Furgis.
                  </TermsTextContent>
                </ItemList>
              </ROWContainer>
            </FormContainer2>
          </>
        ) : (
          step === 5 && (
            <>
              <H2Content>Now We're Rolling!</H2Content>
              <TextWrapper>
                <TextContent>
                  You are almost ready to jump in and begin our Getting Started
                  Guide. We’ve got a short video explaining the guide and your
                  next steps below. As always – let us know if you have any
                  questions!
                </TextContent>
              </TextWrapper>
              <IntroVideoContainer></IntroVideoContainer>
            </>
          )
        )}
      </Content>
    </Container>
  )
}
const Container = styled.div`
  width: 100%;
  height: 100vh;
`

const HeaderProgress = styled.div`
  width: 100%;
  height: 99px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 38px;
  box-sizing: border-box;
`

const PrevButton = styled.div`
  width: 175px;
  height: 45px;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  color: #000000;
`

const NextButton = styled.div`
  height: 45px;
  background: #e9bd5a;
  border: 1px solid #e9bd5a;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  padding: 0px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  color: #fff;
`

const Content = styled.div`
  height: calc(100% - 102px);
  padding-top: 50px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const H1Content = styled.h1`
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 50px;
  line-height: 68px;
  color: #000000;
`

const H2Content = styled.h2`
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 27px;
  color: #000000;
`

const TextContent = styled.p`
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  color: ${props => (props.color ? props.color : "#000000")};
  margin-top: ${props => (props.marginTop ? props.marginTop : "inherit")};
`

const TermsTextContent = styled.p`
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 27px;
  margin: 0px;
  color: ${props => (props.color ? props.color : "#000000")};
  margin-top: ${props => (props.marginTop ? props.marginTop : "inherit")};
`

const TextContentBold = styled.span`
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  color: #000000;
`

const IntroContainer = styled.div`
  width: 649px;
  height: 172px;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 16px;
  margin-top: 100px;
`

const IntroVideoContainer = styled.div`
  width: 785px;
  height: 433px;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 16px;
  margin-top: 100px;
`

const TextWrapper = styled.div`
  width: 600px;
`

const FormContainer = styled.div`
  width: 860px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const FormContainer2 = styled.div`
  width: 700px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

const ROWContainer = styled.div`
  width: ${props => props.width ?? "45%"};
`

const P20 = styled.div`
  height: 20px;
`

const TimeContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const ItemList = styled.div`
  display: flex;
  align-items: center;
`

const CheckBoxContainer = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #a2c4d4;
  margin-right: 19px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CheckBox = styled.input`
  height: 12px;
  width: 12px;
  border-radius: 2px;
  margin: 6px;
  appearance: none;
  margin: 0px;
  &:checked {
    background-color: #e9bd5a;
  }
`

const TimeValue = styled.div`
  width: 121px;
`

const TimeSelect = styled.div`
  width: 164px;
`

export default Onboarding
