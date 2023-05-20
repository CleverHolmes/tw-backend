import React, { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { main_api } from "../../../../api/axios_helper"
import CloseIcon from "../../../../assets/icons/CloseIcon"
import CustomInput from "../../../../components/CustomInput"

function Pets() {
  const [isLoading, setIsloading] = useState(false)

  const [isModalOpen, setModalOpen] = useState(false)
  let { clientId } = useParams()

  const [isEditing, setIsEditing] = useState(false)

  const [list, setList] = useState([])
  const [vets, setVets] = useState([])
  const [selected, setSelected] = useState(null)

  const [name, setName] = useState("")
  const [birth_date, setBirth_date] = useState("")
  const [breed, setBreed] = useState("")
  const [color, setColor] = useState("")
  const [microchip, setMicrochip] = useState("")
  const [note, setNote] = useState("")
  const [type, setType] = useState("")
  const [sex, setSex] = useState("")
  const [neutered, setNeutered] = useState("")
  const [vaccination_current, setVaccination_current] = useState("")
  const [primary_vet, setPrimary_vet] = useState("")
  const [alternate_vet, setAlternate_vet] = useState("")

  const [files, setFiles] = useState([])
  const [filesList, setFilesList] = useState([])
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files

    acceptedFiles.map(file => {
      setFiles(file)
    })
    setFilesList(
      acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    )
  }, [])
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": []
      }
    })

  const thumbs = filesList.map(file => (
    // <div style={thumb} key={file.name}>
    //   <div style={thumbInner}>
    <PetImage
      src={file.preview}
      marginTop={"20px"}
      // Revoke data uri after image is loaded
      onLoad={() => {
        URL.revokeObjectURL(file.preview)
      }}
    />
    //   </div>
    // </div>
  ))

  const GetPets = () => {
    setIsloading(true)
    main_api
      .get(`/api/v1/client_pet/?cid=${clientId}`)
      .then(({ data }) => {
        setIsloading(false)
        setList(data)
        setSelected(data[0])
      })
      .catch(error => {
        console.log(error?.response?.data)
        setIsloading(false)
      })
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

  useEffect(() => {
    GetPets()
    GetVets()
  }, [])

  const setTask = () => {
    if (isLoading || !name) return
    const formData = new FormData()
    formData.append("name", name)
    formData.append("birth_date", birth_date)
    formData.append("breed", breed)
    formData.append("color", color)
    formData.append("micro_chip", microchip)
    formData.append("notes", note)
    formData.append("type", type)
    formData.append("neutered", neutered?.value)
    formData.append("sex", sex?.value)
    formData.append("vaccination_current", vaccination_current?.value)
    formData.append("primary_vet", primary_vet.id)
    formData.append("alternate_vet", alternate_vet.id)
    formData.append("pet_photo", files, files?.name)
    formData.append("client", clientId)
    setIsloading(true)
    main_api
      .post("/api/v1/client_pet/", formData)
      .then(({ data }) => {
        setIsloading(false)
        setModalOpen(false)
        setList(t => t.concat(data))
      })
      .catch(error => {
        console.log(error?.response?.data)
        setIsloading(false)
      })
  }

  const updatePet = () => {
    const formData = new FormData()
    formData.append("name", selected?.name)
    formData.append("birth_date", selected?.birth_date)
    formData.append("breed", selected?.breed)
    formData.append("color", selected?.color)
    formData.append("micro_chip", selected?.micro_chip)
    formData.append("sex", selected?.sex?.value ?? selected?.sex)
    formData.append("notes", selected?.notes)
    formData.append("type", selected?.type)
    formData.append("neutered", selected?.neutered?.value ?? selected?.neutered)
    formData.append(
      "vaccination_current",
      selected?.vaccination_current?.value ?? selected?.vaccination_current
    )
    formData.append(
      "primary_vet",
      selected?.primary_vet?.id ?? selected?.primary_vet
    )
    formData.append(
      "alternate_vet",
      selected?.alternate_vet?.id ?? selected?.alternate_vet
    )

    console.log(
      "alternate_vet",
      selected?.alternate_vet?.id ?? selected?.alternate_vet
    )
    console.log(
      "primary_vet",
      selected?.primary_vet?.id ?? selected?.primary_vet
    )
    console.log(
      "vaccination_current",
      selected?.vaccination_current?.value ?? selected?.vaccination_current
    )

    // return

    main_api
      .put(`/api/v1/client_pet/${selected?.id}/`, formData)
      .then(({ data }) => {
        GetPets()
        setIsEditing(false)
      })
      .catch(error => {
        console.log(error?.response?.data)
      })
  }

  return (
    <>
      <PetList>
        {list.map(item => (
          <PetItem onClick={() => setSelected(item)}>{item?.name}</PetItem>
        ))}
        <CreateItem onClick={() => setModalOpen(true)}>Add Pet</CreateItem>
      </PetList>
      {selected && (
        <Pet>
          <PetHeader>
            <PetImage src={selected?.pet_photo} />
            {isEditing ? (
              <Action onClick={() => updatePet()}>Save</Action>
            ) : (
              <PetEdit onClick={() => setIsEditing(true)}>Edit Details</PetEdit>
            )}
          </PetHeader>
          <PetForms>
            {Object.keys(selected).map((key, i) => (
              <FormContainer hidden={["id", "pet_photo"].includes(key)} key={i}>
                <CustomInput
                  label={key.split("_").join(" ")}
                  value={selected[key]}
                  onChange={value => {
                    setSelected(s => {
                      s = { ...s }
                      s[key] = value
                      return s
                    })
                  }}
                  border={"1px solid #CAD3DC"}
                  padding={"6px 14px"}
                  readOnly={!isEditing}
                  options={
                    key == "sex"
                      ? [
                          {
                            value: 1,
                            label: "male"
                          },
                          {
                            value: 2,
                            label: "female"
                          }
                        ]
                      : key == "neutered"
                      ? [
                          {
                            value: 1,
                            label: "yes"
                          },
                          {
                            value: 2,
                            label: "no"
                          }
                        ]
                      : key == "vaccination_current"
                      ? [
                          {
                            value: 1,
                            label: "Weekly"
                          }
                        ]
                      : key == "primary_vet"
                      ? vets.map(i => {
                          i.value = i.id
                          i.label = i.name
                          return i
                        })
                      : key == "alternate_vet"
                      ? vets.map(i => {
                          i.value = i.id
                          i.label = i.name
                          return i
                        })
                      : []
                  }
                  type={
                    key.includes("date")
                      ? "date"
                      : [
                          "sex",
                          "neutered",
                          "vaccination_current",
                          "primary_vet",
                          "alternate_vet"
                        ].includes(key)
                      ? "select"
                      : "text"
                  }
                />
              </FormContainer>
            ))}
          </PetForms>
        </Pet>
      )}

      <ModalContainer visible={isModalOpen}>
        <Modal>
          <ModalHeader>
            <ModalHeaderText>Basic Details</ModalHeaderText>
            <ModalClose onClick={() => setModalOpen(false)}>
              {CloseIcon}
            </ModalClose>
          </ModalHeader>
          <CustomInput
            margin={"10px 0"}
            padding={"6px 14px"}
            label={"Name*"}
            border={"1px solid #CAD3DC"}
            value={name}
            onChange={setName}
          />
          <CustomInput
            margin={"10px 0"}
            padding={"6px 14px"}
            label={"Birthdate"}
            border={"1px solid #CAD3DC"}
            value={birth_date}
            onChange={setBirth_date}
            type="date"
          />
          <CustomInput
            margin={"10px 0"}
            padding={"6px 14px"}
            label={"Type"}
            border={"1px solid #CAD3DC"}
            value={type}
            onChange={setType}
          />
          <CustomInput
            margin={"10px 0"}
            padding={"6px 14px"}
            label={"Breed"}
            border={"1px solid #CAD3DC"}
            value={breed}
            onChange={setBreed}
          />
          <CustomInput
            margin={"10px 0"}
            padding={"6px 14px"}
            label={"Color"}
            border={"1px solid #CAD3DC"}
            value={color}
            onChange={setColor}
          />
          <CustomInput
            margin={"10px 0"}
            padding={"6px 14px"}
            label={"Microchip"}
            border={"1px solid #CAD3DC"}
            value={microchip}
            onChange={setMicrochip}
          />
          <CustomInput
            type="select"
            margin={"22px 0"}
            label={"Sex"}
            border={"1px solid #CAD3DC"}
            options={[
              {
                value: 1,
                label: "male"
              },
              {
                value: 2,
                label: "female"
              }
            ]}
            value={sex}
            onChange={setSex}
          />
          <CustomInput
            type="select"
            margin={"22px 0"}
            label={"Neutered"}
            border={"1px solid #CAD3DC"}
            options={[
              {
                value: "1",
                label: "yes"
              },
              {
                value: "2",
                label: "no"
              }
            ]}
            value={neutered}
            onChange={setNeutered}
          />
          <CustomInput
            type="select"
            margin={"22px 0"}
            label={"Vaccination Current"}
            border={"1px solid #CAD3DC"}
            options={[
              {
                value: 1,
                label: "Weekly"
              }
            ]}
            value={vaccination_current}
            onChange={setVaccination_current}
          />
          <CustomInput
            type="select"
            margin={"22px 0"}
            label={"Primary Vet"}
            border={"1px solid #CAD3DC"}
            options={vets.map(i => {
              i.value = i.id
              i.label = i.name
              return i
            })}
            value={primary_vet}
            onChange={setPrimary_vet}
          />
          <CustomInput
            type="select"
            margin={"22px 0"}
            label={"Alternate Vet"}
            border={"1px solid #CAD3DC"}
            options={vets.map(i => {
              i.value = i.id
              i.label = i.name
              return i
            })}
            value={alternate_vet}
            onChange={setAlternate_vet}
          />
          <CustomInput
            margin={"10px 0"}
            padding={"6px 14px"}
            label={"Note"}
            border={"1px solid #CAD3DC"}
            value={note}
            onChange={setNote}
          />
          <UploadText>Pet Picture</UploadText>
          <UploadZone {...getRootProps()}>
            <input {...getInputProps()} />
            Drag & drop or browse
          </UploadZone>
          {thumbs}
          <Action onClick={setTask}>Add Pet</Action>
        </Modal>
      </ModalContainer>
    </>
  )
}
const PetList = styled.div`
  display: flex;
  justify-content: center;
`
const PetItem = styled.div`
  padding: 6px 9px;
  left: 0px;
  top: 0px;
  background: #e9bd5a;
  border-radius: 6px;
  cursor: pointer;
  box-sizing: border-box;
  margin-left: 27px;

  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  letter-spacing: 0.5px;
  color: #ffffff;
`

