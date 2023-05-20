import React, { useCallback, useState } from "react"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { FilterMatchMode } from "primereact/api"
import { InputText } from "primereact/inputtext"
import { useDropzone } from "react-dropzone"
import {
  ActionButtons,
  PageContainer,
  StatusTemplate,
  TableContainer,
  ModalContainer,
  Modal,
  ModalHeaderText,
  ModalClose,
  Action
} from "./PayStubs.styled"
import IconButton from "../../../../components/IconButton"
import CreateIcon from "../../../../assets/icons/CreateIcon"
import { ModalHeader } from "react-bootstrap"
import CloseIcon from "../../../../assets/icons/CloseIcon"
import { DocNameTemplate, UploadZone } from "./Docs.styled"
import { main_api } from "../../../../api/axios_helper"
import moment from "moment"

const payStubsData = [
  {
    pay_stub: "#0000001",
    pay_period: "Jun 26, 2022 - Jul 2, 2022",
    date_generated: "Jul 9th, 2022"
  },
  {
    pay_stub: "#0000002",
    pay_period: "Jun 28, 2022 - Jul 2, 2022",
    date_generated: "Jul 9th, 2022"
  },
  {
    pay_stub: "#0000003",
    pay_period: "Jun 24, 2022 - Jul 2, 2022",
    date_generated: "Jul 8th, 2022"
  }
]

const PayStubs = ({ id, data, toast, getData }) => {
  const [payStubs, setPayStubs] = useState(data)
  const [globalFilterValue2, setGlobalFilterValue2] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [files, setFiles] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  })

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    acceptedFiles.map(file => {
      setFiles([...files, file])
    })
  }, [])

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        "application/pdf": []
      }
    })

  const addDocument = () => {
    if (isLoading) return
    files.map(file => {
      var formdata = new FormData()
      formdata.append("pay_stub", file, file.name)
      formdata.append("staff", id)
      formdata.append(
        "pay_period_end",
        moment().add(30, "days").format("YYYY-MM-DD")
      )
      setIsLoading(true)
      main_api
        .post("/api/v1/staff-pay-stub/", formdata)
        .then(({ data }) => {
          setPayStubs([...payStubs, data])
          getData()
          setIsModalOpen(false)
          setIsLoading(false)
          toast.current.show({
            severity: "success",
            summary: "Uploaded!",
            life: 3000
          })
        })
        .catch(error => {
          console.log(error?.response?.data)
          setIsLoading(false)
          toast.current.show({
            severity: "error",
            summary: "Error",
            life: 3000
          })
        })
    })
  }

  const renderHeader1 = () => {
    return (
      <div className="d-flex justify-content-between">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue2}
            onChange={onGlobalFilterChange2}
            placeholder="Search...."
          />
        </span>
      </div>
    )
  }

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path}>{file.path}</li>
  ))
  const onGlobalFilterChange2 = e => {
    const value = e.target.value
    let _filters2 = { ...filters2 }
    _filters2["global"].value = value

    setFilters2(_filters2)
    setGlobalFilterValue2(value)
  }

  const header1 = renderHeader1()

  const payStubTemplate = data => {
    return (
      <DocNameTemplate href={data.pay_stub} target="_blank">
        {data.pay_stub?.split("/static/")[1]}
      </DocNameTemplate>
    )
  }

  const payPeriodTemplate = data => {
    return <p>{data.pay_period_start + " - " + data.pay_period_end}</p>
  }

  const dateGenerated = data => {
    return <p>{moment(data.uploaded_on).format("YYYY-MM-DD")}</p>
  }

  const rowRemove = id => {
    main_api.delete("/api/v1/staff-pay-stub/" + id + "/").then(res => {
      if (res.status >= 200 || res.status < 300) {
        setPayStubs([...payStubs.filter(item => item.id !== id)])
        getData()
        toast.current.show({
          severity: "success",
          summary: "Deleted!",
          life: 3000
        })
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          life: 3000
        })
      }
    })
  }

  const statusTemplate = data => {
    return (
      <StatusTemplate onClick={() => rowRemove(data.id)}>
        X Delete Document
      </StatusTemplate>
    )
  }

  return (
    <PageContainer>
      <ActionButtons>
        <IconButton
          background="#E9BD5A"
          color={"#fff"}
          text="Generate Pay Stub"
          icon={CreateIcon}
          onClick={() => setIsModalOpen(true)}
        />
      </ActionButtons>
      <TableContainer>
        <DataTable
          style={{ border: "none" }}
          tableStyle={{ border: "none" }}
          value={payStubs}
          header={header1}
          filters={filters2}
          globalFilterFields={[
            "pay_stub",
            "pay_period_start",
            "pay_period_end",
            "uploaded_on"
          ]}
          emptyMessage="No staff found."
          responsiveLayout="scroll"
          sortMode="single"
          sortField="doc_name"
          editMode="row"
          sortOrder={1}
        >
          <Column
            header="Pay Stub"
            field="pay_stub"
            body={payStubTemplate}
            sortable
          />
          <Column
            header="Pay Period"
            field="pay_period_end"
            body={payPeriodTemplate}
            sortable
          />
          <Column
            header="Date Generated"
            field="uploaded_on"
            body={dateGenerated}
            sortable
          />
          <Column header="" body={statusTemplate} />
        </DataTable>
      </TableContainer>
      <ModalContainer visible={isModalOpen}>
        <Modal>
          <ModalHeader>
            <ModalHeaderText>Upload document</ModalHeaderText>
            <ModalClose onClick={() => setIsModalOpen(false)}>
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
    </PageContainer>
  )
}

export default PayStubs
