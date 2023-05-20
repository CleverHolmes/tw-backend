import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import toaster from "toasted-notes"
import { basic_api } from "../../api/axios_helper"
import bg from "../../assets/images/signup-bg.svg"
import CustomInput from "../../components/CustomInput"
import Notification from "../../components/Notification"

function Signup() {
  let navigate = useNavigate()
  const [company_name, setCompanyName] = useState("")
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm_pass, setConfirmPassword] = useState("")
  const [isLoading, setIsloading] = useState(false)

  useEffect(() => {
    function deleteAllCookies() {
      var cookies = document.cookie.split(";")

      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i]
        var eqPos = cookie.indexOf("=")
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
      }
    }

    deleteAllCookies()
  }, [])

  const signup = () => {
    if (isLoading || password !== confirm_pass) return
    const formData = new FormData()
    formData.append("email", email)
    formData.append("first_name", first_name)
    formData.append("last_name", last_name)
    formData.append("company_name", company_name)
    formData.append("password", password)
    setIsloading(true)
    basic_api
      .post("/api/v1/signup/", formData)
      .then(response => {
        setIsloading(false)
        Notification.Success("Signup completed!")
        navigate(`/company/signup/onboarding`)
      })
      .catch(error => {
        console.log(error?.response?.data)
        Notification.Error(
          error?.response?.data[Object.keys(error?.response?.data)[0]][0]
        )
        setIsloading(false)
      })
  }
  return (
    <Container>
      <FormContainer>
        <FormList>
          <Form
            onSubmit={e => {
              e.preventDefault()

              signup()
            }}
          >
            <FormHeader>Sign up</FormHeader>
            <CustomInput
              label="Company Name"
              value={company_name}
              onChange={setCompanyName}
              placeholder="Buds"
            />
            <P20 />
            <Flex>
              <FlexedInput>
                <CustomInput
                  label="First Name"
                  value={first_name}
                  onChange={setFirstName}
                  placeholder="Leslie"
                />
              </FlexedInput>
              <FlexedInput>
                <CustomInput
                  label="Last Name"
                  value={last_name}
                  onChange={setLastName}
                  placeholder="Fox"
                />
              </FlexedInput>
            </Flex>
            <P20 />
            <CustomInput
              label="Email Address"
              value={email}
              onChange={setEmail}
              placeholder="annette.black@email.com"
              type="email"
            />
            <P20 />
            <CustomInput
              label="Password"
              value={password}
              onChange={setPassword}
              placeholder="Repeated Password"
              type="password"
            />
            <P20 />
            <CustomInput
              label="Repeat Password"
              value={confirm_pass}
              onChange={setConfirmPassword}
              placeholder="Repeat Password"
              type="password"
            />

            <ItemList>
              <CheckBoxContainer>
                <CheckBox type="checkbox" required />
              </CheckBoxContainer>
              <TermsTextContent>
                I have read the
                <TermsTextContent
                  color="#4C5C94"
                  style={{ cursor: "pointer", marginRight: "8px" }}
                  onClick={() => navigate("/terms-and-conditions")}
                >
                  Terms & Conditions
                </TermsTextContent>{" "}
                and
                <TermsTextContent
                  color="#4C5C94"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/terms-and-conditions")}
                >
                  Privacy Policy
                </TermsTextContent>
              </TermsTextContent>
            </ItemList>
            <SubmitButton type="submit">Sign up</SubmitButton>
          </Form>
        </FormList>
      </FormContainer>
    </Container>
  )
}
const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-size: 100% 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const FormContainer = styled.div`
  width: 630px;
  height: 798px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  background: #ffffff;
  border: 1px solid #120b27;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const FormList = styled.div`
  width: 500px;
  height: 706px;
  display: flex;
  justify-content: center;
  position: relative;
`

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`

const FlexedInput = styled.div`
  width: 45%;
`

const P20 = styled.div`
  height: 20px;
`

const FormHeader = styled.h1`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 400;
  font-size: 38.1413px;
  line-height: 52px;
  color: #000000;
`

const Form = styled.form`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const SubmitButton = styled.button`
  height: 65px;
  width: 200px;
  background: #e9bd5a;
  border-radius: 4px;
  margin-top: 60px;
  cursor: pointer;

  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 23.8383px;
  line-height: 32px;
  letter-spacing: -0.340548px;
  color: #ffffff;
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
  display: flex;
  margin-left: 8px;
  color: ${props => (props.color ? props.color : "#000000")};
  margin-top: ${props => (props.marginTop ? props.marginTop : "inherit")};
`

const ItemList = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

const CheckBoxContainer = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #a2c4d4;
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

export default Signup