const CreateItem = styled.div`
  padding: 6px 9px;
  left: 0px;
  top: 0px;
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid #000000;
  border-radius: 6px;
  margin-left: 27px;
  cursor: pointer;
  box-sizing: border-box;

  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  letter-spacing: 0.5px;
  color: #000000;
`

const Pet = styled.div``

const PetHeader = styled.div`
  display: flex;
  height: 121px;
  padding: 11px 35px;
  border-bottom: 1px solid #e9edf0;
  box-sizing: border-box;

  align-items: center;
  justify-content: space-between;
`

const PetImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background: grey;
  object-fit: cover;
  margin-top: ${props => props.marginTop ?? "0"};
`

const PetEdit = styled.span`
  cursor: pointer;
  font-weight: 400;
  font-size: 12px;
  line-height: 11px;
  letter-spacing: -0.01em;
  color: #0496ff;
`

const FormContainer = styled.div`
  width: 236.55px;
  margin-left: 47px;
`

const PetForms = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  box-sizing: border-box;
`

const ModalContainer = styled.div`
  position: absolute;
  display: ${props => (props.visible ? "flex" : "none")};
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(229, 236, 239, 0.4);
  backdrop-filter: blur(1.5px);
  align-items: center;
  justify-content: center;
`

const Modal = styled.div`
  padding: 30px;
  max-height: 80%;
  overflow: scroll;
  padding-left: 55px;
  background: #ffffff;
  box-shadow: 0px 1px 8px rgba(110, 110, 110, 0.1);
  border-radius: 16px;
  width: 480px;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ModalHeaderText = styled.span`
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  letter-spacing: 0.01px;
  color: #414d55;
`

const ModalClose = styled.svg`
  width: 30px;
  height: 30px;
  cursor: pointer;
  stroke: #414d55;
`

const Action = styled.button`
  width: 72px;
  height: 28px;
  background: #e9bd5a;
  border-radius: 6px;
  border: none;
  margin-left: auto;
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

const UploadText = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.136219px;
  color: #5e5e5e;
  margin-bottom: 20px;
`

const UploadZone = styled.div`
  margin-top: 20px;
  width: 344px;
  height: 28px;
  background: #ffffff;
  border: 1px dashed #cad3dc;
  border-radius: 5px;
  padding-left: 49px;

  font-weight: 400;
  font-size: 10px;
  line-height: 20px;
  display: flex;
  align-items: center;
  letter-spacing: 0.01px;
  color: #8b8698;
`

export default Pets
