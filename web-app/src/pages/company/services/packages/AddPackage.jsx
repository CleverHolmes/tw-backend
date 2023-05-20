import React, { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import CustomInput from "../../../../components/CustomInput"
import BackImg from "../../../../assets/images/back_icon.svg"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { FilterMatchMode } from "primereact/api"
import { InputText } from "primereact/inputtext"
import IconButton from "../../../../components/IconButton"
import CreateIcon from "../../../../assets/icons/CreateIcon"
import { main_api } from "../../../../api/axios_helper"
import AddServiceToPackage from "../../../../components/Modals/AddServiceToPackage"

const packageTypeData = [
  {
    value: "set price",
    label: "Set Price: Specify The Total Cost Of The Package"
  }
]
const packageLimitData = [{ value: "no limits", label: "No Limits" }]

const packageData = [
  { service: "Pet Sitting", count: 1 },
  { service: "Overnight Stay", count: 2 },
  { service: "Walking", count: 1 }
]

const columns = [
  { field: "service_name", header: "Service" },
  { field: "cost", header: "Cost" }
]

function AddPackage() {
  const [packageType, setPackageType] = useState(packageTypeData[0])
  const [packageLimit, setPackageLimit] = useState(packageLimitData[0])
  const [services, setServices] = useState([])
  const [globalFilterValue2, setGlobalFilterValue2] = useState("")
  const [modalShow, setModalShow] = useState(false)
  const [serviceData, setServiceData] = useState([])
  const [selectedService, setSelectedService] = useState([])
  const [packageId, setPackageId] = useState()
  const [enabled, setEnabled] = useState(true)
  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS }
  })
  const navigate = useNavigate()
  const formRef = useRef()
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

  const removeConnectedService = id => {
    setSelectedService([...selectedService.filter(item => item !== id)])
  }

  const editTemplate = data => {
    return (
      <RomveButton
        type="button"
        onClick={() => removeConnectedService(data.id)}
      >
        x Remove Service
      </RomveButton>
    )
  }

  const backPackage = () => {
    navigate("/company/services/packages")
  }

  const addPackage = e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    formData.append("package_type", packageType.value)
    formData.append("package_limit", packageLimit.value)
    formData.append("connected_service", selectedService.join(","))
    if (packageId) {
      main_api.put("/api/v1/packages/" + packageId + "/", formData)
    } else {
      main_api.post("/api/v1/packages/", formData)
    }
    backPackage()
  }

  const getServices = async () => {
    const { data } = await main_api.get("/api/v1/services/")
    setServiceData([...data])
  }

  const getPackages = async id => {
    const { data } = await main_api.get("/api/v1/packages/" + id + "/")
    if (data) {
      if (data.disabled) {
        setEnabled(false)
      } else {
        setEnabled(true)
      }
      setPackageId(data.id)
      if (data.connected_service) {
        setSelectedService([...data.connected_service.split(",")])
      }
      const form = formRef.current
      form.package_name.value = data.package_name
      form.description.value = data.description
      form.taxable.checked = data.taxable
      form.selectable_client.checked = data.selectable_client
      if (data.package_type) {
        setPackageType(
          packageTypeData.find(item => item.value === data.package_type)
        )
      }
      if (data.package_limit) {
        setPackageLimit(
          packageLimitData.find(item => item.value === data.package_limit)
        )
      }
    }
  }

  const disablePackage = () => {
    if (packageId) {
      const formData = new FormData()
      if (enabled) {
        formData.append("disabled", true)
      } else {
        formData.append("disabled", false)
      }
      main_api.put("/api/v1/packages/" + packageId + "/", formData)
      backPackage()
    }
  }

  useEffect(() => {
    const id = +location.pathname.split("add-package/")[1]
    if (Number.isInteger(id)) {
      getPackages(id)
    }
    getServices()
  }, [location.pathname])

  useEffect(() => {
    if (selectedService) {
      setServices([
        ...selectedService.map(item =>
          serviceData.find(service => service.id === +item)
        )
      ])
    }
  }, [selectedService, serviceData])

  return (
    <>
      <ActionButtons>
        <Button onClick={backPackage}>
          <BackIcon src={BackImg} alt="back-icon" />
          Back
        </Button>
        <Button
          bg={enabled ? "#FF4545" : "#E9BD5A"}
          onClick={disablePackage}
          disabled={!packageId}
        >
          {enabled ? "Disable Package" : "Enable Package"}
        </Button>
      </ActionButtons>
      <AddServiceForm ref={formRef} onSubmit={addPackage}>
        <AddFormItem>
          <FormLabel>
            Package Name <RequiredMark>*</RequiredMark>
          </FormLabel>
          <FormInput>
            <CustomInput
              name="package_name"
              width="601px"
              height="34px"
              vertical={true}
              padding="10px 15px"
              border={"1px solid #CAD3DC"}
              required
            />
          </FormInput>
        </AddFormItem>
        <AddFormItem>
          <FormLabel>Package Type</FormLabel>
          <FormInput>
            <CustomInput
              type="select"
              options={packageTypeData}
              value={packageType}
              onChange={setPackageType}
              vertical={false}
              border={"1px solid #E4EAF0"}
              height="34px"
              selectHeight="34px"
              selectWidth="385px"
            />
          </FormInput>
        </AddFormItem>
        <AddFormItem>
          <FormLabel>Package Limits</FormLabel>
          <FormInput>
            <CustomInput
              type="select"
              options={packageLimitData}
              value={packageLimit}
              onChange={setPackageLimit}
              vertical={false}
              border={"1px solid #E4EAF0"}
              height="34px"
              selectHeight="34px"
              selectWidth="385px"
            />
          </FormInput>
        </AddFormItem>
        <AddFormItem>
          <FormLabel>Taxable?</FormLabel>
          <CheckboxLabel>
            <CheckBoxContainer>
              <CheckBox type="checkbox" name="taxable" />
            </CheckBoxContainer>
            Package is Taxable
          </CheckboxLabel>
        </AddFormItem>
        <AddFormItem>
          <FormLabel>Selected by Client?</FormLabel>
          <CheckboxLabel>
            <CheckBoxContainer>
              <CheckBox type="checkbox" name="selectable_client" />
            </CheckBoxContainer>
            Yes, Client Can Select this Package In Portal
          </CheckboxLabel>
        </AddFormItem>
        <AddFormItem align="start">
          <FormLabel>Description</FormLabel>
          <FormTextArea width="601px" name="description" />
        </AddFormItem>
        <AddFormItem>
          <FormLabel>Services Packagein ? *</FormLabel>
          <IconButton
            background="#E9BD5A"
            color={"#fff"}
            text="Add Service To Package"
            icon={CreateIcon}
            margin="0 20px 0 0"
            padding="6px 14px"
            onClick={() => setModalShow(true)}
          />
        </AddFormItem>
        <TableContainer>
          <DataTable
            style={{ border: "none" }}
            tableStyle={{ border: "none" }}
            value={services}
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
        <ActionButtons>
          <ActionButton type="submit">Save Change</ActionButton>
          <ActionButton type="button" bg="#CAD3DC">
            Cancel Changes
          </ActionButton>
        </ActionButtons>
      </AddServiceForm>
      <AddServiceToPackage
        show={modalShow}
        data={serviceData}
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        handleClose={() => setModalShow(false)}
      />
    </>
  )
}

