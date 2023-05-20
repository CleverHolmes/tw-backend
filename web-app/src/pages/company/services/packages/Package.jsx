import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import CreateIcon from "../../../../assets/icons/CreateIcon"
import IconButton from "../../../../components/IconButton"
import EditImg from "../../../../assets/images/edit_icon.svg"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { FilterMatchMode } from "primereact/api"
import { InputText } from "primereact/inputtext"
import "primeicons/primeicons.css"
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.css"
import { main_api } from "../../../../api/axios_helper"

const columns = [
  { field: "package_name", header: "Packages" },
  { field: "package_type", header: "Type" },
  { field: "package_limit", header: "Discound/Cost" },
  { field: "taxable", header: "Taxable" },
  { field: "service_group", header: "" }
]

const Package = ({ setActiveTabItem }) => {
  const [packages, setPackages] = useState([])
  const [disabledPackages, setDisabledPackages] = useState([])
  const [isCreate, setIsCreate] = useState(false)
  const [globalFilterValue2, setGlobalFilterValue2] = useState("")
  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS }
  })
  const navigate = useNavigate()
  const location = useLocation()

  const renderHeader1 = () => {
    return (
      <div className="flex justify-content-end">
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

  const dynamicColumns = columns.map((col, i) => {
    return (
      <Column
        key={i}
        columnKey={col.field}
        className="ddd"
        field={col.field}
        header={col.header}
        headerStyle={{ background: "none" }}
      />
    )
  })

  const onGlobalFilterChange2 = e => {
    const value = e.target.value
    let _filters2 = { ...filters2 }
    _filters2["global"].value = value

    setFilters2(_filters2)
    setGlobalFilterValue2(value)
  }

  const header1 = renderHeader1()

  const headerTemplate = data => {
    return (
      <React.Fragment>
        <GroupHeader>{data.service_group}</GroupHeader>
      </React.Fragment>
    )
  }

  const editTemplate = data => {
    return (
      <EditButton
        onClick={() =>
          navigate("/company/services/packages/add-package/" + data.id)
        }
      >
        <EditIcon src={EditImg} alt="edit-icon" />
        Edit
      </EditButton>
    )
  }

  const getPackages = async () => {
    const { data } = await main_api.get("/api/v1/packages/")
    setPackages([...data.filter(item => item.disabled === false)])
    setDisabledPackages([...data.filter(item => item.disabled === true)])
  }

  useEffect(() => {
    getPackages()
  }, [location.pathname])

  return (
    <>
      <ActionButtons>
        <IconButton
          background="#E9BD5A"
          color={"#fff"}
          text="New Package"
          icon={CreateIcon}
          margin="0 20px 0 0"
          onClick={() => navigate("/company/services/packages/add-package")}
        />
        <IconButton
          background="#34D1BF"
          color={"#fff"}
          text="Reorder Package"
          icon={CreateIcon}
          margin="0 20px 0 0"
          onClick={() => setActiveTabItem(2)}
        />
      </ActionButtons>
      <TableContainer>
        <DataTable
          style={{ border: "none" }}
          tableStyle={{ border: "none" }}
          value={packages}
          header={header1}
          filters={filters2}
          globalFilterFields={["package_name", "package_type", "taxable"]}
          emptyMessage="No customers found."
          responsiveLayout="scroll"
          sortMode="single"
          sortField="service_group"
          editMode="row"
          sortOrder={1}
          rowGroupHeaderTemplate={headerTemplate}
        >
          {dynamicColumns}
          <Column field="edit" header="" body={editTemplate} />
        </DataTable>
      </TableContainer>
      <DisableTitle>Disabled Services</DisableTitle>
      <TableContainer>
        <DataTable
          style={{ border: "none" }}
          tableStyle={{ border: "none" }}
          value={disabledPackages}
          header={header1}
          filters={filters2}
          globalFilterFields={[
            "service_name",
            "cost",
            "default_staff_rate",
            "taxable"
          ]}
          emptyMessage="No customers found."
          responsiveLayout="scroll"
          sortMode="single"
          sortField="service_group"
          editMode="row"
          sortOrder={1}
          rowGroupHeaderTemplate={headerTemplate}
        >
          {dynamicColumns}
          <Column field="edit" header="" body={editTemplate} />
        </DataTable>
      </TableContainer>
    </>
  )
}

const ActionButtons = styled.div`
  display: flex;
  margin-bottom: 40px;
`
const DisableTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #414d55;
  margin-top: 40px;
  margin-bottom: 20px;
`
const GroupHeader = styled.span`
  color: #414d55;
  font-size: 18px;
  font-weight: bold;
`
const TableContainer = styled.div`
  border: none;

  .p-datatable-wrapper {
    overflow: hidden;
  }

  .p-datatable-header {
    border: none;
  }

  tr {
    /* border: 1px solid; */
    /* border-width: 0 0 1px 0; */

    &.p-row-odd {
      background-color: #fafafa;
    }
  }

  thead {
    tr {
      border: none !important;

      th {
        background: #fff !important;

        &:nth-last-child(2) {
          display: none;
        }
      }
    }
  }

  .p-datatable-tbody {
    td {
      padding: 15px 25px !important;
      font-size: 14px;
    }

    tr {
      td {
        border: 0;
      }

      &:not(.p-rowgroup-header) {
        td:nth-last-child(2) {
          display: none;
        }
      }
    }

    .p-rowgroup-header {
      border: none;

      td {
        padding: 10px 0 !important;
      }
    }
  }
`
const EditButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  color: #0496ff;
  background-color: transparent;
  border: 0;
  outline: 0;
`
const EditIcon = styled.img`
  width: 11px;
  height: 13px;
  margin-right: 8px;
  padding-top: 2px;
`
export default Package
