import React, { useCallback, useRef, useState } from "react"
import ArrowDownIcon from "../../../../assets/icons/ArrowDownIcon"
import MailIcon from "../../../../assets/icons/MailIcon"
import PhoneIcon from "../../../../assets/icons/PhoneIcon"
import PinIcon from "../../../../assets/icons/PinIcon"
import CheckButton from "../../../../components/CheckButton"
import EditPenIcon from "../../../../assets/icons/EditPenIcon"
import AvatarImg from "../../../../assets/avatar/avatar-7.png"
import {
  Avatar,
  AvatarContainer,
  AvatarEditButton,
  Button,
  ContactItem,
  Contacts,
  Container,
  Content,
  ContentContainer,
  Headers,
  Icon,
  Icon2,
  NavBar,
  NavItem,
  QuickAction,
  QuickIcon,
  QuickItem,
  SideContainer,
  StaffStatusContainer,
  Tag,
  TaskContent,
  TaskDetail,
  TaskDetailPanel,
  TaskList,
  TaskStatus,
  TaskTitle,
  TaskView,
  TextAvatar,
  Action,
  Modal,
  ModalHeader,
  ModalClose,
  ModalContainer,
  ModalHeaderText,
  CheckBoxContainer,
  CheckBox
} from "./index.styled"
import Activity from "./Activity"
import Keys from "./Keys"
import Services from "./Services"
import Rates from "./Rates"
import Docs from "./Docs"
import PayStubs from "./PayStubs"
import Messages from "./Messages"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"
import { main_api } from "../../../../api/axios_helper"
import { Toast } from "primereact/toast"
import { useDropzone } from "react-dropzone"
import moment from "moment"
import QaEmailIcon from "../../../../assets/icons/QaEmailIcon"
import QaInactiveIcon from "../../../../assets/icons/QaInactiveIcon"
import QaLogoutIcon from "../../../../assets/icons/QaLogoutIcon"
import QaNotificationIcon from "../../../../assets/icons/QaNotificationIcon"
import QaSettingIcon from "../../../../assets/icons/QaSettingIcon"
import { UploadZone } from "./Docs.styled"
import AddNewStaffModal from "../../../../components/Modals/AddNewStaffModal"
import NoteIcon from "../../../../assets/icons/NoteIcon"
import CustomInput from "../../../../components/CustomInput"
import ViewAllTaskModal from "../../../../components/Modals/ViewAllTaskModal"
import AddTaskModal from "../../../../components/Modals/AddTaskModal"
import { SketchPicker } from "react-color"
import { Dropdown } from "react-bootstrap"
import { ref } from "yup"

