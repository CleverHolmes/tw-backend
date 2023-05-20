import { convertToRaw, EditorState } from "draft-js"
import draftToHtml from "draftjs-to-html"
import parse from "html-react-parser"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import styled from "styled-components"
import { main_api } from "../../../../api/axios_helper"
import CustomInput from "../../../../components/CustomInput"

import { usePubNub } from "pubnub-react"
import { useParams } from "react-router-dom"

const conversationConstant = "CONVO123"

function Conversations() {
  const [isLoading, setIsloading] = useState(false)
  const { clientId } = useParams()

  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [sentMessageBuffer, setSentMessageBuffer] = useState(false)

  const [messages, setMessages] = useState([])
  const [currentMessage, setCurrentMessage] = useState("")

  useEffect(() => {
    if (sentMessageBuffer) setSentMessageBuffer(false)
  }, [sentMessageBuffer])

  const GetPets = () => {
    setIsloading(true)
    main_api
      .get("/api/v1/client_pet/")
      .then(({ data }) => {
        setMessages(data)
        setIsloading(false)
      })
      .catch(error => {
        console.log(error?.response?.data)
        setIsloading(false)
      })
  }

  const onEditorStateChange = editorState => {
    setCurrentMessage(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    )
    setEditorState(editorState)
  }

  useEffect(() => {
    // GetPets()
  }, [])

  //PubNub
  const pubnub = usePubNub()
  const [channels] = useState([`${conversationConstant}${clientId}`])
  const [message, setMessage] = useState("")

  useEffect(() => {
    pubnub
      .fetchMessages({ channels })
      .then(data => {
        console.log("sdsdsd", data.channels[channels[0]])
        setMessages(data.channels[channels[0]] ?? [])
      })
      .catch(d => console.log(d))
  }, [])

  const handleMessage = event => {
    const message = event.message

    setMessages(messages => [...messages, { message: message }])
    return
    if (typeof message === "string" || message.hasOwnProperty("text")) {
      const text = message.text || message
      setMessages(messages => [...messages, text])
    }
  }
  useEffect(() => {
    pubnub.addListener({ message: handleMessage })
    pubnub.subscribe({ channels })
  }, [pubnub, channels])

  const sendMessage = message => {
    if (message) {
      pubnub
        .publish({
          channel: channels[0],
          message: { text: message, user: "admin" }
        })
        .then(() => setMessage(""))
    }
  }

  return (
    <>
      <ActionButtons>
        <CustomInput
          type="select"
          placeholder=""
          options={[{ value: 1, label: "Date" }]}
          value={{ value: 1, label: "Date" }}
          vertical={false}
          border={"1px solid #E4EAF0"}
          // onChange={selected_staff_number}
        />
        <CustomInput
          type="select"
          placeholder=""
          options={[{ value: 1, label: "All Messages" }]}
          value={{ value: 1, label: "All Messages" }}
          vertical={false}
          border={"1px solid #E4EAF0"}
          // onChange={selected_staff_number}
        />
        <CustomInput
          type="select"
          placeholder=""
          options={[{ value: 1, label: "Newest First" }]}
          value={{ value: 1, label: "Newest First" }}
          vertical={false}
          border={"1px solid #E4EAF0"}
          // onChange={selected_staff_number}
        />
        <CustomInput
          type="select"
          placeholder=""
          options={[{ value: 1, label: "Client Staff & Admin" }]}
          value={{ value: 1, label: "Client Staff & Admin" }}
          vertical={false}
          border={"1px solid #E4EAF0"}
          // onChange={selected_staff_number}
        />
        <CustomInput
          type="select"
          placeholder=""
          options={[{ value: 1, label: "All Staff" }]}
          value={{ value: 1, label: "All Staff" }}
          vertical={false}
          border={"1px solid #E4EAF0"}
          // onChange={selected_staff_number}
        />
        <Button>Search</Button>
      </ActionButtons>
      <ChatContainer>
        {messages.map((message, index) => (
          <ChatItem client={message?.client}>
            <TopOfChat>
              <TextTitle>
                {message?.message?.text?.name}
                <TextTitle2>
                  {moment(parseInt(message?.message?.text?.created_at)).format(
                    "MMMM DD, YYYY h:mm a"
                  )}
                </TextTitle2>
              </TextTitle>
              <TextAction>Add Task</TextAction>
            </TopOfChat>
            <ChatTag>Staff Test</ChatTag>
            <ChatMessage>
              {parse(message?.message?.text?.message ?? "")}
            </ChatMessage>
          </ChatItem>
        ))}
      </ChatContainer>
      {!sentMessageBuffer && (
        <Editor
          // editorState={editorState}
          toolbarClassName="toolbarClassName2"
          wrapperClassName="wrapperClassName2"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
          initialEditorState={editorState}
          handleReturn={e => {
            if (!e?.shiftKey) {
              sendMessage({
                name: "Admin",
                created_at: moment.now(),
                message: currentMessage
              })
              // setMessages(m =>
              //   m.concat({
              //     name: "Admin",
              //     created_at: moment.now(),
              //     message: currentMessage
              //   })
              // )
              setCurrentMessage("")
              setEditorState(EditorState.createEmpty())
              setSentMessageBuffer(true)
            }
          }}
          toolbar={{
            options: ["inline", "image", "list"],
            inline: {
              inDropdown: false,
              options: ["bold", "italic", "underline", "strikethrough"]
            },
            list: {
              inDropdown: false,
              options: ["unordered", "ordered"]
            },
            image: {
              uploadEnabled: true,
              inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg"
            }
          }}
        />
      )}
    </>
  )
}
const ActionButtons = styled.div`
  display: flex;
  margin-bottom: 27px;
  width: 800px;
  justify-content: center;
`

const Button = styled.button`
  width: 73px;
  height: 31px;
  background: #ffffff;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  border: none;
  margin-top: 25px;
  margin-left: 20px;
  cursor: pointer;

  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  /* identical to box height */

  display: flex;
  align-items: center;
  text-align: center;
  color: #e9bd5a;
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
const ChatContainer = styled.div`
  padding: 20px;
  box-sizing: border-box;
  height: 400px;
  overflow-y: auto;
`
const ChatItem = styled.div`
  width: 619.96px;
  min-height: 128px;
  background: ${props => (props.client ? "#ffffff" : "#EDF4FC")};
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  margin-bottom: 20px;
  margin-left: ${props => (props.client ? "none" : "auto")};
  padding: 17px;
  box-sizing: border-box;
`

const TopOfChat = styled.div`
  display: flex;
  justify-content: space-between;
`

const TextTitle = styled.span`
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  color: #1b1b1b;
`
const TextTitle2 = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #1b1b1b80;
  margin-left: 8px;
`

const TextAction = styled.span`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: #e9bd5a;
  cursor: pointer;
  margin-right: 100px;
`
const ChatTag = styled.div`
  background: #fb8500;
  border-radius: 2px;
  width: 56px;
  height: 15px;
  margin-top: 6px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 400;
  font-size: 8px;
  line-height: 11px;
  color: #000000;
`

const ChatMessage = styled.div`
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: 0.25px;
  color: rgba(27, 27, 27, 0.75);
  background: transparent;
  border: none;
`

export default Conversations
