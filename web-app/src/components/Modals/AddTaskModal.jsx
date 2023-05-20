import React, { useState } from "react"
import { Modal } from "react-bootstrap"
import styled from "styled-components"
import { main_api } from "../../api/axios_helper"
import CustomInput from "../CustomInput"

const AddTaskModal = ({ show, handleClose, toast, setTasks, staffList }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [assign_to, setAssign_to] = useState("")
  const [client, setClient] = useState("")
  const [date, setDate] = useState("")

  const setTask = () => {
    if (!name || !description || !assign_to || !client || !date) return
    const formData = new FormData()
    formData.append("name", name)
    formData.append("description", description)
    formData.append("assign_to", assign_to.id)
    formData.append("client", client)
    formData.append("due_date", date)
    main_api
      .post("/api/v1/task/", formData)
      .then(({ data }) => {
        handleClose()
        setTasks(t => t.concat(data))
        toast.current.show({
          severity: "success",
          summary: "Add!",
          life: 3000
        })
      })
      .catch(error => {
        console.log(error?.response?.data)
        toast.current.show({
          severity: "error",
          summary: "Error",
          life: 3000
        })
      })
  }

  return (
    <ModalContainer
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CustomInput
          width={"261px"}
          height={"28px"}
          margin={"22px 0"}
          padding={"6px 14px"}
          label={"Name"}
          vertical={false}
          border={"1px solid #CAD3DC"}
          placeholder="Task Name"
          value={name}
          onChange={setName}
        />
        <CustomInput
          width={"261px"}
          height={"28px"}
          margin={"22px 0"}
          padding={"6px 14px"}
          label={"Client"}
          placeholder="Leslie Fox"
          vertical={false}
          border={"1px solid #CAD3DC"}
          value={client}
          onChange={setClient}
        />
        <CustomInput
          type="select"
          width={"261px"}
          height={"28px"}
          margin={"22px 0"}
          padding={"6px 14px"}
          label={"Assign To"}
          placeholder="Assign To"
          vertical={false}
          border={"1px solid #CAD3DC"}
          options={staffList.map(i => {
            i.value = i.id
            i.label = i.name
            return i
          })}
          value={assign_to}
          onChange={setAssign_to}
        />
        <CustomInput
          width={"261px"}
          height={"28px"}
          margin={"22px 0"}
          padding={"6px 14px"}
          label={"Description"}
          vertical={false}
          border={"1px solid #CAD3DC"}
          value={description}
          onChange={setDescription}
        />
        <CustomInput
          width={"261px"}
          height={"28px"}
          margin={"22px 0"}
          padding={"6px 14px"}
          label={"Due Date"}
          vertical={false}
          border={"1px solid #CAD3DC"}
          value={date}
          onChange={setDate}
          type="date"
        />
      </Modal.Body>
      <Modal.Footer>
        <ModalButton type="cancel" onClick={handleClose}>
          Close
        </ModalButton>
        <ModalButton onClick={setTask}>Add Task</ModalButton>
      </Modal.Footer>
    </ModalContainer>
  )
}

const ModalContainer = styled(Modal)`
  /* width: 631px; */

  .modal-dialog {
    max-width: 480px;

    .modal-header {
      padding: 19px 33px;

      .modal-title {
        font-size: 22px;
      }
    }

    .modal-body {
      padding: 30px;
    }

    .modal-footer {
      border: 0;
      padding: 0 51px 65px;
    }
  }
`
const ModalButton = styled.button`
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 400;
  border: 0;
  outline: 0;
  margin: 0;

  &:not(:last-of-type) {
    margin-right: 20px;
  }
  box-shadow: inset 0px -3px 0px rgba(0, 0, 0, 0.1);
  background-color: ${props =>
    props.type === "cancel" ? "#CAD3DC" : "#E9BD5A"};
  color: ${props => (props.type === "cancel" ? "#000" : "#fff")};
`
export default AddTaskModal