const StaffDetail = () => {
  const [navItems, setNavItems] = useState([
    // { name: "Messages" },
    { name: "Schedule" },
    { name: "Keys" },
    { name: "Services" },
    { name: "Rates" },
    { name: "Docs" },
    { name: "Activity Field" },
    { name: "Pay Stubs" }
  ])

  const [activeNavItem, setActiveNavItem] = useState(navItems[0])
  const [staffData, setStaffData] = useState()
  const [staffList, setStaffList] = useState([])
  const [assignStaffList, setAssignStaffList] = useState([])
  const location = useLocation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [staffId, setStaffId] = useState()
  const toast = useRef(null)
  const [files, setFiles] = useState()
  const [isLoading, setIsloading] = useState(false)
  const [isQuickAction, setIsQuickAction] = useState(false)
  const [isAddTastModalOpen, setIsAddTaskModalOpen] = useState(false)
  const [isTaskListModalOpen, setIsTaskListModalOpen] = useState(false)
  const [tasks, setTasks] = useState([])
  const [clientList, setClientList] = useState([])
  const [serviceList, setServiceList] = useState([])
  const [pickColor, setPickColor] = useState("#fff")

  const getStaff = async id => {
    const res = await main_api.get("/api/v1/staff-list/" + id + "/")
    if (res.data) {
      setStaffData(res.data)
    }
  }
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    acceptedFiles.map(file => {
      setFiles(file)
    })
  }, [])

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

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": []
      }
    })

  const acceptedFileItems = acceptedFiles.map(file => {
    if (files) return <li key={file.path}>{file.path}</li>
  })

  const getStaffData = async () => {
    const res = await main_api.get("/api/v1/staff-list/")
    if (res.data) {
      setStaffList([...res.data])
    }
  }

  const getAssignStaffData = async () => {
    const res = await main_api.get("/api/v1/staff/")
    if (res.data) {
      setAssignStaffList([...res.data])
    }
  }

  const getClient = () => {
    main_api.get("/api/v1/client/").then(({ data }) => setClientList([...data]))
  }

  const getService = () => {
    main_api
      .get("/api/v1/services/")
      .then(({ data }) => setServiceList([...data]))
  }

  const handleChangeComplete = color => {
    setPickColor(color.hex)
  }

  useEffect(() => {
    const id = location.pathname.split("/staff/")[1]
    if (Number.isInteger(+id)) {
      setStaffId(id)
      getStaff(id)
      GetTasks()
      getStaffData()
      getClient()
      getService()
      getAssignStaffData()
    }
  }, [location.pathname])

  return (
    <>
      <Toast ref={toast} />
      <Container>
        <SideContainer>
          <AvatarContainer>
            {staffData?.avatar ? (
              <Avatar src={staffData.avatar} alt="staff-avatar" />
            ) : (
              <TextAvatar>{staffData && staffData.staff_name[0]}</TextAvatar>
            )}
            <AvatarEditButton onClick={() => setIsModalOpen(true)}>
              <Icon>{EditPenIcon}</Icon>
            </AvatarEditButton>
          </AvatarContainer>
          <Headers size={"30px"}>{staffData?.staff_name}</Headers>
          <StaffStatusContainer>
            <Tag>Flag</Tag>
            <Button
              bg={staffData?.color}
              height="auto"
              marginLeft="10px"
              padding="1px 15px"
              round="100px"
              marginTop="0"
            >
              Event Color
            </Button>
            {/* <SketchPicker
              onChangeComplete={handleChangeComplete}
              color={pickColor}
            /> */}
          </StaffStatusContainer>
          <Contacts marginTop={"23px"} height="auto" padding={"26px 29px"}>
            {/* <ContactItem className="text-capitalize">
              <Icon>{PinIcon}</Icon>
              {staffData?.staff_role}
            </ContactItem> */}
            <ContactItem>
              <Icon>{PhoneIcon}</Icon>
              {"(" +
                staffData?.phone_number?.substr(0, 3) +
                ") " +
                staffData?.phone_number?.substr(3)}
            </ContactItem>
            <ContactItem>
              <Icon>{PhoneIcon}</Icon>
              {"(" +
                staffData?.secondary_phone_number?.substr(0, 3) +
                ") " +
                staffData?.secondary_phone_number?.substr(3)}
            </ContactItem>
            <ContactItem>
              <Icon>{MailIcon}</Icon>
              {staffData?.email}
            </ContactItem>
          </Contacts>
          <Dropdown>
            <Dropdown.Toggle as={CustomButton}>Quick Actions</Dropdown.Toggle>
            <Dropdown.Menu>
              <QuickItem>
                <QuickIcon>{QaSettingIcon}</QuickIcon>View Settings
              </QuickItem>
              <QuickItem>
                <QuickIcon>{QaEmailIcon}</QuickIcon>Send Actiovation Email
              </QuickItem>
              <QuickItem>
                <QuickIcon>{QaNotificationIcon}</QuickIcon>Notification
                Diagnosis
              </QuickItem>
              <QuickItem>
                <QuickIcon>{QaLogoutIcon}</QuickIcon>Force Logout
              </QuickItem>
              <QuickItem>
                <QuickIcon>{QaInactiveIcon}</QuickIcon>Make Inactive
              </QuickItem>
            </Dropdown.Menu>
          </Dropdown>
          <Button
            marginTop={"20px"}
            justifyContent={"center"}
            onClick={() => setIsAddTaskModalOpen(true)}
          >
            Time Out
          </Button>
          <Contacts marginTop={"20px"} height="auto" padding={"27px 13px"}>
            <Headers>Tasks list</Headers>
            {tasks
              .slice()
              .reverse()
              .slice(0, 2)
              .map((d, i) => (
                <TaskListItem
                  key={i}
                  last={tasks.slice(1).length == i + 1}
                  d={d}
                  defaultChecked={tasks.length == i + 1}
                />
              ))}
            <Button
              width={"100%"}
              marginTop={"15px"}
              justifyContent={"center"}
              onClick={() => setIsAddTaskModalOpen(true)}
            >
              Add Task
            </Button>
            <TaskView onClick={() => setIsTaskListModalOpen(true)}>
              View All Tasks
            </TaskView>
          </Contacts>
          {/* <Contacts height={"201px"} marginTop={"30px"} padding={"0px"}>
            <iframe
              width="100%"
              height="100%"
              id="gmap_canvas"
              src={
                "https://maps.google.com/maps?q=" +
                encodeURIComponent(
                  staffData?.primary_location.split(".")[0].split(" ")[1] +
                    " " +
                    staffData?.primary_location.split(".")[0] +
                    ", " +
                    staffData?.primary_location.split(".")[1].split(",")[0]
                ) +
                "&t=&z=13&ie=UTF8&iwloc=&output=embed"
              }
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
            ></iframe>
          </Contacts> */}
        </SideContainer>
        <Content>
          <NavBar>
            {navItems.map((item, index) => (
              <NavItem
                active={item === activeNavItem}
                onClick={() => setActiveNavItem(item)}
                key={index}
              >
                {item.name}
              </NavItem>
            ))}
          </NavBar>
          <ContentContainer>
            {/* {activeNavItem === navItems[0] && <Messages />} */}
            {activeNavItem === navItems[1] && (
              <Keys
                data={staffData.staffkey_set}
                clientList={clientList}
                serviceList={serviceList}
                id={staffId}
                getData={() => getStaff(staffId)}
                toast={toast}
              />
            )}
            {activeNavItem === navItems[2] && (
              <Services
                data={staffData.staffservice_set}
                clientList={clientList}
                serviceList={serviceList}
                id={staffId}
                getData={() => getStaff(staffId)}
                toast={toast}
              />
            )}
            {activeNavItem === navItems[3] && (
              <Rates data={staffData.staffrate_set} />
            )}
            {activeNavItem === navItems[4] && (
              <Docs
                id={staffId}
                toast={toast}
                getData={() => getStaff(staffId)}
                data={staffData.staffdocument_set}
              />
            )}
            {activeNavItem === navItems[5] && (
              <Activity
                name={staffData.staff_name}
                avatar={staffData.avatar}
                data={staffData.staffactivityfield_set}
                getData={() => getStaff(staffId)}
              />
            )}
            {activeNavItem === navItems[6] && (
              <PayStubs
                id={staffId}
                getData={() => getStaff(staffId)}
                data={staffData.staffpaystub_set}
                toast={toast}
              />
            )}
          </ContentContainer>
          {isModalOpen && (
            <AddNewStaffModal
              show={isModalOpen}
              handleClose={() => setIsModalOpen(false)}
              toast={toast}
              data={staffData}
              staffId={staffId}
              getData={() => getStaff(staffId)}
            />
          )}
        </Content>
      </Container>
      <AddTaskModal
        show={isAddTastModalOpen}
        handleClose={() => setIsAddTaskModalOpen(false)}
        staffList={assignStaffList}
        toast={toast}
        setTasks={setTasks}
      />
      <ViewAllTaskModal
        show={isTaskListModalOpen}
        handleClose={() => setIsTaskListModalOpen(false)}
        data={tasks}
      />
    </>
  )
}

const CustomButton = React.forwardRef(({ children, onClick }, ref) => (
  <Button
    marginTop="20px"
    onClick={e => {
      e.preventDefault()
      onClick(e)
    }}
  >
    {children}
    <Icon2>{ArrowDownIcon}</Icon2>
  </Button>
))

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
      <CheckBoxContainer>
        <CheckBox
          checked={moment(d?.due_date).isSameOrBefore(moment.now())}
          readOnly
          type="checkbox"
        />
      </CheckBoxContainer>
      <TaskContent>
        <TaskTitle>{d.description}</TaskTitle>
        <TaskDetailPanel>
          <TaskDetail>
            {moment(d?.due_date).format("YYYY-MM-DD / LT")} / {d?.client}
          </TaskDetail>
          <TaskStatus
            status={
              moment(d?.due_date).isSameOrBefore(moment.now()) && "completed"
            }
          />
        </TaskDetailPanel>
      </TaskContent>
    </TaskList>
  )
}

export default StaffDetail
