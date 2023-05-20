import React, {useEffect, useState} from "react"
import {Modal} from "react-bootstrap"
import styled from "styled-components"

const AddServiceToPackageModal = ({show, handleClose, data, selectedService, setSelectedService}) => {
  const [serviceData, setServiceData] = useState([])
  const [service, setService] = useState()

  useEffect(() => {
    if (data.length) {
      const arr = [];
      data.filter(item => !selectedService.find(id => +id === item.id)).map(item => {
        arr.push({value: item.id, label: item.service_name})
      })
      if (arr.length) {
        setService(arr[0].value)
        setServiceData(arr)
      } else {
        setServiceData([{label: 'Select a Service', value: ''}])
        setService('')
      }
    }
  }, [data, selectedService])

  const addService = () => {
    if (service) {
      setSelectedService([...selectedService, service])
    }
    handleClose()
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
          Add Service
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalForm>
          <ModalFormItem>
            <ModalFormLabel>Service</ModalFormLabel>
            <Select value={service} onChange={e => setService(e.target.value)}>
              {
                serviceData.map((item, index) =>
                  <option key={index} value={item.value}>{item.label}</option>
                )
              }
            </Select>
          </ModalFormItem>
        </ModalForm>
      </Modal.Body>
      <Modal.Footer>
        <ModalButton type="cancel" onClick={handleClose}>
          Close
        </ModalButton>
        <ModalButton onClick={addService}>Add Service</ModalButton>
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
const Select = styled.select`
  width: 264px;
  height: 39px;
  border: 1px solid #CAD3DC;
  border-radius: 5px;
  font-weight: 400;
  font-size: 14px;
  outline: 0;
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
export default AddServiceToPackageModal



