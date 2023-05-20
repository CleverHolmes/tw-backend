import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { main_api } from "../../../api/axios_helper"
import CreateIcon from "../../../assets/icons/CreateIcon"
import ExportIcon from "../../../assets/icons/ExportIcon"
import CustomInput from "../../../components/CustomInput"
import IconButton from "../../../components/IconButton"
import Notification from "../../../components/Notification"
import Table from "../../../components/Table"

function Create({ done, edit, data }) {
  const [isSelected, setIsSelected] = useState(false)
  const [isLoading, setIsloading] = useState(false)

  const [full_name, setfull_name] = useState(data?.full_name ?? "")
  const [email, setemail] = useState(data?.email ?? "")
  const [phone_number, setphone_number] = useState(data?.phone_number ?? "")
  const [address_1, setaddress_1] = useState(data?.address_1 ?? "")
  const [city, setcity] = useState(data?.city ?? "")
  const [state, setstate] = useState(data?.state ?? "")
  const [zip, setzip] = useState(data?.zip ?? "")

  const createClient = () => {
    setIsloading(true)
    const formData = new FormData()
    formData.append("full_name", full_name)
    formData.append("email", email)
    formData.append("phone_number", phone_number)
    formData.append("address_1", address_1)
    formData.append("city", city)
    formData.append("state", state)
    formData.append("zip", zip)

    if (edit) {
      main_api
        .put(`/api/v1/client/${data?.id}/`, formData)
        .then(({ data }) => {
          Notification.Success("Client profile edited.")
          setIsloading(false)
          done(data)
        })
        .catch(error => {
          Notification.Error(
            error?.response?.data[Object.keys(error?.response?.data)[0]]
          )
          setIsloading(false)
        })
    } else {
      main_api
        .post("/api/v1/client/", formData)
        .then(({ data }) => {
          Notification.Success("Created")
          setIsloading(false)
          done()
        })
        .catch(error => {
          console.log(error?.response?.data)
          Notification.Error(
            error?.response?.data[Object.keys(error?.response?.data)[0]][0]
          )
          setIsloading(false)
        })
    }
  }

  return (
    <>
      <CreateContainer
        onSubmit={e => {
          e.preventDefault()

          createClient()
        }}
        noBorder={edit}
      >
        <Header>Primary Information </Header>
        <FormRow>
          <RowItem>
            <CustomInput
              value={full_name}
              onChange={setfull_name}
              label={"Full Name *"}
              padding={"6px 14px"}
              border={"1px solid #CAD3DC"}
            />
          </RowItem>
          <RowItem>
            <CustomInput
              value={email}
              onChange={setemail}
              type="email"
              label={"Email  *"}
              padding={"6px 14px"}
              border={"1px solid #CAD3DC"}
            />
          </RowItem>
        </FormRow>
        <FormRow>
          <RowItem>
            <CustomInput
              value={phone_number}
              onChange={setphone_number}
              label={"Phone Number *"}
              padding={"6px 14px"}
              border={"1px solid #CAD3DC"}
            />
          </RowItem>
          <RowItem>
            <CustomInput
              value={address_1}
              onChange={setaddress_1}
              label={"Address  1 *"}
              padding={"6px 14px"}
              border={"1px solid #CAD3DC"}
            />
          </RowItem>
        </FormRow>
        <FormRow>
          <RowItem>
            <CustomInput
              value={city}
              onChange={setcity}
              label={"City *"}
              padding={"6px 14px"}
              border={"1px solid #CAD3DC"}
            />
          </RowItem>
          <RowItem>
            <CustomInput
              value={state}
              onChange={setstate}
              label={"State *"}
              padding={"6px 14px"}
              border={"1px solid #CAD3DC"}
            />
          </RowItem>
        </FormRow>
        <FormRow>
          <RowItem>
            <CustomInput
              value={zip}
              onChange={setzip}
              label={"Zip Code *"}
              padding={"6px 14px"}
              border={"1px solid #CAD3DC"}
            />
          </RowItem>
        </FormRow>
        {!edit ? (
          <>
            <FormRow>
              <SubTitle>Client Welcome Email</SubTitle>
              <CheckBoxContainer>
                <CheckBox type="checkbox" required />
              </CheckBoxContainer>
              <SpanText>Send Client Welcome Email.</SpanText>
            </FormRow>
            <SpanText2>
              The Welcome Email contains a secure link for your client to create
              a password to access their account. If skipped, it can be sent at
              a later point.
            </SpanText2>
            <Button loading={isLoading} type="submit">
              Create Client, Send Welcome Email
            </Button>
          </>
        ) : (
          <Button loading={isLoading} type="submit">
            Update Client Info
          </Button>
        )}
      </CreateContainer>
    </>
  )
}
const CreateContainer = styled.form`
  width: 763px;
  height: 676px;
  padding: 50px 62px;
  background: #ffffff;
  border: ${props => (props.noBorder ? "nonr" : "1px solid #e4eaf0")};
  border-radius: 16px;
  box-sizing: border-box;
`

const FormContainer = styled.form``
const Header = styled.h1`
  height: 20px;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  letter-spacing: 0.01px;
  color: #414d55;
`

const FormRow = styled.div`
  display: flex;
  margin-top: 40px;
  align-items: center;
`

const RowItem = styled.div`
  width: 220px;
  height: 58px;
  margin-right: 50px;
`

const SubTitle = styled.h2`
  height: 20px;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  align-items: center;
  letter-spacing: 0.01px;
  color: #414d55;
  margin-right: 20px;
`

const SpanText = styled.span`
  height: 20px;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  align-items: center;
  letter-spacing: 0.01px;
  color: #414d55;
`

const SpanText2 = styled.span`
  width: 492px;
  height: 40px;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  display: flex;
  align-items: center;
  letter-spacing: 0.01px;
  color: #000000;
  margin-left: auto;
`

const CheckBoxContainer = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #a2c4d4;
  margin-right: 5px;
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

const Button = styled.button`
  margin-top: 30px;
  padding: 6px 14px;
  height: 28px;
  background: ${props => (props.loading ? "lightblue" : "#e9bd5a")};
  border: none;
  border-radius: 6px;
  margin-left: 145px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #ffffff;
  &: hover {
    background: lightblue;
  }
`

export default Create
