import React, {useEffect, useRef, useState} from "react"
import {useNavigate} from "react-router-dom"
import styled from "styled-components"
import SearchIcon from "../assets/icons/SearchIcon"
import ArrowDownIcon from "../assets/images/arrow-down_icon.svg"
import CalendarIcon from "../assets/images/calendar_icon.svg"
import EditIcon from "../assets/images/edit_icon.svg"
import CustomInput from "./CustomInput"

function Table({data, headers, noSearch, invoiceSelect}) {
  const [search, setSearch] = useState("")
  const [list, setList] = useState([])
  const [selectedInvoiceList, setSelectedInvoiceList] = useState(data)
  const [selectInvoice, setSelectInvoice] = useState({
    value: 1,
    label: "All Invoices"
  })
  const tableRef = useRef()

  useEffect(() => {
    setList(data)
    setSelectedInvoiceList(data)
  }, [data])

  const Filter = () => {
    setList(
      selectedInvoiceList.filter(filterItem => {
        for (let index = 0; index < headers.length; index++) {
          const element = headers[index]
          return String(filterItem[element.id])
          .toUpperCase()
          .includes(String(search).toUpperCase())
        }
      })
    )
  }

  useEffect(() => {
    if (selectInvoice.label === "All Invoices") {
      setList(data)
    } else {
      setList(
        data.filter(
          filterItem =>
            filterItem.status.toUpperCase() ===
            selectInvoice.label.toUpperCase()
        )
      )
      setSelectedInvoiceList(
        data.filter(
          filterItem =>
            filterItem.status.toUpperCase() ===
            selectInvoice.label.toUpperCase()
        )
      )
    }
  }, [selectInvoice])

  const Sort = h => {
    if (h.sortable) {
      const array = data.sort((a, b) => {
        const ItemA = a[h.id]?.toUpperCase()
        const ItemB = b[h.id]?.toUpperCase()
        if (ItemA < ItemB) {
          return -1
        }
        if (ItemA > ItemB) {
          return 1
        }
        // names must be equal
        return 0
      })
      setList([...array])
    }
  }

  useEffect(() => {
    if (search.length !== 0) {
      Filter()
    } else {
      setList(selectedInvoiceList)
    }
  }, [search])

  return (
    <Container>
      <TableTopContainer>
        {!noSearch && (
          <SearchBar>
            <SearchContainer>
              <LogoSearch>{SearchIcon}</LogoSearch>
              <Search
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </SearchContainer>
          </SearchBar>
        )}
        {invoiceSelect && (
          <CustomInput
            type="select"
            options={[
              {value: 1, label: "All Invoices"},
              {value: 2, label: "Open"},
              {value: 3, label: "Paid"},
              {value: 4, label: "Past Due"},
              {value: 5, label: "Void"}
            ]}
            value={selectInvoice}
            vertical={false}
            onChange={setSelectInvoice}
            border={"1px solid #E4EAF0"}
            height="40px"
            selectWidth="230px"
          />
        )}
      </TableTopContainer>

      <TableView ref={tableRef}>
        <TableHeader>
          {headers.map((h, id) => (
            <HeaderTextcontainer width="250px" key={id}>
              <HeaderItem
                color="#000000"
                sortable={h.sortable}
                onClick={() => Sort(h)}
              >
                {h.sortable && <SortIcon src={ArrowDownIcon} alt="sort-icon"/>}
                {h.title}
              </HeaderItem>
            </HeaderTextcontainer>
          ))}
        </TableHeader>
        {list.map((item, i) => {
          if (item.subTitle) {
            return <div key={i}>{item.title}</div>
          } else {
            return (
              <TableListItem
                className="table-row"
                header={headers}
                data={item}
                i={i}
                key={i}
              />
            )
          }
        })}
        {list.length === 0 && <Nothing>No data!</Nothing>}
      </TableView>
    </Container>
  )
}

