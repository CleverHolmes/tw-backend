import React, { useEffect, useRef, useState } from "react";
import IconButton from "../../../components/IconButton";
import CreateIcon from "../../../assets/icons/CreateIcon";
import { CSVLink } from "react-csv";
import ExportIcon from "../../../assets/icons/ExportIcon";
import styled from "styled-components";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import EditImg from "../../../assets/images/edit_icon.svg";
import AddNewStaffModal from "../../../components/Modals/AddNewStaffModal";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Toast } from "primereact/toast";
import { main_api } from "../../../api/axios_helper";

const Staff = () => {
  const [list, setList] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [originStaffData, setOriginStaffData] = useState([]);
  const [newStaffModal, setNewStaffModal] = useState(false);
  const [globalFilterValue2, setGlobalFilterValue2] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const toast = useRef(null);
  const navigate = useNavigate();

  const renderHeader1 = () => {
    let arr = originStaffData.map((item) => item.primary_location);
    arr = ["All", ...arr];
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
        <CustomSelect
          aria-label="Primary Location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          {arr
            .filter((item, index) => arr.indexOf(item) === index)
            .map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
        </CustomSelect>
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

  const nameTemplate = (data) => {
    return (
      <NameTemplate>
        {data.avatar ? (
          <StaffAvatar src={data.avatar} alt="staff-avatar" />
        ) : (
          <StaffTextAvatar>{data.staff_name[0]}</StaffTextAvatar>
        )}
        <StaffNameText>
          <TableButton
            className="text-capitalize"
            onClick={() => navigate("/company/staff/" + data.id)}
          >
            {data.staff_name}
          </TableButton>
          <StaffRole>{data.staff_role}</StaffRole>
        </StaffNameText>
        <StaffFlag>Flag</StaffFlag>
      </NameTemplate>
    );
  };

  const phoneTemplate = (data) => {
    return <p>{data.phone_number}</p>;
  };

  const emailTemplate = (data) => {
    return <TableButton>{data.email}</TableButton>;
  };

  const addressTemplate = (data) => {
    return (
      <>
        <p>
          {data.primary_location?.split(".")[0] +
            "." +
            data.primary_location?.split(".")[1].split(",")[0] +
            ","}
        </p>
        <p>{data.primary_location?.split(".")[1].split(",")[1]}</p>
      </>
    );
  };

  const editTemplate = (data) => {
    return (
      <EditButton onClick={() => navigate("/company/staff/" + data.id)}>
        <EditIcon src={EditImg} alt="edit-icon" />
      </EditButton>
    );
  };

  const getStaff = async () => {
    const res = await main_api.get("/api/v1/staff-list/");
    if (res.data) {
      setStaffData([...res.data]);
      setOriginStaffData([...res.data]);
    }
  };

  useEffect(() => {
    if (locationFilter === "All") {
      setStaffData([...originStaffData]);
    } else {
      setStaffData([
        ...originStaffData.filter((item) =>
          item.primary_location?.includes(locationFilter)
        ),
      ]);
    }
  }, [locationFilter]);

  useEffect(() => {
    getStaff();
  }, []);

  return (
    <PageContainer>
      <ActionButtons>
        <ActionLeftButtons>
          <IconButton
            background="#E9BD5A"
            color={"#fff"}
            text="New Staff"
            icon={CreateIcon}
            onClick={() => setNewStaffModal(true)}
          />

          <CSVLink
            data={staffData}
            filename={"client-list.csv"}
            style={{ textDecoration: "none" }}
            target="_blank"
          >
            <IconButton
              fill="#fff"
              border="1px solid #D0D5DD"
              margin="0 20px"
              text="Export Staff Data"
              icon={ExportIcon}
            />
          </CSVLink>
        </ActionLeftButtons>
        <InactiveButton>View Inactive Staff</InactiveButton>
      </ActionButtons>

      <TableContainer>
        <DataTable
          style={{ border: "none" }}
          tableStyle={{ border: "none" }}
          value={staffData}
          header={header1}
          filters={filters2}
          globalFilterFields={[
            "staff_name",
            "staff_role",
            "phone_number",
            "email",
            "primary_location",
          ]}
          emptyMessage="No staff found."
          responsiveLayout="scroll"
          sortMode="single"
          sortField="staff_name"
          editMode="row"
          sortOrder={1}
        >
          <Column
            header="Name"
            field="staff_name"
            body={nameTemplate}
            sortable
          />
          <Column
            header="Phone"
            field="phone_number"
            body={phoneTemplate}
            sortable
          />
          <Column header="Email" field="email" body={emailTemplate} sortable />
          <Column
            header="Primary Location"
            field="primary_location"
            body={addressTemplate}
            sortable
          />
          <Column field="edit" header="" body={editTemplate} />
        </DataTable>
      </TableContainer>
      <AddNewStaffModal
        show={newStaffModal}
        handleClose={() => setNewStaffModal(false)}
        toast={toast}
        getData={getStaff}
      />
      <Toast ref={toast} />
    </PageContainer>
  );
};

const PageContainer = styled.div``;
const ActionButtons = styled.div`
  display: flex;
  margin-bottom: 27px;
  align-items: end;
  justify-content: space-between;
`;
const ActionLeftButtons = styled.div`
  display: flex;
`;
const InactiveButton = styled.button`
  border: 0;
  outline: 0;
  height: 30px;
  padding: 6px 14px;
  background: #ff4545;
  border-radius: 2px;
  font-size: 12px;
  font-weight: 400;
  color: #fff;
`;
const TableContainer = styled.div`
  border: none;

  .p-datatable-wrapper {
    overflow: hidden;
  }

  .p-datatable-header {
    border: none;

    .p-input-icon-left {
      input {
        padding: 7px 15px 7px 35px;
        border: 1px solid #e7eaee;
        border-radius: 4px;
        width: 425px;
        box-shadow: none !important;
      }
    }
  }

  .p-column-header-content {
    justify-content: space-between;

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
        content: "\\e930";
      }
    }
  }

  thead {
    tr {
      border: none !important;

      th {
        background: #fff !important;
        font-size: 14px;
        font-weight: 600;
        padding: 16px 20px !important;

        &:first-child {
          padding-left: 43px !important;
        }
      }
    }
  }

  .p-datatable-tbody {
    tr {
      td {
        padding: 7px 20px !important;
        font-size: 12px;
        font-weight: 400;
        color: #000;
        border: 0;

        p {
          margin-bottom: 0;
        }

        &:first-child {
          padding-left: 43px !important;
        }

        &:last-child {
          padding-right: 43px !important;
        }
      }

      &.p-row-odd {
        background: #fafafa;
      }
    }
  }
`;
const CustomSelect = styled(Form.Select)`
  width: 176px;
  height: 40px;
  padding: 7px 15px;
  font-size: 16px;
  color: #8b8698;
  font-weight: 600;
  border: 0;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: none !important;
`;
const EditButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  color: #0496ff;
  background-color: transparent;
  border: 0;
  outline: 0;
`;
const EditIcon = styled.img`
  width: 11px;
  height: 13px;
  margin-right: 8px;
  padding-top: 2px;
`;
const NameTemplate = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 250px;
  min-width: 210px;
`;
const StaffAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: contain;
`;
const StaffTextAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  background-color: #176177;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
`;
const StaffNameText = styled.div`
  margin-right: 10px;
  flex: 1;

  button {
    text-align: start;
    margin-bottom: 5px;
  }
`;
const StaffRole = styled.p`
  text-transform: capitalize;
  margin: 0;
`;
const TableButton = styled.button`
  border: 0;
  outline: 0;
  padding: 0;
  margin: 0;
  color: #0496ff;
  background: transparent;
`;
const StaffFlag = styled.span`
  width: 57px;
  height: 19px;
  background: rgba(4, 150, 255, 0.21);
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0496ff;
`;
export default Staff;
