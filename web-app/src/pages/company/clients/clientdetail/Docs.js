import moment from "moment"
import React, { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { main_api } from "../../../../api/axios_helper"
import CloseIcon from "../../../../assets/icons/CloseIcon"
import CreateIcon from "../../../../assets/icons/CreateIcon"
import IconButton from "../../../../components/IconButton"
import Table from "../../../../components/Table"

function Docs() {
  const [isLoading, setIsloading] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)

  let { clientId } = useParams()

  const [files, setFiles] = useState({})

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    acceptedFiles.map(file => {
      setFiles(file)
    })
  }, [])
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        "application/pdf": []
      }
    })

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path}>{file.path}</li>
  ))

  const [list, setList] = useState([])

  const GetDoc = () => {
    setIsloading(true)
    main_api
      .get(`/api/v1/document/?cid=${clientId}`)
      .then(({ data }) => {
        setList(
          data.map(m => {
            return {
              id: m?.id,
              name: m?.upload_document.split("/")?.[
                m?.upload_document.split("/").length - 1
              ],
              url: m?.upload_document,
              uploaded_on: moment(m?.uploaded_on).format("MMM DD, YYYY"),
              status: "X Delete Document"
            }
          })
        )
        setIsloading(false)
      })
      .catch(error => {
        console.log(error?.response?.data)
        setIsloading(false)
      })
  }

  const addDocument = () => {
    if (isLoading) return
    var formdata = new FormData()
    formdata.append("upload_document", files, files.name)
    formdata.append("client", clientId)

    setIsloading(true)
    main_api
      .post("/api/v1/document/", formdata)
      .then(({ data }) => {
        setList(l =>
          l.concat({
            id: data?.id,
            name: data?.upload_document?.split("/")?.[
              data?.upload_document.split("/").length - 1
            ],
            url: data?.upload_document,
            uploaded_on: moment(data?.uploaded_on).format("MMM DD, YYYY"),
            status: "X Delete Document"
          })
        )
        setModalOpen(false)
        setIsloading(false)
      })
      .catch(error => {
        console.log(error?.response?.data)
        setIsloading(false)
      })
  }

  const deleteDocument = id => {
    if (isLoading) return
    setIsloading(true)
    main_api
      .delete(`/api/v1/document/${id}/`)
      .then(({ data }) => {
        setList(l => l.filter(x => x?.id !== id))
        setIsloading(false)
      })
      .catch(error => {
        console.log(error?.response?.data)
        setIsloading(false)
      })
  }

  useEffect(() => {
    GetDoc()
  }, [])

  return (
    <>
      <ActionButtons>
        <IconButton
          background="#E9BD5A"
          color={"#fff"}
          text="Upload Document"
          icon={CreateIcon}
          onClick={() => setModalOpen(true)}
        />
      </ActionButtons>
      <Table
        headers={[
          {
            title: "Name",
            id: "name",
            clickable: true,
            to: data => {
              console.log("sdsdsds", data)
              window.open(data?.url, "_blank")
            }
          },
          {
            title: `Uploaded On`,
            id: "uploaded_on"
          },
          {
            title: "",
            id: "status",
            card: (d, item) => (
              <ServiceStatusCard
                onClick={() => deleteDocument(item?.id)}
                text={d}
              />
            )
          }
        ]}
        data={list}
      />

      <ModalContainer visible={isModalOpen}>
        <Modal>
          <ModalHeader>
            <ModalHeaderText>Upload document</ModalHeaderText>
            <ModalClose onClick={() => setModalOpen(false)}>
              {CloseIcon}
            </ModalClose>
          </ModalHeader>
          <UploadZone {...getRootProps()}>
            <input {...getInputProps()} />
            Drag & drop or browse
          </UploadZone>

          <ul>{acceptedFileItems}</ul>
          <Action onClick={addDocument}>
            {isLoading ? "Uploading" : "Upload"}
          </Action>
        </Modal>
      </ModalContainer>
    </>
  )
}
const ActionButtons = styled.div`
  display: flex;
  margin-bottom: 27px;
`

const TabContainer = styled.div`
  padding: 10px 16px;
  height: 54px;
  box-sizing: border-box;
  background: #fcfcfc;
  box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  display: flex;
`
const TabButton = styled.button`
  background-color: ${props => (props.active ? "#FBF2DE" : "transparent")};
  padding: 9px 8px;
  height: 34px;
  border-radius: 4px;
  border: none;
  margin-left: ${props => props.marginLeft ?? "0"};
  cursor: pointer;

  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
  color: ${props => (props.active ? "#E9BD5A" : "#000")};

  &:hover {
    background-color: lightblue;
  }
`
const VaccinationTabContainer = styled.div`
  height: 24px;
  width: 274px;
  display: flex;
  box-sizing: border-box;
  background: #f2f6f9;
  border: 1px solid #d8e2e8;
  border-radius: 6px;
  margin-bottom: 20px;
  justify-content: space-between;
`

const VaccinationButton = styled.button`
  background-color: ${props => (props.active ? "#FFFFFF" : "transparent")};
  padding: 0 16px;
  height: 34px;
  cursor: pointer;
  // width: 123px;
  height: 24px;
  border: ${props => (props.active ? "1px solid #d8e2e8" : "none")};
  border-radius: 6px;

  font-weight: 400;
  font-size: 12px;
  line-height: 11px;
  color: ${props => (props.active ? "#1B2126" : "#9FA9B2")};

  &:hover {
    background-color: lightblue;
  }
`

const SelectContainer = styled.div``

const ActionButton = styled.button`
  background-color: #e9bd5a;
  padding: 6px 14px;
  height: 28px;
  border-radius: 4px;
  border: none;
  margin-left: ${props => props.marginLeft ?? "0"};
  cursor: pointer;
  align-self: center;

  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
  color: #ffffff;

  &:hover {
    background-color: lightblue;
  }
`

const ServiceStatusCard = styled.span`
  height: 20px;
  background: ${props => (props.text == "Scheduled" ? "#354563" : "#FF4545")};
  border-radius: 4px;
  padding: 0 26px;

  height: 20px;
  font-weight: 700;
  font-size: 10px;
  line-height: 20px;
  letter-spacing: 0.5px;
  // text-transform: uppercase;
  color: #ffffff;

  &:before {
    content: "${props => props.text}";
  }
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

const UploadText = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.136219px;
  color: #5e5e5e;
  margin-bottom: 20px;
`

const UploadZone = styled.div`
  margin-top: 20px;
  width: 344px;
  height: 28px;
  background: #ffffff;
  border: 1px dashed #cad3dc;
  border-radius: 5px;
  padding-left: 49px;

  font-weight: 400;
  font-size: 10px;
  line-height: 20px;
  display: flex;
  align-items: center;
  letter-spacing: 0.01px;
  color: #8b8698;
`

export default Docs
