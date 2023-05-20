import moment from "moment"
import { PubNubProvider } from "pubnub-react"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { main_api } from "../../../../api/axios_helper"
import ArrowDownIcon from "../../../../assets/icons/ArrowDownIcon"
import CloseIcon from "../../../../assets/icons/CloseIcon"
import EditIcon from "../../../../assets/icons/EditIcon"
import MailIcon from "../../../../assets/icons/MailIcon"
import NoteIcon from "../../../../assets/icons/NoteIcon"
import PhoneIcon from "../../../../assets/icons/PhoneIcon"
import PieChartIcon from "../../../../assets/icons/PieChartIcon"
import PieChartIcon2 from "../../../../assets/icons/PieChartIcon2"
import PieChartIcon3 from "../../../../assets/icons/PieChartIcon3"
import PieChartIcon4 from "../../../../assets/icons/PieChartIcon4"
import PinIcon from "../../../../assets/icons/PinIcon"
import CheckButton from "../../../../components/CheckButton"
import CustomInput from "../../../../components/CustomInput"
import Create from "../create"
import Conversations from "./Conversations"
import Docs from "./Docs"
import History from "./History"
import Keys from "./Keys"
import Pets from "./Pets"
import Rates from "./Rates"
import Services from "./Services"

import PubNub from "pubnub"

const pubnub = new PubNub({
  publishKey: "pub-c-bfa8ac7a-5ae8-4904-a744-9a378a10c328",
  subscribeKey: "sub-c-61f4eb4a-f3d5-42ed-a5d3-abf314436b49",
  uuid: "myUniqueUUID"
})

