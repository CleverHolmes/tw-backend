import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import BackImg from "../../../../assets/images/back_icon.svg"
import "primeicons/primeicons.css"
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.css"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { main_api } from "../../../../api/axios_helper"
import { useNavigate } from "react-router-dom"
import { Toast } from "primereact/toast"

const columns = [
  { field: "package_name", header: "Services" },
  { field: "package_", header: "Cost" },
  { field: "package_type", header: "Staff Rate" }
]

const RenewReport = ({ setActiveTabItem }) => {
  const [isCreate, setIsCreate] = useState(false)
  const [packages, setPackages] = useState([])
  const navigate = useNavigate()
  const toast = useRef(null)

  const dynamicColumns = columns.map((col, i) => {
    return (
      <Column
        key={col.field}
        columnKey={col.field}
        field={col.field}
        header={col.header}
        headerStyle={{ background: "none" }}
      />
    )
  })
  const onRowReorder = e => {
    setPackages(e.value)
    e.value.map((item, index) => {
      const id = item.id
      const formData = new FormData()
      formData.append("order_by", index)
      main_api.put("/api/v1/packages/" + id + "/", formData)
    })
    toast.current.show({
      severity: "success",
      summary: "Row reordered",
      life: 3000
    })
  }

  const getPackages = async () => {
    const { data } = await main_api.get("/api/v1/packages/")
    setPackages([...data.sort((a, b) => a.order_by - b.order_by)])
  }

  const backPackage = () => {
    setActiveTabItem(1)
  }
  useEffect(() => {
    getPackages()
  }, [])

  return (
    <>
      <Toast ref={toast} />
      <DescriptionText>
        Re-Arrange your package order by dragging and dropping on the left side
        of each service. The order seen here is the order as displayed to your
        clients.
      </DescriptionText>
      <BackButton onClick={backPackage}>
        <BackIcon src={BackImg} alt="back-icon" />
        Back
      </BackButton>

      <TableContainer>
        <DataTable
          style={{ border: "none" }}
          tableStyle={{ border: "none" }}
          value={packages}
          emptyMessage="No customers found."
          reorderableRows
          onRowReorder={onRowReorder}
          responsiveLayout="scroll"
        >
          <Column rowReorder style={{ width: "3em" }} />
          {dynamicColumns}
        </DataTable>
      </TableContainer>
    </>
  )
}

const DescriptionText = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(110, 110, 110, 0.3);
  width: 1068px;
  border-radius: 8px;
  padding: 12px 23px;
  font-size: 12px;
  letter-spacing: 1.21205px;
  margin-bottom: 40px;
`

const BackButton = styled.button`
  width: 77px;
  height: 28px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #cad3dc;
  box-shadow: inset 0px -3px 0px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  font-size: 12px;
  font-weight: 400;
  border: 0;
  outline: 0;
`

const BackIcon = styled.img`
  width: 12px;
  height: 14px;
  margin-right: 10px;
`

const TableContainer = styled.div`
  border: "none";
  box-shadow: 0px 2px 8px rgba(110, 110, 110, 0.3);
  border-radius: 3px;
  padding: 0 6px;

  .p-datatable-wrapper {
    overflow: hidden;
  }

  .p-datatable-thead {
    display: none;
  }

  tr {
    &:not(:last-child) {
      border-bottom: 1px solid #dee2e6;
    }

    td {
      text-transform: capitalize;
      padding: 9px !important;
    }
  }
`
export default RenewReport
