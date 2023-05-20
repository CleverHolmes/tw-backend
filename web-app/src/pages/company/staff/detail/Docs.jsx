import React, { useCallback, useState } from "react"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { FilterMatchMode } from "primereact/api"
import { InputText } from "primereact/inputtext"
import {
  Browse,
  DocNameTemplate,
  Icon,
  PageContainer,
  StatusTemplate,
  TableContainer,
  UploadZone
} from "./Docs.styled"
import { useDropzone } from "react-dropzone"
import CsvIcon from "../../../../assets/icons/CsvIcon"
import PptxIcon from "../../../../assets/icons/PptxIcon"
import moment from "moment"
import { useEffect } from "react"
import { main_api } from "../../../../api/axios_helper"

const Docs = ({ id, data, toast, getData }) => {
  const [docs, setDocs] = useState(data)
  const [globalFilterValue2, setGlobalFilterValue2] = useState("")
  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  })

  const onDrop = useCallback(
    acceptedFiles => {
      // Do something with the files
      const arr = []
      acceptedFiles.map(file => {
        const formData = new FormData()
        formData.append("upload_document", file, file.name)
        formData.append("staff", id)
        main_api.post("/api/v1/staff-document/", formData).then(res => {
          if (res.status >= 200 || res.status < 300) {
            setDocs([...docs, res.data])
            getData()
            toast.current.show({
              severity: "success",
              summary: "Uploaded!",
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
      })
    },
    [docs]
  )

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        "application/pdf": [".pdf", ".ppt", ".pptx", ".csv", ".doc", ".docx"]
      }
    })

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

  const onGlobalFilterChange2 = e => {
    const value = e.target.value
    let _filters2 = { ...filters2 }
    _filters2["global"].value = value

    setFilters2(_filters2)
    setGlobalFilterValue2(value)
  }

  const header1 = renderHeader1()

  const docNameTemplate = data => {
    const arr = data.upload_document?.split(".")
    return (
      <DocNameTemplate href={data.upload_document} target="_blank">
        {arr[arr.length - 1].includes("ppt") ||
        arr[arr.length - 1].includes("pdf") ||
        arr[arr.length - 1].includes("doc") ? (
          <Icon width={"12.5px"} height={"12px"} marginRight={"10px"}>
            {PptxIcon}
          </Icon>
        ) : (
          <Icon width={"15px"} height={"14px"} marginRight={"10px"}>
            {CsvIcon}
          </Icon>
        )}
        {data.upload_document?.split("/static/")[1]}
      </DocNameTemplate>
    )
  }

  const uploadedOnTemplate = data => {
    return <p>{moment(data.uploaded_on).format("MMM DD, YYYY, hh:mm:ss A")}</p>
  }

  const rowRemove = id => {
    main_api.delete("/api/v1/staff-document/" + id + "/").then(res => {
      if (res.status >= 200 || res.status < 300) {
        setDocs([...docs.filter(item => item.id !== id)])
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
      <UploadZone {...getRootProps()}>
        <input {...getInputProps()} />
        <Browse>Browse </Browse>Documents to Upload
      </UploadZone>
      <TableContainer>
        <DataTable
          style={{ border: "none" }}
          tableStyle={{ border: "none" }}
          value={docs}
          header={header1}
          filters={filters2}
          globalFilterFields={["upload_document", "uploaded_on"]}
          emptyMessage="No staff found."
          responsiveLayout="scroll"
          sortMode="single"
          sortField="id"
          editMode="row"
          sortOrder={1}
        >
          <Column
            header="Name"
            field="upload_document"
            body={docNameTemplate}
            sortable
          />
          <Column
            header="Uploaded On"
            field="uploaded_on"
            body={uploadedOnTemplate}
            sortable
          />
          <Column header="" body={statusTemplate} />
        </DataTable>
      </TableContainer>
    </PageContainer>
  )
}

export default Docs
