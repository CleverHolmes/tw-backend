import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import toaster from "toasted-notes"
import { setJWTToken } from "../../api/auth"
import { basic_api } from "../../api/axios_helper"
import bg from "../../assets/images/signup-bg.svg"
import CustomInput from "../../components/CustomInput"
import Notification from "../../components/Notification"

function Signin() {
  let navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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

  const signin = () => {
    console.log('login')
    if (isLoading) return
    const formData = new FormData()
    formData.append("username", email)
    formData.append("password", password)
    setIsloading(true)
    basic_api
      .post("/api/v1/login/", formData)
      .then(({ data }) => {
        setIsloading(false)
        Notification.Success("Signin completed!")
        setJWTToken(data?.token)
        navigate(`/company`)
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
              signin()
            }}
          >
            <FormHeader>Sign in</FormHeader>
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
            <Flex>
              <FlexedInput>
                <SubmitButton
                  onClick={() => navigate(`/company/signup`)}
                  background="#fff"
                  color="#e9bd5a"
                  type="button"
                >
                  Sign up
                </SubmitButton>
              </FlexedInput>
              <FlexedInput>
                <SubmitButton type="submit">Sign in</SubmitButton>
              </FlexedInput>
            </Flex>
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
  height: 512px;
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
  height: 424px;
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
  background: ${props => props.background ?? "#e9bd5a"};
  border-radius: 4px;
  margin-top: 60px;
  cursor: pointer;
  border-color: #e9bd5a;

  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 23.8383px;
  line-height: 32px;
  letter-spacing: -0.340548px;
  color: ${props => props.color ?? "#ffffff"};
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

export default Signin
