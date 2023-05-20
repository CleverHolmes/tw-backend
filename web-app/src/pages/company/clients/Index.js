import React, { useEffect, useState } from "react"
import { CSVLink } from "react-csv"
import { useNavigate, useSearchParams } from "react-router-dom"
import styled from "styled-components"
import { main_api } from "../../../api/axios_helper"
import CreateIcon from "../../../assets/icons/CreateIcon"
import ExportIcon from "../../../assets/icons/ExportIcon"
import IconButton from "../../../components/IconButton"
import Table from "../../../components/Table"

function Clients() {
  const [searchParams] = useSearchParams()
  const [isLoading, setIsloading] = useState(false)
  const [is_viewing, setIsViewing] = useState(null)
  const navigator = useNavigate()

  const [count, setCount] = useState(0)
  const [next, setNext] = useState(null)
  const [previous, setPrevious] = useState(null)

  const [list, setList] = useState([])

  const GetVet = () => {
    setIsloading(true)
    main_api
      .get("/api/v1/client/")
      .then(({ data }) => {
        // setCount(data?.count)
        // setNext(data?.next)
        // setPrevious(data?.previous)

        setList(data)
        setIsloading(false)
      })
      .catch(error => {
        console.log(error?.response?.data)
        setIsloading(false)
      })
  }

  useEffect(() => {
    GetVet()
  }, [])

  useEffect(() => {
    if (searchParams.get("id")) {
      setIsViewing(searchParams.get("id"))
    } else {
      setIsViewing(null)
    }
  }, [searchParams])

  return (
    <>
      <ActionButtons>
        <IconButton
          background="#E9BD5A"
          color={"#fff"}
          text="New Client"
          icon={CreateIcon}
          onClick={() => navigator("new-client")}
        />

        <CSVLink
          data={list}
          filename={"client-list.csv"}
          style={{ textDecoration: "none" }}
          target="_blank"
        >
          <IconButton
            fill="#fff"
            border="1px solid #D0D5DD"
            margin="0 20px"
            text="Export"
            icon={ExportIcon}
          />
        </CSVLink>
      </ActionButtons>
      <Table
        headers={[
          {
            title: "Full Name",
            id: "full_name",
            clickable: true,
            to: data => {
              navigator(`client-details/${data?.id}`)
            }
          },
          { title: "Email", id: "email", clickable: true },
          { title: "Phone", id: "phone_number" },
          { title: "Pets", id: "pets" },
          { title: "Address", id: "address_1" }
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

export default Clients