const ActionButtons = styled.div`
  display: flex;
  margin-top: 30px;
  margin-bottom: 40px;
  justify-content: ${props => props.justify === "center" && "center"};

  &:not(:last-of-type) {
    margin-top: 77px;
  }
`
const ActionButton = styled.button`
  width: 106px;
  height: 28px;
  border-radius: 6px;
  color: #fff;
  border: 0;
  outline: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
  font-weight: 400;
  background: ${props => props.bg ?? "#e9bd5a"};

  &:first-child {
    margin-right: 11px;
  }
`
const Button = styled.button`
  height: 28px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.bg ?? "transparent"};
  color: ${props => props.bg && "#fff"};
  border: ${props => (props.bg ? "0" : "1px solid #000")};
  border-radius: 6px;
  font-size: 12px;
  font-weight: 400;
  outline: 0;
  &:disabled {
    background-color: #c8c8c8;
  }
  &:not(:last-child) {
    margin-right: 20px;
  }
`
const BackIcon = styled.img`
  width: 12px;
  height: 14px;
  margin-right: 10px;
`
const AddServiceForm = styled.form`
  padding: 32px;
  width: 901px;
  border: 1px solid #ccd6e6;
  box-shadow: 0px 2px 8px rgba(110, 110, 110, 0.3);
  border-radius: 8px;
`
const AddFormItem = styled.div`
  display: flex;
  align-items: ${props => props.align ?? "center"};
  margin-bottom: 15px;
`
const FormLabel = styled.label`
  width: 142px;
  min-width: 142px;
  text-align: end;
  font-size: 14px;
  font-weight: 400;
  color: #000;
  margin-right: 30px;
`
const RequiredMark = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #e9bd5a;
`
const FormInput = styled.div`
  font-size: 12px;
`
const CheckBoxContainer = styled.span`
  height: 12px;
  width: 12px;
  border-radius: 1px;
  border: 1px solid #a2c4d4;
  margin-right: 13px;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`
const CheckBox = styled.input`
  height: 8px;
  width: 8px;
  border-radius: 1px;
  appearance: none;
  margin: 0px;

  &:checked {
    background-color: #e9bd5a;
  }
`
const CheckboxLabel = styled.label`
  font-size: 12px;
  font-weight: 400;
`
const FormTextArea = styled.textarea`
  max-width: ${props => props.width ?? "500px"};
  width: 100%;
  height: 70px;
  border: 1px solid #cad3dc;
  border-radius: 5px;
  margin-bottom: 30px;
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
    }

    .p-rowgroup-header {
      border: none;

      td {
        padding: 10px 0 !important;
      }
    }
  }
`
const RomveButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  color: #000;
  background-color: transparent;
  border: 0;
  outline: 0;
`
export default AddPackage
