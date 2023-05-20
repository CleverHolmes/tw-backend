import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { PageContainer, TableButton, TableContainer } from "./Keys.styled";
import moment from "moment";
import IconButton from "../../../../components/IconButton";
import CreateIcon from "../../../../assets/icons/CreateIcon";
import AddKeyModal from "../../../../components/Modals/AddKeyModal";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Keys = ({ id, data, clientList, serviceList, toast, getData }) => {
  const [keyData, setKeyData] = useState(data);
  const [globalFilterValue2, setGlobalFilterValue2] = useState("");
  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [addKeyModal, setAddKeyModal] = useState(false);
  const navigate = useNavigate();

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
          text="Add New Key"
          icon={CreateIcon}
          onClick={() => setAddKeyModal(true)}
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

  const KeyTemplate = (data) => {
    return <p>{data.keys}</p>;
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

  const possessionTemplate = (data) => {
    return (
      <p>{moment(data.took_posession).format("MMM DD, YYYY, hh:mm:ss A")}</p>
    );
  };

  const serviceTemplate = (data) => (
    <p>{serviceList.find((item) => item.id === data.service)?.service_name}</p>
  );

  useEffect(() => {
    setKeyData(data);
  }, [data]);

  return (
    <PageContainer>
      <TableContainer>
        <DataTable
          style={{ border: "none" }}
          tableStyle={{ border: "none" }}
          value={keyData}
          header={header1}
          filters={filters2}
          globalFilterFields={["client", "key", "took_posession", "service"]}
          emptyMessage="No staff found."
          responsiveLayout="scroll"
          sortMode="single"
          sortField="id"
          editMode="row"
          sortOrder={1}
        >
          <Column
            header="Client"
            field="client"
            body={clientTemplate}
            sortable
          />
          <Column header="Key" field="keys" body={KeyTemplate} sortable />
          <Column
            header="Took Possession"
            field="took_posession"
            body={possessionTemplate}
            sortable
          />
          <Column
            header="Service"
            field="service"
            body={serviceTemplate}
            sortable
          />
        </DataTable>
      </TableContainer>
      <AddKeyModal
        show={addKeyModal}
        handleClose={() => setAddKeyModal(false)}
        clientList={clientList}
        serviceList={serviceList}
        toast={toast}
        id={id}
        getData={getData}
      />
    </PageContainer>
  );
};

export default Keys;
