import React, { useCallback, useState, useEffect, useRef } from "react";
import { Form, Modal } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { main_api } from "../../api/axios_helper";

const AddKeyModal = ({
  show,
  handleClose,
  toast,
  clientList,
  serviceList,
  id,
  getData,
}) => {
  const addNewKey = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("staff", id);
    main_api
      .post("/api/v1/staff-key/", formData)
      .then(({ data }) => {
        getData();
        handleClose();
        toast.current.show({
          severity: "success",
          summary: "Added!",
          life: 3000,
        });
      })
      .catch((error) => {
        console.log(error?.response?.data);
        toast.current.show({
          severity: "error",
          summary: "Error",
          life: 3000,
        });
      });
  };

  return (
    <ModalContainer
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form onSubmit={addNewKey}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">New Key</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormLabel>
            Client:
            <CustomSelect name="client">
              {clientList.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.full_name}
                </option>
              ))}
            </CustomSelect>
          </FormLabel>
          <FormLabel>
            Service:
            <CustomSelect name="service">
              {serviceList.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.service_name}
                </option>
              ))}
            </CustomSelect>
          </FormLabel>
        </Modal.Body>
        <Modal.Footer>
          <ModalButton type="button" onClick={handleClose}>
            Close
          </ModalButton>
          <ModalButton>Add Key</ModalButton>
        </Modal.Footer>
      </form>
    </ModalContainer>
  );
};

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
      padding: 20px;
    }
  }
`;
const FormLabel = styled.label`
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;
const CustomSelect = styled(Form.Select)`
  height: 40px;
  width: 80%;
  margin-left: 15px;
`;
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
  background-color: ${(props) =>
    props.type === "button" ? "#CAD3DC" : "#E9BD5A"};
  color: ${(props) => (props.type === "button" ? "#000" : "#fff")};
`;
export default AddKeyModal;
