import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { main_api } from "../../../../api/axios_helper"
import CustomInput from "../../../../components/CustomInput"
import Table from "../../../../components/Table"

function Rates() {
  const [isLoading, setIsloading] = useState(false)

  const [list, setList] = useState([
    {
      service: "Overnight Stay",
      default_cost: "$500.00",
      current_rate: "$0.00",
      default_rate: "$500.00",
      current_staff_rate: "$0.00",
      expiration_date: "Jul 10, 2022"
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
      <Table
        noSearch={true}
        headers={[
          {
            title: (
              <span
                style={{
                  fontWeight: "400",
                  fontSize: 12,
                  color: "#000"
                }}
              >
                Service
              </span>
            ),
            id: "service"
          },
          {
            title: (
              <span
                style={{
                  fontWeight: "400",
                  fontSize: 12,
                  color: "#000"
                }}
              >
                Service
                <br />
                Default Cost
              </span>
            ),
            id: "default_cost"
          },
          {
            title: (
              <span
                style={{
                  fontWeight: "400",
                  fontSize: 12,
                  color: "#000"
                }}
              >
                Current Rate
              </span>
            ),
            id: "current_rate",
            card: d => (
              <CustomInput
                margin={"0"}
                padding={"0 15px"}
                height="29px"
                width="117.02px"
                // value={d}
              />
            )
          },
          {
            title: (
              <span
                style={{
                  fontWeight: "400",
                  fontSize: 12,
                  color: "#000"
                }}
              >
                Staff <br /> Default Rate
              </span>
            ),
            id: "default_rate"
          },
          {
            title: (
              <span
                style={{
                  fontWeight: "400",
                  fontSize: 12,
                  color: "#000"
                }}
              >
                Current
                <br /> Staff Rate
              </span>
            ),
            id: "current_staff_rate",
            card: d => (
              <CustomInput
                margin={"0"}
                padding={"0 15px"}
                height="29px"
                width="117.02px"
                // value={d}
              />
            )
          },
          {
            title: (
              <span
                style={{
                  fontWeight: "400",
                  fontSize: 12,
                  color: "#000"
                }}
              >
                Expiration Date
              </span>
            ),
            id: "expiration_date",
            card: d => (
              <CustomInput
                margin={"0"}
                padding={"0 15px"}
                height="29px"
                width="117.02px"
                // value={d}
                type="date"
              />
            )
          }
        ]}
        data={list}
      />
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

const ActionButton = styled.button`
  background-color: #e9bd5a;
  padding: 6px 14px;
  height: 28px;
  border-radius: 4px;
  border: none;
  margin-left: ${props => props.marginLeft ?? "0"};
  cursor: pointer;
  align-self: center;

  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
  color: #ffffff;

  &:hover {
    background-color: lightblue;
  }
`

export default Rates