const TableListItem = ({i, header, data}) => {
  var navigate = useNavigate()
  return (
    <TableItemContainer selected={i % 2 !== 0}>
      {header.map((item, index) => (
        <HeaderTextcontainer width="250px" key={index}>
          {header[index]?.card ? (
            <>{header[index]?.card(data[header[index]?.id], data)}</>
          ) : (
            <ItemText
              onClick={() => {
                if (header[index]?.clickable && header[index]?.to) {
                  typeof header[index]?.to == "string"
                    ? header[index]?.id === 'edit'
                      ? navigate(header[index]?.to)
                      : navigate(header[index]?.to)
                    : header[index]?.to(data)
                }
              }}
              color={header[index]?.clickable ? "#0496FF" : "#000"}
            >
              {header[index]?.id === "edit" && (
                <>
                  <TableItemImage src={EditIcon} alt="calendar-icon"/>
                  Edit
                </>
              )}

              {/* Need update works only for petlist */}
              {header[index]?.hasProfileImage && (
                <ProfileImage src={data?.pet_photo}></ProfileImage>
              )}
              {header[index]?.id !== "edit" && String(data[header[index]?.id])}
              {header[index]?.id === "remove" && (
                <TableButton type="button">x Remove Service</TableButton>
              )}
              {header[index]?.calendar && (
                <>
                  <TableItemImage src={CalendarIcon} alt="calendar-icon"/>
                  Calendar
                </>
              )}
            </ItemText>
          )}
        </HeaderTextcontainer>
      ))}
    </TableItemContainer>
  )
}

const TitleText = styled.h1`
  font-weight: 400;
  font-size: 36px;
  line-height: 24px;
  color: #cc5500;
  margin-bottom: 34px;
`

const SubTitle = styled.h2`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #181c25;
`

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 24px;
`

const TabItem = styled.div`
  cursor: pointer;
  margin-right: 18px;
`

const TabText = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: ${props => (props.active ? "#cc5500" : "#8992A9")};
`

const TabBorder = styled.div`
  height: 3px;
  background: ${props => (props.active ? "#cc5500" : "transparent")};
  border-radius: 2px;
`

const TableButton = styled.button`
  font-size: 16px;
  font-weight: 700;
  background-color: transparent;
  border: 0;
  outline: 0;
`

const TableTopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TableView = styled.div`
  padding: 20px;
  background: #ffffff;
`

const TableHeader = styled.div`
  padding: 4px 8px;
  gap: 8px;
  height: 50px;
  border-bottom: solid 1px;
  border-color: #ebeff2;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TableItemContainer = styled.div`
  margin: 10px 0;
  padding: 8px;
  gap: 16px;
  height: 38px;
  display: flex;
  justify-content: space-between;
  background: ${props => (props.selected ? "#FAFAFB" : "transparent")};
  align-items: center;
  cursor: pointer;
`

const HeaderTextcontainer = styled.div`
  width: ${props => props.width};
  display: flex;
`

const HeaderItem = styled.button`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  background-color: transparent;
  border: 0;
  letter-spacing: 1.21205px;
  cursor: ${props => props.sortable && "pointer"};
  color: ${props => props.color ?? "#000000"};
`

const ItemStatus = styled.div`
  background: ${props => props.background ?? "trasparent"};
  padding: 2px 8px;
  // height: 19px;
  border-radius: 6px;
`

const ItemText = styled.p`
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0.01em;
  color: ${props => props.color ?? "#000000"};
  display: flex;
  align-items: center;
`

const Container = styled.div``
const SearchBar = styled.div`
  height: 64px;
  background: #f7f8f9;
  border-radius: 4px;
  padding: 12px;
  box-sizing: border-box;
`
const SearchContainer = styled.div`
  height: 100%;
  width: 352px;
  border-radius: 8px;
  border: 1px solid #e4eaf0;
  box-sizing: border-box;
  margin-right: 16px;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
`

const LogoSearch = styled.svg`
  height: 24px;
  width: 24px;
  margin-left: 16px;
  object-fit: contain;
  fill: transparent;
  position: absolute;
`

const Search = styled.input`
  height: 95%;
  width: 100%;
  object-fit: contain;
  border: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  padding-left: 40px;

  &:focus {
    border: none;
  }
`
const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background: #d9d9d9;
  margin-right: 25px;
`

const TableItemImage = styled.img`
  width: 11px;
  height: 12px;
  margin: 0 5px;
`

const Nothing = styled.p`
  text-align: center;
`

const SortIcon = styled.img`
  width: 12px;
  height: 8px;
  margin-right: 20px;
`

export default Table
