import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { main_api } from "../../../../api/axios_helper"
import CreateIcon from "../../../../assets/icons/CreateIcon"
import RandomIcon from "../../../../assets/icons/RandomIcon"
import CustomInput from "../../../../components/CustomInput"
import IconButton from "../../../../components/IconButton"
import CustomModal from "../../../../components/Modal"

function Keys() {
  const [isLoading, setIsloading] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const [assign_keys, setAssign_keys] = useState("")

  let { clientId } = useParams()

  const [isEditing, setIsEditing] = useState(false)
  const [vets, setVets] = useState([])
  const [key, setKey] = useState("")

  const [list, setList] = useState([])

  const addKey = () => {
    if (isLoading || !assign_keys) return
    const formData = new FormData()
    formData.append("key", key)
    formData.append("assign_keys", assign_keys.id)
    formData.append("client", clientId)

    setIsloading(true)

    if (isEditing) {
      main_api
        .put("/api/v1/keys/", formData)
        .then(({ data }) => {
          getKeys()
          setIsloading(false)
          setIsEditing(false)
          setModalOpen(false)
        })
        .catch(error => {
          console.log(error?.response?.data)
          setIsloading(false)
          setIsEditing(false)
        })
    } else {
      main_api
        .post("/api/v1/keys/", formData)
        .then(({ data }) => {
          setList(keys => keys.concat(data))
          setIsloading(false)
          setModalOpen(false)
        })
        .catch(error => {
          console.log(error?.response?.data)
          setIsloading(false)
        })
    }
  }

  const GetVets = () => {
    setIsloading(true)
    main_api
      .get("/api/v1/client_vet/")
      .then(({ data }) => {
        setIsloading(false)
        setVets(data)
      })
      .catch(error => {
        console.log(error?.response?.data)
        setIsloading(false)
      })
  }

  const getKeys = () => {
    setIsloading(true)
    main_api
      .get(`/api/v1/keys/?cid=${clientId}`)
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
    GetVets()
    getKeys()
  }, [])

  return (
    <>
      <ActionButtons>
        <IconButton
          background="#E9BD5A"
          color={"#fff"}
          text="New Key"
          icon={CreateIcon}
          onClick={() => {
            setKey("")
            setAssign_keys("")
            setModalOpen(true)
            setIsEditing(false)
          }}
        />
      </ActionButtons>
      {list.map((item, i) => (
        <KeyContainer>
          <KeyLeft>
            <KeyTitle>{item?.keys}</KeyTitle>
            <KeySubTitle>Possession: {item?.user}</KeySubTitle>
            <KeySubTitle2>Last Update: Sep 2nd, 2022 406 PM</KeySubTitle2>
          </KeyLeft>
          <KeyRight>
            <Button
              onClick={() => {
                setKey(item?.keys)
                setAssign_keys(item?.assign_keys)
                setModalOpen(true)
                setIsEditing(true)
              }}
            >
              Edit Key
            </Button>
          </KeyRight>
        </KeyContainer>
      ))}

      <CustomModal
        title={"New Key"}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
      >
        <CustomInput
          vertical={false}
          margin={"10px 0"}
          padding={"6px 14px"}
          label={"Key/Code"}
          border={"1px solid #CAD3DC"}
          value={key}
          onChange={setKey}
          readOnly
        />
        <RandomContainer /*onClick={() => setKey(Random.getRandomNumber(5))}*/>
          <RandomIconContanier>{RandomIcon}</RandomIconContanier>
          Generate Random Code
        </RandomContainer>

        <CustomInput
          type="select"
          margin={"22px 0"}
          width={"100px"}
          label={"Currently With"}
          border={"1px solid #CAD3DC"}
          options={vets.map(i => {
            i.value = i.id
            i.label = i.name
            return i
          })}
          value={assign_keys}
          onChange={setAssign_keys}
          vertical={false}
        />
        <RowActionContainer>
          <ActionAlt onClick={() => setModalOpen(false)}>Cancel</ActionAlt>
          <Action onClick={addKey}>{isEditing ? "Save Key" : "Add key"}</Action>
        </RowActionContainer>
      </CustomModal>
    </>
  )
}
const ActionButtons = styled.div`
  display: flex;
  margin-bottom: 27px;
`
const KeyContainer = styled.div`
  width: 650px;
  height: 140px;
  margin-bottom: 20px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;

  background: #ffffff;
  border: 1px solid #e4eaf0;
  box-shadow: 0px 1px 8px rgba(110, 110, 110, 0.1);
  border-radius: 16px;
`

const KeyLeft = styled.div``
const KeyRight = styled.div``
const KeyTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: #000000;
  padding: 0;
  margin: 0;
`
const KeySubTitle = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 19px;
  color: #000000;
  padding: 0;
  margin: 0;
  margin-top: 10px;
`
const KeySubTitle2 = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 19px;
  color: #000000;
  padding: 0;
  margin: 0;
  margin-top: 20px;
`

const Button = styled.button`
  justify-content: center;
  align-items: center;
  width: 73px;
  height: 28px;
  border: none;
  background: #e9bd5a;
  border-radius: 6px;

  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #ffffff;
`
const RowActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Action = styled.button`
  width: 72px;
  height: 28px;
  background: #e9bd5a;
  border-radius: 6px;
  border: none;
  // margin-left: auto;
  margin-top: 30px;
  cursor: pointer;

  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  color: #ffffff;

  &:hover {
    background: lightblue;
  }
`

const ActionAlt = styled.button`
  width: 72px;
  height: 28px;
  border-radius: 6px;
  border: none;
  // margin-left: auto;
  margin-top: 30px;
  margin-right: 20px;
  background: #ffffff;
  border: 1px solid #000000;
  cursor: pointer;

  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  color: #000000;
`

const RandomContainer = styled.span`
  margin-top: -20px;
  margin-left: 90px;

  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #e9bd5a;

  cursor: pointer;
`

const RandomIconContanier = styled.svg`
  width: 17px;
  height: 15px;
  fill: transparent;
  stroke: #e9bd5a;
  margin-right: 5px;
`

export default Keys
