import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { main_api } from "../../../../api/axios_helper"
import CreateIcon from "../../../../assets/icons/CreateIcon"
import ExportIcon from "../../../../assets/icons/ExportIcon"
import CustomInput from "../../../../components/CustomInput"
import IconButton from "../../../../components/IconButton"
import Table from "../../../../components/Table"

function Services() {
  const [activeTab, setActiveTab] = useState("invoices")

  const [isLoading, setIsloading] = useState(false)

  const [list, setList] = useState([])

  const [invoices, setInvoices] = useState([
    {
      id: "00012",
      due_date: "Jul 10, 2022",
      date: "Jul 10, 2022",
      amount: "$500.00",
      balance: "$500.00",
      status: "paid"
    },
    {
      id: "00012",
      due_date: "Jul 10, 2022",
      date: "Jul 10, 2022",
      amount: "$500.00",
      balance: "$500.00",
      status: "past due"
    },
    {
      id: "00012",
      due_date: "Jul 10, 2022",
      date: "Jul 10, 2022",
      amount: "$500.00",
      balance: "$500.00",
      status: "draft"
    }
  ])

  const [services, setServices] = useState([
    {
      date: "Mon Jul 11th, 2022 12:00 PM",
      service: "Pet Sitting",
      invoice_id: "815856",
      staff_member: "Staff Name",
      status: "Completed"
    },
    {
      date: "Mon Jul 11th, 2022 12:00 PM",
      service: "Pet Sitting",
      invoice_id: "815856",
      staff_member: "Staff Name",
      status: "Scheduled"
    }
  ])

  const [templates, setTemplates] = useState([
    {
      template: "Template Test",
      latest_approval: "None",
      upcoming: "Jul 10, 2022 - Sep 10 2022",
      approval_on: "Jul 10, 2022",
      status: "Will Auto-Approve"
    }
  ])

  const [packages, setPackages] = useState([
    {
      packages: "Holiday Package",
      redeemed: "None",
      invoice: "Jul 10, 2022 - Sep 10 2022",
      status: "Details"
    }
  ])

  const GetPets = () => {
    setIsloading(true)
    main_api
      .get("/api/v1/client_pet/")
      .then(({ data }) => {
        setList(data)
        setIsloading(false)
      })
      .catch(error => {
        console.log(error?.response?.data)
        setIsloading(false)
      })
  }

  useEffect(() => {
    // GetPets()
  }, [])

  return (
    <>
      <ActionButtons>
        <TabContainer>
          <TabButton
            onClick={() => setActiveTab("invoices")}
            active={activeTab === "invoices"}
          >
            Invoices
          </TabButton>
          <TabButton
            onClick={() => setActiveTab("services")}
            active={activeTab === "services"}
            marginLeft="30px"
          >
            Services
          </TabButton>
          <TabButton
            onClick={() => setActiveTab("templates")}
            active={activeTab === "templates"}
            marginLeft="30px"
          >
            Templates
          </TabButton>
          <TabButton
            onClick={() => setActiveTab("packages")}
            active={activeTab === "packages"}
            marginLeft="30px"
          >
            Packages
          </TabButton>
        </TabContainer>
      </ActionButtons>
      {activeTab === "invoices" && (
        <Table
          headers={[
            { title: "Invoice #", id: "id", clickable: true },
            { title: "Due Date", id: "due_date" },
            { title: "Date", id: "date" },
            { title: "Amount", id: "amount" },
            { title: "Balance", id: "balance" },
            {
              title: "Status",
              id: "status",
              card: d => <StatusCard text={d} />
            }
          ]}
          data={invoices}
        />
      )}
      {activeTab === "services" && (
        <Table
          headers={[
            { title: "Date", id: "date" },
            { title: "Service", id: "service", clickable: true },
            { title: "Invoice ID", id: "invoice_id", clickable: true },
            { title: "Staff Member", id: "staff_member", clickable: true },
            {
              title: "Status",
              id: "status",
              card: d => <ServiceStatusCard text={d} />
            }
          ]}
          data={services}
        />
      )}
      {activeTab === "templates" && (
        <Table
          headers={[
            { title: "Template", id: "template", clickable: true },
            {
              title: "Latest Approval",
              id: "latest_approval"
            },
            { title: "Upcoming", id: "upcoming" },
            { title: "Approval On", id: "approval_on" },
            {
              title: "Status",
              id: "status",
              card: d => <ServiceStatusCard text={d} />
            }
          ]}
          data={templates}
        />
      )}
      {activeTab === "packages" && (
        <>
          <ActionButton>
            <IconButton
              background="#E9BD5A"
              color={"#fff"}
              text="Add Package For Client"
              icon={CreateIcon}
              // onClick={() => setIsCreate(true)}
            />
          </ActionButton>
          <Table
            noSearch
            headers={[
              { title: "Packages", id: "packages", clickable: true },
              {
                title: "% Redeemed",
                id: "redeemed"
              },
              { title: "Invoice", id: "invoice" },
              {
                title: "",
                id: "status",
                card: d => <ServiceStatusCard text={d} />
              }
            ]}
            data={packages}
          />
        </>
      )}
    </>
  )
}
const ActionButtons = styled.div`
  display: flex;
  margin-bottom: 27px;
`

const TabContainer = styled.div`
  padding: 10px 16px;
  height: 54px;
  box-sizing: border-box;
  background: #fcfcfc;
  box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  display: flex;
`
const TabButton = styled.button`
  background-color: ${props => (props.active ? "#FBF2DE" : "transparent")};
  padding: 9px 8px;
  height: 34px;
  border-radius: 4px;
  border: none;
  margin-left: ${props => props.marginLeft ?? "0"};
  cursor: pointer;

  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
  color: ${props => (props.active ? "#E9BD5A" : "#000")};

  &:hover {
    background-color: lightblue;
  }
`
const VaccinationTabContainer = styled.div`
  height: 24px;
  width: 274px;
  display: flex;
  box-sizing: border-box;
  background: #f2f6f9;
  border: 1px solid #d8e2e8;
  border-radius: 6px;
  margin-bottom: 20px;
  justify-content: space-between;
`

const VaccinationButton = styled.button`
  background-color: ${props => (props.active ? "#FFFFFF" : "transparent")};
  padding: 0 16px;
  height: 34px;
  cursor: pointer;
  // width: 123px;
  height: 24px;
  border: ${props => (props.active ? "1px solid #d8e2e8" : "none")};
  border-radius: 6px;

  font-weight: 400;
  font-size: 12px;
  line-height: 11px;
  color: ${props => (props.active ? "#1B2126" : "#9FA9B2")};

  &:hover {
    background-color: lightblue;
  }
`

const SelectContainer = styled.div``

const ActionButton = styled.div`
  display: flex;
`

const StatusCard = styled.span`
  height: 20px;
  background: ${props => (props.text == "draft" ? "#D8D8D8" : "#FF4545")};
  border-radius: 4px;
  padding: 0 9px;

  height: 20px;
  font-weight: 700;
  font-size: 10px;
  line-height: 20px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #ffffff;

  &:before {
    content: "${props => props.text}";
  }
`

const ServiceStatusCard = styled.span`
  height: 20px;
  background: ${props => (props.text == "Scheduled" ? "#354563" : "#FF4545")};
  border-radius: 4px;
  padding: 0 26px;

  height: 20px;
  font-weight: 700;
  font-size: 10px;
  line-height: 20px;
  letter-spacing: 0.5px;
  // text-transform: uppercase;
  color: #ffffff;

  &:before {
    content: "${props => props.text}";
  }
`

export default Services
