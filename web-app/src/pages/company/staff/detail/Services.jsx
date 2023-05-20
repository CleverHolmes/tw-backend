import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import {
  PageContainer,
  TableButton,
  TableContainer,
  CalendarIcon,
  DateTemplate,
  DropdownButton,
} from "./Services.styled";
import Dropdown from "react-bootstrap/Dropdown";
import CalendarImg from "../../../../assets/images/calendar_icon.svg";
import moment from "moment";
import IconButton from "../../../../components/IconButton";
import CreateIcon from "../../../../assets/icons/CreateIcon";
import AddServiceModal from "../../../../components/Modals/AddServiceModal";
import { useEffect } from "react";
import { main_api } from "../../../../api/axios_helper";
import { useNavigate } from "react-router-dom";

const Services = ({ data, clientList, serviceList, id, getData, toast }) => {
  const [services, setServices] = useState(data);
  const [globalFilterValue2, setGlobalFilterValue2] = useState("");
  const [isAddServiceModal, setIsAddServiceModal] = useState(false);
  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const navigate = useNavigate();

  const updateStatus = (value, serviceId) => {
    const formData = new FormData();
    formData.append("status", value);
    formData.append("paid", true);
    main_api
      .put("/api/v1/staff-service/" + serviceId + "/", formData)
      .then(({ data }) => {
        getData();
        toast.current.show({
          severity: "success",
          summary: "Updated!",
          life: 3000,
        });
      })
      .catch((error) => {
        console.log(error?.response?.data);
        toast.current.show({
          severity: "error",
          summary: "Error",
          life: 3000,
        });
      });
  };

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
        <IconButton
          background="#E9BD5A"
          color={"#fff"}
          text="Add Service"
          icon={CreateIcon}
          onClick={() => setIsAddServiceModal(true)}
        />
      </div>
    );
  };

  const onGlobalFilterChange2 = (e) => {
    const value = e.target.value;
    let _filters2 = { ...filters2 };
    _filters2["global"].value = value;

    setFilters2(_filters2);
    setGlobalFilterValue2(value);
  };

  const header1 = renderHeader1();

  const dateTemplate = (data) => {
    return (
      <DateTemplate>
        <p>{moment(data.date).format("MMM DD, YYYY, hh:mm:ss A")}</p>
        <CalendarIcon src={CalendarImg} alt="calendar-icon" />
      </DateTemplate>
    );
  };

  const paidTemplate = (data) => {
    return <p>{data.paid ? "Yes" : "No"}</p>;
  };

  const serviceTemplate = (data) => {
    return (
      <TableButton
        onClick={() =>
          navigate("/company/services/add-service/" + data.service)
        }
      >
        {serviceList.find((item) => item.id === data.service)?.service_name}
      </TableButton>
    );
  };

  const clientTemplate = (data) => {
    return (
      <TableButton
        onClick={() =>
          navigate("/company/clients/client-details/" + data.client)
        }
      >
        {clientList.find((item) => item.id === data.client)?.full_name}
      </TableButton>
    );
  };

  const statusTemplate = (data) => {
    return (
      <DropdownButton bg={data.status === "completed" ? "#81D742" : "#E9BD5A"}>
        <Dropdown.Toggle id="dropdown-basic">{data.status}</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => updateStatus("completed", data.id)}>
            Completed
          </Dropdown.Item>
          <Dropdown.Item onClick={() => updateStatus("scheduled", data.id)}>
            Scheduled
          </Dropdown.Item>
        </Dropdown.Menu>
      </DropdownButton>
    );
  };

  useEffect(() => {
    setServices([...data]);
  }, [data]);

  return (
    <PageContainer>
      <TableContainer>
        <DataTable
          style={{ border: "none" }}
          tableStyle={{ border: "none" }}
          value={services}
          header={header1}
          filters={filters2}
          globalFilterFields={["service", "client", "status", "date", "paid"]}
          emptyMessage="No staff found."
          responsiveLayout="scroll"
          sortMode="single"
          sortField="date"
          editMode="row"
          sortOrder={1}
        >
          <Column header="Date" field="date" body={dateTemplate} />
          <Column header="Service" field="service" body={serviceTemplate} />
          <Column header="Client" field="client" body={clientTemplate} />
          <Column header="Paid?" field="paid" body={paidTemplate} />
          <Column header="Status" field="status" body={statusTemplate} />
        </DataTable>
      </TableContainer>
      <AddServiceModal
        show={isAddServiceModal}
        handleClose={() => setIsAddServiceModal(false)}
        clientList={clientList}
        serviceList={serviceList}
        toast={toast}
        id={id}
        getData={getData}
      />
    </PageContainer>
  );
};

export default Services;
