import React, { useState } from "react"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { FilterMatchMode } from "primereact/api"
import { InputText } from "primereact/inputtext"
import {
  PageContainer,
  TableButton,
  TableContainer,
  CustomSelect,
  CustomFilter
} from "./Rates.styled"
import moment from "moment"

const currentRateData = ["0 %", "0 $"]

const Rates = ({ data }) => {
  const [rateData, setRateData] = useState(data)
  const [locationFilter, setLocationFilter] = useState("All")
  const [globalFilterValue2, setGlobalFilterValue2] = useState("")
  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  })

  const onGlobalFilterChange2 = e => {
    const value = e.target.value
    let _filters2 = { ...filters2 }
    _filters2["global"].value = value

    setFilters2(_filters2)
    setGlobalFilterValue2(value)
  }

  const renderHeader1 = () => {
    let arr = ["Open"]
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
        <CustomFilter
          value={locationFilter}
          onChange={e => setLocationFilter(e.target.value)}
        >
          {arr
            .filter((item, index) => arr.indexOf(item) === index)
            .map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
        </CustomFilter>
      </div>
    )
  }

  const header1 = renderHeader1()

  const serviceTemplate = data => {
    return <p>{data.staff_service}</p>
  }
  const serviceCostTemplate = data => {
    return <p>{data.staff_service_cost}</p>
  }

  const currentRateTemplate = data => {
    return (
      <CustomSelect
        width="80px"
        margin="0 10px 0 5px"
        defaultValue={data.current_rate}
      >
        {currentRateData.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </CustomSelect>
    )
  }

  const staffRateTemplate = data => {
    return <p>{data.staff_default_rate}</p>
  }

  const currentStaffRateTemplate = data => {
    return (
      <CustomSelect
        width="80px"
        margin="0 10px 0 5px"
        defaultValue={data.staff_current_rate}
      >
        {currentRateData.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </CustomSelect>
    )
  }

  const expirationDate = data => {
    return (
      <CustomSelect
        width="110px"
        margin="0 10px 0 5px"
        defaultValue={moment(new Date()).format("DD.MM.YYYY")}
      >
        <option value={moment(new Date()).format("DD.MM.YYYY")}>
          {moment(new Date()).format("DD.MM.YYYY")}
        </option>
        {/* {currentRateData.map((item, index) => (
        ))} */}
      </CustomSelect>
    )
  }

  return (
    <PageContainer>
      <TableContainer>
        <DataTable
          style={{ border: "none" }}
          tableStyle={{ border: "none" }}
          header={header1}
          value={rateData}
          emptyMessage="No staff found."
          responsiveLayout="scroll"
          sortMode="single"
          sortField="service"
          editMode="row"
          sortOrder={1}
        >
          <Column header="Service" field="service" body={serviceTemplate} />
          <Column
            header="Service Default Cost"
            field="service_cost"
            body={serviceCostTemplate}
          />
          <Column
            header="Current Rate"
            field="current_rate"
            body={currentRateTemplate}
          />
          <Column
            header="Staff Default Rate"
            field="staff_rate"
            body={staffRateTemplate}
          />
          <Column
            header="Current Staff Rate"
            field="current_staff_rate"
            body={currentStaffRateTemplate}
          />
          <Column header="Expiration Date" body={expirationDate} />
        </DataTable>
      </TableContainer>
    </PageContainer>
  )
}

export default Rates
