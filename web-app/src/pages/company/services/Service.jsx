import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import IconButton from "../../../components/IconButton"
import CreateIcon from "../../../assets/icons/CreateIcon"
import EditImg from "../../../assets/images/edit_icon.svg"
import ArrowDownIcon from "../../../assets/images/arrow-down_icon_white.svg"
import Table from "../../../components/Table"
import AddServiceGroupModal from "../../../components/Modals/AddServiceGroupModal"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { FilterMatchMode } from "primereact/api"
import { InputText } from "primereact/inputtext"
import "primeicons/primeicons.css"
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.css"
import { main_api } from "../../../api/axios_helper"
import { Toast } from "primereact/toast"

const columns = [
  { field: "service_name", header: "Services" },
  { field: "cost", header: "Cost" },
  { field: "default_staff_rate", header: "Staff Rate" },
  { field: "taxable", header: "Taxable" },
  { field: "service_group", header: "" }
]

function Service() {
  const [modalShow, setModalShow] = useState(false)
  const [serviceData, setServiceData] = useState([])
  const [disabledServiceData, setDisabledServiceData] = useState([])
  const toast = useRef(null)

  const navigate = useNavigate()

  const onRowReorder = e => {
    setServiceData([...e.value])
    e.value.map((item, index) => {
      const id = item.id
      const formData = new FormData()
      formData.append("order_by", index)
      main_api.put("/api/v1/services/" + id + "/", formData)
    })
    toast.current.show({
      severity: "success",
      summary: "Row reordered",
      life: 3000
    })
  }

  const [expandedRows, setExpandedRows] = useState([])
  const [globalFilterValue2, setGlobalFilterValue2] = useState("")
  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS }
  })

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

  const addService = () => {
    navigate("/company/services/add-service")
  }

  const editTemplate = data => {
    return (
      <EditButton
        onClick={() => navigate("/company/services/add-service/" + data.id)}
      >
        <EditIcon src={EditImg} alt="edot-icon" />
        Edit
      </EditButton>
    )
  }

  const getServices = async () => {
    const { data } = await main_api.get("/api/v1/services/")
    setServiceData([
      ...data
        .filter(item => item.service_group)
        .sort((a, b) => a.order_by - b.order_by)
    ])
    setDisabledServiceData([...data.filter(item => !item.service_group)])
  }

  useEffect(() => {
    getServices()
  }, [])

  return (
    <>
      <Toast ref={toast} />
      <ActionButtons>
        <IconButton
          background="#E9BD5A"
          color={"#fff"}
          text="New Service"
          icon={CreateIcon}
          margin="0 20px 0 0"
          onClick={addService}
        />
        <IconPopupButton onClick={() => setModalShow(true)}>
          <IconPopupButtonLeftPanel>
            <Icon>{CreateIcon}</Icon>
            Add Group
          </IconPopupButtonLeftPanel>
          <IconPopupButtonRightPanel>
            <ArrowIcon src={ArrowDownIcon} alt="arrow-down-icon" />
          </IconPopupButtonRightPanel>
        </IconPopupButton>
      </ActionButtons>
      <div>
        <TableContainer>
          <DataTable
            style={{ border: "none" }}
            tableStyle={{ border: "none" }}
            value={serviceData}
            header={header1}
            filters={filters2}
            globalFilterFields={[
              "service_name",
              "cost",
              "default_staff_rate",
              "taxable"
            ]}
            emptyMessage="No customers found."
            reorderableRows
            onRowReorder={onRowReorder}
            responsiveLayout="scroll"
            rowGroupMode="subheader"
            groupRowsBy="service_group"
            sortMode="single"
            sortField="service_group"
            editMode="row"
            sortOrder={1}
            expandedRows={expandedRows}
            onRowToggle={e => setExpandedRows(e.data)}
            rowGroupHeaderTemplate={headerTemplate}
          >
            <Column
              rowReorder
              style={{ width: "3em" }}
              headerStyle={{ background: "none" }}
            />
            {dynamicColumns}
            <Column field="edit" header="" body={editTemplate} />
          </DataTable>
        </TableContainer>
        <DisableTitle>Disabled Holidays</DisableTitle>
        <DisabledTableContainer>
          <DataTable
            style={{ border: "none" }}
            tableStyle={{ border: "none" }}
            value={disabledServiceData}
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
            groupRowsBy="service_group"
            sortMode="single"
            sortField="service_group"
            editMode="row"
            sortOrder={1}
            expandedRows={expandedRows}
            onRowToggle={e => setExpandedRows(e.data)}
            rowGroupHeaderTemplate={headerTemplate}
          >
            {dynamicColumns}
            <Column field="edit" header="" body={editTemplate} />
          </DataTable>
        </DisabledTableContainer>
      </div>
      <AddServiceGroupModal
        show={modalShow}
        data={[...serviceData, ...disabledServiceData]}
        getServices={getServices}
        handleClose={() => setModalShow(false)}
      />
    </>
  )
}

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
const ActionButtons = styled.div`
  display: flex;
  margin-bottom: 27px;
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
    border: 1px solid #dee2e6;
    /* border-width: 0 0 1px 0; */
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
const DisabledTableContainer = styled.div`
  border: none;

  .p-datatable-wrapper {
    overflow: hidden;
  }

  .p-datatable-header {
    border: none;
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
      border: 0 !important;
    }

    tr {
      &.p-row-odd {
        background: #fafafa;
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
const DisableTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #414d55;
  margin-top: 40px;
  margin-bottom: 20px;
`
const ArrowIcon = styled.img`
  width: 11px;
  height: 7.5px;
`

const IconPopupButton = styled.button`
  width: 184px;
  height: 44px;
  background: #357a88;
  border-radius: 4px;
  padding: 0;
  outline: 0;
  border: 0;
  display: flex;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
`
const IconPopupButtonLeftPanel = styled.div`
  min-width: 142px;
  width: 142px;
  height: 100%;
  padding: 14px 0 14px 16px;
  border-right: 1px solid #fff;
  display: flex;
  align-items: center;
`
const IconPopupButtonRightPanel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
`

const Icon = styled.svg`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`

export default Service
