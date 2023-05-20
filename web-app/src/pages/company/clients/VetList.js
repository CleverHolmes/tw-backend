import React, { useEffect, useState } from "react"
import { CSVLink } from "react-csv"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { main_api } from "../../../api/axios_helper"
import CloseIcon from "../../../assets/icons/CloseIcon"
import CreateIcon from "../../../assets/icons/CreateIcon"
import ExportIcon from "../../../assets/icons/ExportIcon"
import CustomInput from "../../../components/CustomInput"
import IconButton from "../../../components/IconButton"
import Notification from "../../../components/Notification"
import Table from "../../../components/Table"

function VetList() {
  const [isLoading, setIsloading] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [work_phone, setWork_phone] = useState("")
  const [address1, setAddress1] = useState("")
  const [address2, setAddress2] = useState("")
  const [city, setCity] = useState("")
  const [zip, setZip] = useState("")
  const [state, setState] = useState("")
  const [notes, setNotes] = useState("")

  const [list, setList] = useState([])

  const GetVet = () => {
    setIsloading(true)
    main_api
      .get("/api/v1/client_vet/")
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
    GetVet()
  }, [])

  const addVet = () => {
    if (isLoading) return
    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("work_phone", work_phone)
    formData.append("address1", address1)
    formData.append("address2", address2)
    formData.append("city", city)
    formData.append("zip", zip)
    formData.append("state", state)
    formData.append("notes", notes)
    setIsloading(true)
    main_api
      .post("/api/v1/client_vet/", formData)
      .then(({ data }) => {
        setIsloading(false)
        Notification.Success("added")
        setList(l => l.concat(data))
        setModalOpen(false)
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
    <>
      <ActionButtons>
        <IconButton
          background="#E9BD5A"
          color={"#fff"}
          text="New Vet"
          icon={CreateIcon}
          onClick={() => setModalOpen(true)}
        />
        <CSVLink
          data={list}
          filename={"vet-list.csv"}
          style={{ textDecoration: "none" }}
          target="_blank"
        >
          <IconButton
            fill="#fff"
            border="1px solid #D0D5DD"
            margin="0 20px"
            text="Export"
            icon={ExportIcon}
          />
        </CSVLink>
      </ActionButtons>
      <Table
        headers={[
          { title: "Full Name", id: "name", clickable: true },
          { title: "Email", id: "email", clickable: true },
          { title: "Phone", id: "work_phone" },
          { title: "Address", id: "address1" }
        ]}
        data={list}
      />
      <ModalContainer visible={isModalOpen}>
        <Modal>
          <ModalHeader>
            <ModalHeaderText>New Vet</ModalHeaderText>
            <ModalClose onClick={() => setModalOpen(false)}>
              {CloseIcon}
            </ModalClose>
          </ModalHeader>
          <CustomInput
            width={"261px"}
            height={"28px"}
            margin={"22px 0"}
            label={"Name"}
            vertical={false}
            border={"1px solid #CAD3DC"}
            value={name}
            onChange={setName}
          />
          <CustomInput
            width={"261px"}
            height={"28px"}
            margin={"22px 0"}
            label={"Email"}
            vertical={false}
            border={"1px solid #CAD3DC"}
            value={email}
            onChange={setEmail}
          />
          <CustomInput
            width={"261px"}
            height={"28px"}
            margin={"22px 0"}
            label={"Phone"}
            vertical={false}
            border={"1px solid #CAD3DC"}
            value={work_phone}
            onChange={setWork_phone}
          />
          <CustomInput
            width={"261px"}
            height={"28px"}
            margin={"22px 0"}
            label={"Address 1"}
            vertical={false}
            border={"1px solid #CAD3DC"}
            value={address1}
            onChange={setAddress1}
          />
          <CustomInput
            width={"261px"}
            height={"28px"}
            margin={"22px 0"}
            label={"Address 2"}
            vertical={false}
            border={"1px solid #CAD3DC"}
            value={address2}
            onChange={setAddress2}
          />
          <CustomInput
            width={"261px"}
            height={"28px"}
            margin={"22px 0"}
            label={"City"}
            vertical={false}
            border={"1px solid #CAD3DC"}
            value={city}
            onChange={setCity}
          />
          <CustomInput
            width={"261px"}
            height={"28px"}
            margin={"22px 0"}
            label={"State"}
            vertical={false}
            border={"1px solid #CAD3DC"}
            value={state}
            onChange={setState}
          />
          <CustomInput
            width={"261px"}
            height={"28px"}
            margin={"22px 0"}
            label={"Zip"}
            vertical={false}
            border={"1px solid #CAD3DC"}
            value={zip}
            onChange={setZip}
          />
          <CustomInput
            width={"261px"}
            height={"28px"}
            margin={"22px 0"}
            label={"Notes"}
            vertical={false}
            border={"1px solid #CAD3DC"}
            value={notes}
            onChange={setNotes}
          />
          <Action onClick={addVet}>Add Vet</Action>
        </Modal>
      </ModalContainer>
    </>
  )
}
const ActionButtons = styled.div`
  display: flex;
  margin-bottom: 27px;
`

const ModalContainer = styled.div`
  position: absolute;
  display: ${props => (props.visible ? "flex" : "none")};
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(229, 236, 239, 0.4);
  backdrop-filter: blur(1.5px);
  align-items: center;
  justify-content: center;
`

const Modal = styled.div`
  padding: 30px;
  max-height: 80%;
  overflow: scroll;
  padding-left: 55px;
  background: #ffffff;
  box-shadow: 0px 1px 8px rgba(110, 110, 110, 0.1);
  border-radius: 16px;
  width: 480px;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ModalHeaderText = styled.span`
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  letter-spacing: 0.01px;
  color: #414d55;
`

const ModalClose = styled.svg`
  width: 30px;
  height: 30px;
  cursor: pointer;
  stroke: #414d55;
`
const Action = styled.button`
  width: 72px;
  height: 28px;
  background: #e9bd5a;
  border-radius: 6px;
  border: none;
  margin-left: auto;
  margin-top: 30px;
  cursor: pointer;

  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  color: #ffffff;

  &:hover {
    background: lightblue;
  }
`

export default VetList