function ClientsDetail({ data }) {
  let { clientId } = useParams()
  const [isLoading, setIsloading] = useState(false)
  const [tasks, setTasks] = useState([])
  const [staffs, setStaff] = useState([])
  const [isQuickAction, setIsQuickAction] = useState(false)
  const [profileData, setProfileData] = useState({})

  useEffect(() => {
    setProfileData(data)
  }, [data])

  const [navItems, setNavItems] = useState([
    { name: "Conversation" },
    { name: "Details" },
    { name: "Services/Invoices" },
    { name: "Pets" },
    { name: "Rates" },
    { name: "Keys" },
    { name: "Docs" },
    { name: "History" }
  ])

  const [activeNavItem, setActiveNavItem] = useState(navItems[0])

  const [isModalOpen, setModalOpen] = useState(false)
  const [isTaskListModalOpen, setIsTaskListModalOpen] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [assign_to, setAssign_to] = useState("")
  const [client, setClient] = useState("")
  const [date, setDate] = useState("")

  const GetTasks = () => {
    setIsloading(true)
    main_api
      .get("/api/v1/task/")
      .then(({ data }) => {
        setTasks(data)
        setIsloading(false)
      })
      .catch(error => {
        console.log(error?.response?.data)
        setIsloading(false)
      })
  }

  const GetStaffs = () => {
    main_api
      .get("/api/v1/staff/")
      .then(({ data }) => {
        setStaff(data)
      })
      .catch(error => {
        console.log(error?.response?.data)
      })
  }

  const getClientDetails = () => {
    main_api
      .get(`/api/v1/client/${clientId}/`)
      .then(({ data }) => {
        setProfileData(data)
      })
      .catch(error => {
        console.log(error?.response?.data)
      })
  }

  useEffect(() => {
    GetTasks()
    GetStaffs()
    getClientDetails()
  }, [])

  const setTask = () => {
    if (isLoading || !name || !description || !assign_to || !client || !date)
      return
    const formData = new FormData()
    formData.append("name", name)
    formData.append("description", description)
    formData.append("assign_to", assign_to.id)
    formData.append("client", client)
    formData.append("due_date", date)

    setIsloading(true)
    main_api
      .post("/api/v1/task/", formData)
      .then(({ data }) => {
        setModalOpen(false)
        setTasks(t => t.concat(data))
        setIsloading(false)
      })
      .catch(error => {
        console.log(error?.response?.data)
        setIsloading(false)
      })
  }

  return (
    <>
      <Container>
        <SideContainer>
          <EditContainer
            onClick={() =>
              navItems.filter(x => x.name == "Details")?.[0]
                ? setActiveNavItem(navItems.filter(x => x.name == "Details")[0])
                : null
            }
          >
            <EditLog>{EditIcon}</EditLog> Edit
          </EditContainer>
          <Headers size={"30px"}>{profileData?.full_name}</Headers>
          <Tag>Flag</Tag>
          <Contacts marginTop={"35px"}>
            <Headers>Contact</Headers>
            <ContactItem>
              <Icon>{PinIcon}</Icon>Nearest Staff
            </ContactItem>
            <ContactItem>
              <Icon>{PhoneIcon}</Icon>
              {profileData?.phone_number}
            </ContactItem>
            <ContactItem>
              <Icon>{PhoneIcon}</Icon>
              {profileData?.phone_number}
            </ContactItem>
            <ContactItem>
              <Icon>{MailIcon}</Icon>
              {profileData?.email}
            </ContactItem>
            <Button onClick={() => setIsQuickAction(x => !x)}>
              Quick Actions
              <Icon2>{ArrowDownIcon}</Icon2>
            </Button>
            {isQuickAction && (
              <QuickAction /*onMouseOut={() => setIsQuickAction(false)}*/>
                <QuickItem>
                  <QuickIcon>{NoteIcon}</QuickIcon>Schedule Service(s)
                </QuickItem>
                <QuickItem>
                  <QuickIcon>{NoteIcon}</QuickIcon>View Past Requests
                </QuickItem>
                <QuickItem>
                  <QuickIcon>{NoteIcon}</QuickIcon>Add Client Q&ANote
                </QuickItem>
                <QuickItem>
                  <QuickIcon>{NoteIcon}</QuickIcon>Add Service Note
                </QuickItem>
                <QuickItem borderBottom={"1px solid #E4EAF0"}>
                  <QuickIcon>{NoteIcon}</QuickIcon>Print Contract/Pet
                  Information
                </QuickItem>

                <QuickItem>
                  <QuickIcon>{NoteIcon}</QuickIcon>Send Welcome Email
                </QuickItem>
                <QuickItem>
                  <QuickIcon>{NoteIcon}</QuickIcon>Notification Diagnosis
                </QuickItem>
                <QuickItem>
                  <QuickIcon>{NoteIcon}</QuickIcon>Log in As Client
                </QuickItem>
                <QuickItem>
                  <QuickIcon>{NoteIcon}</QuickIcon>Change Client's Password
                </QuickItem>
                <QuickItem>
                  <QuickIcon>{NoteIcon}</QuickIcon>Make Inactive
                </QuickItem>
              </QuickAction>
            )}
          </Contacts>
          <Contacts height={"263px"} marginTop={"20px"}>
            <Headers>Tasks list</Headers>
            {tasks
              .slice()
              .reverse()
              .slice(0, 2)
              .map((d, i) => (
                <TaskListItem
                  last={tasks.slice(1).length == i + 1}
                  d={d}
                  checked={tasks.length == i + 1}
                />
              ))}
            <Button onClick={() => setModalOpen(true)}>Add Task</Button>
            <TaskView onClick={() => setIsTaskListModalOpen(true)}>
              View All Tasks
            </TaskView>
          </Contacts>
          <Contacts height={"201px"} marginTop={"20px"} padding={"0px"}>
            <iframe
              width="100%"
              height="100%"
              id="gmap_canvas"
              src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
            ></iframe>
          </Contacts>
        </SideContainer>
        <Content>
          <TopCard>
            <ChartIcon>{PieChartIcon}</ChartIcon>
            <ChartIcon>{PieChartIcon2}</ChartIcon>
            <ChartIcon>{PieChartIcon3}</ChartIcon>
            <ChartIcon>{PieChartIcon4}</ChartIcon>
          </TopCard>
          <NavBar>
            {navItems.map((item, index) => (
              <NavItem
                active={item == activeNavItem}
                onClick={() => setActiveNavItem(item)}
                key={index}
              >
                {item.name}
              </NavItem>
            ))}
          </NavBar>
          <ContentContainer>
            {activeNavItem === navItems[0] && (
              <PubNubProvider client={pubnub}>
                <Conversations />
              </PubNubProvider>
            )}
            {activeNavItem === navItems[1] && (
              <Create done={e => setProfileData(e)} edit data={profileData} />
            )}
            {activeNavItem === navItems[2] && <Services />}
            {activeNavItem === navItems[3] && <Pets />}
            {activeNavItem === navItems[4] && <Rates />}
            {activeNavItem === navItems[5] && <Keys />}
            {activeNavItem === navItems[6] && <Docs />}
            {activeNavItem === navItems[7] && <History />}
          </ContentContainer>
        </Content>
      </Container>

      <ModalContainer visible={isModalOpen}>
        <Modal>
          <ModalHeader>
            <ModalHeaderText>New Task</ModalHeaderText>
            <ModalClose onClick={() => setModalOpen(false)}>
              {CloseIcon}
            </ModalClose>
          </ModalHeader>
          <CustomInput
            width={"261px"}
            height={"28px"}
            margin={"22px 0"}
            padding={"6px 14px"}
            label={"Name"}
            vertical={false}
            border={"1px solid #CAD3DC"}
            placeholder="Task Name"
            value={name}
            onChange={setName}
          />
          <CustomInput
            width={"261px"}
            height={"28px"}
            margin={"22px 0"}
            padding={"6px 14px"}
            label={"Client"}
            placeholder="Leslie Fox"
            vertical={false}
            border={"1px solid #CAD3DC"}
            value={client}
            onChange={setClient}
          />
          <CustomInput
            type="select"
            width={"261px"}
            height={"28px"}
            margin={"22px 0"}
            padding={"6px 14px"}
            label={"Assign To"}
            placeholder="Assign To"
            vertical={false}
            border={"1px solid #CAD3DC"}
            options={staffs.map(i => {
              i.value = i.id
              i.label = i.name
              return i
            })}
            value={assign_to}
            onChange={setAssign_to}
          />
          <CustomInput
            width={"261px"}
            height={"28px"}
            margin={"22px 0"}
            padding={"6px 14px"}
            label={"Description"}
            vertical={false}
            border={"1px solid #CAD3DC"}
            value={description}
            onChange={setDescription}
          />
          <CustomInput
            width={"261px"}
            height={"28px"}
            margin={"22px 0"}
            padding={"6px 14px"}
            label={"Due Date"}
            vertical={false}
            border={"1px solid #CAD3DC"}
            value={date}
            onChange={setDate}
            type="date"
          />
          <Action onClick={setTask}>Add Task</Action>
        </Modal>
      </ModalContainer>

      <ModalContainer visible={isTaskListModalOpen}>
        <Modal>
          <ModalHeader>
            <ModalHeaderText>All Tasks</ModalHeaderText>
            <ModalClose onClick={() => setIsTaskListModalOpen(false)}>
              {CloseIcon}
            </ModalClose>
          </ModalHeader>
          {tasks.map((d, i) => (
            <TaskListItem
              last={tasks.slice(1).length == i + 1}
              d={d}
              checked={tasks.length == i + 1}
            />
          ))}
        </Modal>
      </ModalContainer>
    </>
  )
}

