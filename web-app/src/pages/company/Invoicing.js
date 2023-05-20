import React, { useEffect, useState } from "react"
import styled from "styled-components"
import CustomInput from "../../components/CustomInput"
import CheckIcon from '../../assets/images/check_icon.svg'
import { main_api } from "../../api/axios_helper";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import EditImg from "../../assets/images/edit_icon.svg";
import CalendarImg from "../../assets/images/edit_icon.svg";

function Invoicing() {
  const [invoices, setInvoices] = useState([])
  const [invoiceData, setInvoiceData] = useState([])
  const [invoiceDate, setInvoiceDate] = useState({ value: 1, label: "All Time" })
  const [globalFilterValue2, setGlobalFilterValue2] = useState("")
  const [selectInvoice, setSelectInvoice] = useState({ value: 1, label: "All Invoices" })
  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  })

  const getInvoice = async () => {
    const { data } = await main_api.get("/api/v1/invoice/")
    setInvoices(data)
    setInvoiceData(data)
  }


  const renderHeader1 = () => {
    return (<div className="d-flex justify-content-between align-items-center">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={globalFilterValue2}
          onChange={onGlobalFilterChange2}
          placeholder="Search...."
        />
      </span>
      <div>
        <CustomInput
          type="select"
          options={[{ value: 1, label: "All Invoices" }, { value: 2, label: "Open" }, {
            value: 3,
            label: "Paid"
          }, { value: 4, label: "Past Due" }, { value: 5, label: "Void" }]}
          value={selectInvoice}
          vertical={false}
          onChange={setSelectInvoice}
          border={"1px solid #E4EAF0"}
          height="40px"
          selectWidth="230px"
        />
      </div>
    </div>)
  }

  const onGlobalFilterChange2 = e => {
    const value = e.target.value
    let _filters2 = { ...filters2 }
    _filters2["global"].value = value

    setFilters2(_filters2)
    setGlobalFilterValue2(value)
  }

  const header1 = renderHeader1()

  const invoiceTemplate = data => {
    return (<EditButton onClick={() => console.log(data)}>
      {data.invoice_id}
      <EditIcon src={CalendarImg} alt="edit-icon" />
      Edit
    </EditButton>)
  }

  const clientTemplate = data => {
    return (<EditButton onClick={() => console.log(data)}>
      {data.client}
    </EditButton>)
  }
  const statusTemplate = data => {
    return (<StatusCard text={data.status}>
      {data.status === 'paid' && <PaidIcon src={CheckIcon} alt="paid-icon" />}
      {data.status}
    </StatusCard>)
  }

  const editTemplate = data => {
    return (<EditButton onClick={() => console.log(data)}>
      <EditIcon src={EditImg} alt="edit-icon" />
      Edit
    </EditButton>)
  }


  useEffect(() => {
    if (invoiceDate.label === "All Time") {
      setInvoices([...invoiceData])
    } else {
      setInvoices([...invoiceData.filter(filterItem => filterItem.date.includes(invoiceDate.label))])
    }
  }, [invoiceDate])

  useEffect(() => {
    if (selectInvoice.label === "All Invoices") {
      setInvoices([...invoiceData])
    } else {
      setInvoices([...invoiceData.filter(item => item.status.includes(selectInvoice.label.toLowerCase()))])
    }

  }, [selectInvoice])

  useEffect(() => {
    getInvoice()
  }, [])

  return (<>
    <TopContainer>
      <TotalInvoiceContainer>
        <CustomInput
          type="select"
          options={[{ value: 1, label: "All Time" }, { value: 2, label: "2022" }, { value: 3, label: "2021" },]}
          value={invoiceDate}
          onChange={setInvoiceDate}
          vertical={false}
          label="Total Invoices:"
          border={"1px solid #E4EAF0"}
          height="40px"
          selectWidth="230px"
        />
      </TotalInvoiceContainer>
      <StatusPanel>
        <StatusItem>
          <Status status="unpaid">
            $1,200.00
          </Status>
          Unpaid
        </StatusItem>
        <StatusItem>
          <Status status="paid">
            $200.00
          </Status>
          Paid
        </StatusItem>
        <StatusItem>
          <Status status="pastDue">
            $3,000.00
          </Status>
          Past Due
        </StatusItem>
      </StatusPanel>
    </TopContainer>
    <TableContainer>
      <DataTable
        style={{ border: "none" }}
        tableStyle={{ border: "none" }}
        value={invoices}
        header={header1}
        filters={filters2}
        globalFilterFields={["invoice_id", "due_date", "date", "client", "amount", "balance", "status"]}
        emptyMessage="No customers found."
        responsiveLayout="scroll"
        sortMode="single"
        sortField="service_group"
        editMode="row"
        sortOrder={1}
      >
        <Column field="invoice_id" header="Invoice #" body={invoiceTemplate} sortable />
        <Column field="due_date" header="Due Date" sortable />
        <Column field="date" header="Date" sortable />
        <Column field="client" header="Client" body={clientTemplate} sortable />
        <Column field="amount" header="Amount" sortable />
        <Column field="balance" header="Balance" sortable />
        <Column field="status" header="Status" body={statusTemplate} sortable />
        <Column field="edit" header="Actions" body={editTemplate} />
      </DataTable>
    </TableContainer>
  </>)
}

const StatusCard = styled.span`
  height: 20px;
  min-width: 64px;
  background: ${props => (props.text === "paid" ? "#34D1BF" : props.text === "past due" ? "#FF4545" : "#D8D8D8")};
  border-radius: 4px;
  padding: 0 9px;
  height: 20px;
  font-weight: 700;
  font-size: 10px;
  text-align: center;
  line-height: 20px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`

const TopContainer = styled.div`
  display: flex;
  padding: 12px;
`
const TotalInvoiceContainer = styled.div`
  display: flex;
  align-items: center;
`

const StatusPanel = styled.div`
  display: flex;
  margin-left: 40px;
  padding-top: 20px;
`
const StatusItem = styled.div`
  text-align: center;
  font-size: 12px;
  font-weight: 600;

  &:not(:last-child) {
    margin-right: 17px;
  }
`
const Status = styled.div`
  width: 71px;
  height: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  margin-bottom: 5px;
  background-color: ${props => props.status === 'unpaid' ? '#FF4545' : props.status === 'paid' ? '#34D1BF' : '#FB8500'};
`
const PaidIcon = styled.img`
  width: 10px;
  height: 10px;
  margin-right: 8px;
`
const GroupHeader = styled.span`
  color: #414D55;
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
    padding: 12px;
    font-weight: 400;

    .p-input-icon-left {
      input {
        padding: 10px 10px 10px 32px;
        height: 40px;
        font-size: 15px;
      }
    }
  }

  .pi-sort-alt {
    &:before {
      content: "\\e930";
    }
  }
  .pi-sort-amount-up-alt {
    &:before {
      content: "\\e933";
    }
  }
  .pi-sort-amount-down {
    &:before {
      content: "\\e930"
    }
  }
  }

  tr {
    /* border: 1px solid; */
    /* border-width: 0 0 1px 0; */

    &.p-row-odd {
      background-color: #FAFAFA
    }
  }

  thead {
    tr {
      border: none !important;

      th {
        font-size: 12px;
        font-weight: 400;
        color: #000;
        background: #fff !important;
      }
    }
  }

  .p-datatable-tbody {
    td {
      padding: 15px 25px !important;
      font-size: 12px;
      font-weight: 400;
      color: #000;
    }

    tr {
      td {
        border: 0;
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
  margin-left: 8px;
  padding-top: 2px;
`
export default Invoicing
