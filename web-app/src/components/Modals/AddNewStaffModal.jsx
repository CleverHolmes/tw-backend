import React, { useCallback, useState, useEffect, useRef } from "react"
import { Modal } from "react-bootstrap"
import { useDropzone } from "react-dropzone"
import styled from "styled-components"
import { main_api } from "../../api/axios_helper"

const staffRoleData = [
  { value: "administrator", label: "Administrator" },
  { value: "office manager", label: "Office Manager" },
  { value: "staff", label: "Staff" },
  { value: "trainee", label: "Trainee" }
]

const AddNewStaffModal = ({
  show,
  handleClose,
  toast,
  getData,
  data,
  staffId
}) => {
  const [staffRole, setStaffRole] = useState(staffRoleData[0].value)
  const [files, setFiles] = useState()
  const [primaryLocation, setPrimaryLocation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const formRef = useRef()

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    acceptedFiles.map(file => {
      setFiles(file)
      console.log(file)
    })
  }, [])

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": []
      }
    })

  const closeModal = () => {
    handleClose()
    setFiles()
  }

  const addNewStaff = async e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    formData.append("staff_role", staffRole)
    if (files) {
      formData.append("avatar", files, files.name)
    }
    if (staffId) {
      main_api
        .put("/api/v1/staff-list/" + staffId + "/", formData)
        .then(({ data }) => {
          getData()
          closeModal()
          toast.current.show({
            severity: "success",
            summary: "Saved!",
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
    } else {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16)
      formData.append("color", "#" + randomColor)
      main_api
        .post("/api/v1/staff-list/", formData)
        .then(({ data }) => {
          getData()
          closeModal()
          toast.current.show({
            severity: "success",
            summary: "Saved!",
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
  }

  useEffect(() => {
    if (data) {
      console.log(data)
      formRef.current.staff_name.value = data.staff_name
      formRef.current.email.value = data.email
      formRef.current.phone_number.value = data.phone_number
      formRef.current.secondary_phone_number.value = data.secondary_phone_number
      formRef.current.primary_location.value = data.primary_location
      setStaffRole(data.staff_role)
    }
  }, [data])

  return (
    <ModalContainer
      show={show}
      onHide={closeModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form ref={formRef} onSubmit={addNewStaff}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            New Staff
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalForm>
            {data && (
              <ModalFormItem>
                <ModalFormLabel>Avatar</ModalFormLabel>
                <UploadZone
                  {...getRootProps()}
                  isFile={!!files || !!data?.avatar}
                >
                  <input {...getInputProps()} />
                  <div className="upload-panel">Drag & drop or browse</div>
                  {files ? (
                    <img src={URL.createObjectURL(files)} alt="upload-image" />
                  ) : data?.avatar ? (
                    <img src={data.avatar} alt="upload-image" />
                  ) : (
                    ""
                  )}
                </UploadZone>
              </ModalFormItem>
            )}
            <ModalFormItem>
              <ModalFormLabel>Name</ModalFormLabel>
              <ModalFormInput name="staff_name" required />
            </ModalFormItem>
            <ModalFormItem>
              <ModalFormLabel>Email</ModalFormLabel>
              <ModalFormInput type="email" name="email" required />
            </ModalFormItem>
            <ModalFormItem>
              <ModalFormLabel>Primary Phone</ModalFormLabel>
              <ModalFormInput name="phone_number" required />
            </ModalFormItem>
            <ModalFormItem>
              <ModalFormLabel>Secondary Phone</ModalFormLabel>
              <ModalFormInput name="secondary_phone_number" required />
            </ModalFormItem>
            <ModalFormItem>
              <ModalFormLabel>Primary Location</ModalFormLabel>
              <ModalFormInput name="primary_location" required />
            </ModalFormItem>
            <ModalFormItem>
              <ModalFormLabel>Role</ModalFormLabel>
              <ModalFormSelect
                value={staffRole}
                onChange={e => setStaffRole(e.target.value)}
              >
                {staffRoleData.map((staffRole, index) => (
                  <option value={staffRole.value} key={index}>
                    {staffRole.label}
                  </option>
                ))}
              </ModalFormSelect>
            </ModalFormItem>
          </ModalForm>
        </Modal.Body>
        <Modal.Footer>
          {/* <ModalButton type="cancel" onClick={closeModal}>
            Close
          </ModalButton> */}
          <ModalButton>Add Staff</ModalButton>
        </Modal.Footer>
      </form>
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
      padding: 27px 0;
    }

    .modal-footer {
      border: 0;
      padding: 0 51px 65px;
    }
  }
`

const ModalForm = styled.div`
  padding: 0 24px;
`
const UploadZone = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px dashed #cad3dc;
  cursor: pointer;
  position: relative;
  .upload-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #8b8698;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 0.01px;
    padding: 5px;
    background-color: transparent;
    text-align: center;
    z-index: 2;
    border-radius: 50%;
    &:hover {
      background-color: ${props =>
        props.isFile ? "#00000053" : "transparent"};
      color: ${props => (props.isFile ? "#fff" : "#8b8698")};
    }
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
`
const ModalFormItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 22px;
`
const ModalFormLabel = styled.div`
  width: 120px;
  margin-right: 29px;
  font-size: 12px;
  font-weight: 600;
  color: #414d55;
  text-align: end;
`
const ModalFormInput = styled.input`
  width: 260px;
  height: 28px;
  border: 1px solid #cad3dc;
  border-radius: 5px;
  outline: 0;
  color: #414d55;
`
const ModalFormSelect = styled.select`
  width: 230px;
  height: 28px;
  border: 1px solid #cad3dc;
  border-radius: 5px;
  outline: 0;
  color: #414d55;
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
  /* box-shadow: inset 0px -3px 0px rgba(0, 0, 0, 0.1); */
  background-color: ${props =>
    props.type === "cancel" ? "#CAD3DC" : "#E9BD5A"};
  color: ${props => (props.type === "cancel" ? "#000" : "#fff")};
`
export default AddNewStaffModal