const TaskListItem = ({ last, d }) => {
  const [timeRemaining, setTimeRemaining] = useState(0)
  useEffect(() => {
    let interval = 0
    if (!moment(d?.due_date).isSameOrBefore(moment.now())) {
      setInterval(() => {
        let diff = moment(d?.due_date).diff(moment.now())
        setTimeRemaining(moment(diff).format("D:LTS").split(" ")?.[0])
      }, 100)
    }
    return clearInterval(interval)
  }, [])
  return (
    <TaskList last={last}>
      <CheckButton checked={moment(d?.due_date).isSameOrBefore(moment.now())} />
      <TaskContent>
        <TaskTitle>{d.description}</TaskTitle>
        <TaskDetail>
          {moment(d?.due_date).format("YYYY-MM-DD / LT")} / {d?.client}
        </TaskDetail>
        {moment(d?.due_date).isSameOrBefore(moment.now()) ? (
          <TaskStatus>Completed</TaskStatus>
        ) : (
          <TaskStatContainer>
            <TaskStatus>Time Remaining</TaskStatus>
            <TaskTimeStatus>{timeRemaining}</TaskTimeStatus>
          </TaskStatContainer>
        )}
      </TaskContent>
    </TaskList>
  )
}

const Container = styled.div`
  display: flex;
`

const SideContainer = styled.div`
  width: 324px;
  height: 897px;
  background: #ffffff;
  border: 1px solid #e4eaf0;
  box-shadow: 0px 1px 8px rgba(110, 110, 110, 0.1);
  border-radius: 16px;
  padding: 37px;
  padding-top: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Contacts = styled.div`
  position: relative;
  width: 240px;
  height: ${props => props.height ?? "238px"};
  margin-top: ${props => props.marginTop ?? "0"};
  background: #ffffff;
  box-shadow: 0px 1px 8px rgba(110, 110, 110, 0.1);
  border-radius: 16px;
  padding: ${props => props.padding ?? "13px 21px"};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ContactItem = styled.span`
  width: 100%;
  height: 18px;
  margin-top: 18px;
  display: flex;
  align-items: center;

  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 1.21205px;
  color: #000000;
  overflow: hidden;
`

const Headers = styled.h3`
  font-weight: 700;
  font-size: ${props => props.size ?? "20px"};
  letter-spacing: 0.01px;
  color: #414d55;
  margin: 0;
`

