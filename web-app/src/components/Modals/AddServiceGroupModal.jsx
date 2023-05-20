import React, { useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import styled from "styled-components"
import CustomInput from "../CustomInput"
import { main_api } from "../../api/axios_helper"

const AddServiceGroupModal = ({ show, handleClose, data, getServices }) => {
  const [serviceData, setServiceData] = useState([])
  const [service, setService] = useState({
    value: 1,
    label: "Select a Service"
  })
  const [groupName, setGroupName] = useState("")

  useEffect(() => {
    if (data) {
      const arr = []
      data.map(item => {
        arr.push({ value: item.id, label: item.service_name })
      })
      setServiceData(arr)
    }
  }, [data])

  const addGroup = async () => {
    const formData = new FormData()
    formData.append("service_group", groupName)
    const res = await main_api.put(
      "/api/v1/services/" + service.value + "/",
      formData
    )
    if (res.status === 200 || res.status === 201 || res.statusText === "OK") {
      getServices()
      handleClose()
    }
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
        <Modal.Title id="contained-modal-title-vcenter">
          Add Service Group
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DescriptionText>
          Add a new service group. Groups allow you to organize your services so
          they are easier to browse from the Client App, Client Portal and
          Dashboard.
        </DescriptionText>
        <ModalForm>
          <ModalFormItem>
            <ModalFormLabel>Group Name</ModalFormLabel>
            <CustomInput
              labelMargin="0 30px 0 0"
              vertical={false}
              border={"1px solid #E4EAF0"}
              padding="10px 15px"
              height="40px"
              width="264px"
              value={groupName}
              onChange={setGroupName}
            />
          </ModalFormItem>
          <ModalFormItem>
            <ModalFormLabel>Service</ModalFormLabel>
            <CustomInput
              type="select"
              labelMargin="0 30px 0 0"
              options={serviceData}
              value={service}
              onChange={setService}
              vertical={false}
              border={"1px solid #E4EAF0"}
              height="40px"
              selectHeight="40px"
              selectWidth="264px"
            />
          </ModalFormItem>
        </ModalForm>
      </Modal.Body>
      <Modal.Footer>
        <ModalButton type="cancel" onClick={handleClose}>
          Close
        </ModalButton>
        <ModalButton onClick={addGroup}>Add Group</ModalButton>
      </Modal.Footer>
    </ModalContainer>
  )
}

const ModalContainer = styled(Modal)`
  /* width: 631px; */

  .modal-dialog {
    max-width: 631px;

    .modal-header {
      padding: 19px 33px;

      .modal-title {
        font-size: 22px;
      }
    }

    .modal-body {
      padding: 24px 33px;
    }

    .modal-footer {
      padding: 19px 99px 21px;
    }
  }
`

const DescriptionText = styled.p`
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 20px;
`

const ModalForm = styled.div`
  padding: 0 24px;
`

const ModalFormItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 11px;
`

const ModalFormLabel = styled.div`
  width: 86px;
  min-width: 86px;
  margin-right: 55px;
  font-size: 14px;
  font-weight: 400;
  color: #000;
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

  background-color: ${props =>
    props.type === "cancel" ? "#CAD3DC" : "#34D1BF"};
  color: ${props => (props.type === "cancel" ? "#000" : "#fff")};
`
export default AddServiceGroupModal