const Content = styled.div`
  margin-left: 22px;
`

const TopCard = styled.div`
  display: flex;
  width: 788px;
  height: 156px;
  background: #ffffff;
  border: 1px solid #e4eaf0;
  box-shadow: 0px 1px 8px rgba(110, 110, 110, 0.1);
  border-radius: 16px;
  justify-content: space-evenly;
  align-items: center;
`
const Icon = styled.svg`
  width: calc(14.73px + 17.27px);
  height: 20px;
  stroke: #e9bd5a;
  fill: #fff;
`
const Icon2 = styled.svg`
  width: 14.73px;
  height: 10px;
  fill: #e9bd5a;
  stroke: #fff;
  margin-left: 10px;
`
const Button = styled.button`
  margin-top: 15px;
  display: flex;
  align-items: center;
  padding: 6px 14px;
  height: 28px;
  background: #e9bd5a;
  border-radius: 6px;
  border: none;
  cursor: pointer;

  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #ffffff;
`

const TaskList = styled.div`
  display: flex;
  padding: 10px 0;
  border-bottom: ${props => (props.last ? "none" : "1px solid #E4EAF0")};
  box-sizing: border-box;
`
const TaskContent = styled.div`
  width: 180px;
  height: 58px;
`
const TaskTitle = styled.p`
  margin: 0;
  height: 22px;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #727677;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const TaskDetail = styled.p`
  margin: 0;
  height: 20px;
  font-weight: 400;
  font-size: 10px;
  line-height: 20px;
  letter-spacing: 0.416667px;
  text-transform: uppercase;
  color: #696d6e;
  overflow: hidden;
`

const TaskStatus = styled.span`
  margin: 0;
  height: 16px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #55b842;
`

const TaskView = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.25px;
  color: #0496ff;
  cursor: pointer;
`

const ChartIcon = styled.svg`
  width: 130px;
  height: 130px;
  fill: none;
  margin-left: 10px;
`

const NavBar = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  width: 787px;
  height: 61px;
  background: #fcfcfc;
  box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  box-sizing: border-box;
`

const NavItem = styled.button`
  padding: 9px 8px;
  height: 37px;
  background: ${props =>
    props.active ? "rgba(233, 189, 90, 0.2)" : "transparent"};
  border-radius: 6px;
  border: none;
  cursor: pointer;

  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: ${props => (props.active ? "#e9bd5a" : "#000")};

  &:hover {
    background: lightblue;
  }
`

const QuickAction = styled.div`
  position: absolute;
  top: 90%;
  width: 226px;
  height: 235px;
  background: #ffffff;
  border: 1px solid #e4eaf0;
  border-radius: 6px;
  z-index: 999;
  padding: 9px;
  box-sizing: border-box;
`

const QuickItem = styled.span`
  width: 100%;
  height: 16px;
  margin-top: 5px;
  display: flex;
  align-items: center;
  border-bottom: ${props => props.borderBottom ?? "none"};
  cursor: pointer;

  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #000000;
`

const QuickIcon = styled.svg`
  width: calc(11px + 17.27px);
  height: 12px;
  stroke: #000000;
  fill: #fff;
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

const ContentContainer = styled.div`
  width: 976px;
  background: #ffffff;
  border: 1px solid #e4eaf0;
  box-shadow: 0px 1px 8px rgba(110, 110, 110, 0.1);
  border-radius: 16px;
  margin-top: 20px;
  padding: 10px;
  box-sizing: border-box;
`

const ChartContainer = styled.div`
  position: relative;

  left: 0;
  right: 0;

  // margin-left: auto;
  // margin-right: auto;
  width: 130px;
`

const Tag = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 57px;
  height: 19px;
  background: rgba(4, 150, 255, 0.21);
  border-radius: 100px;
  margin-top: 10px;

  font-size: 12px;
  line-height: 16px;
  letter-spacing: 1.21205px;
  color: #0496ff;
`

const TaskStatContainer = styled.div`
  position: relative;
`

const TaskTimeStatus = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.416667px;
  color: #0496ff;
  position: absolute;
  width: 44px;
  height: 20px;
  right: 20px;
  top: 3px;
`

const EditContainer = styled.span`
  align-self: end;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  letter-spacing: 1.21205px;
  color: #0496ff;
  cursor: pointer;
`

const EditLog = styled.svg`
  width: 14px;
  height: 14px;
  stroke: #0496ff;
  fill: transparent;
  margin-right: 5px;
`

export default ClientsDetail
