import moment from "moment"
import React, { useCallback, useEffect, useState, useMemo } from "react"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import {
  ActionButtons,
  Button,
  ChatContainer,
  ChatItem,
  ChatMessage,
  ChatTag,
  CustomSelect,
  TextAction,
  TextTitle,
  TextTitle2,
  TopOfChat,
  RichTextPanel
} from "./Messages.styled"
import RichText, { Element, Leaf } from "../../../../components/RichText"
import { Editable, withReact, Slate } from "slate-react"
import { createEditor, Element as SlateElement } from "slate"
import { withHistory } from "slate-history"

const selectData = [
  ["Date"],
  ["All Messages"],
  ["Newest First"],
  ["Client Staff & Admin"],
  ["All Staff"]
]

const Messages = () => {
  const [sentMessageBuffer, setSentMessageBuffer] = useState(true)
  const [messages, setMessages] = useState([])
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  useEffect(() => {
    if (!sentMessageBuffer) setSentMessageBuffer(true)
  }, [sentMessageBuffer])

  const sendMessage = message => {
    console.log(messages, message)
    setMessages([...messages, message])
    setSentMessageBuffer(false)
  }

  return (
    <>
      <ActionButtons>
        {selectData.map((select, index) => (
          <CustomSelect key={index}>
            {select.map((item, i) => (
              <option value={item} key={i}>
                {item}
              </option>
            ))}
          </CustomSelect>
        ))}
        <Button>Search</Button>
      </ActionButtons>
      <ChatContainer>
        {messages.map((message, index) => (
          <ChatItem client={message?.client} key={index}>
            <TopOfChat>
              <TextTitle>
                {message.name}
                <TextTitle2>
                  {moment(parseInt(message.created_at)).format(
                    "MMMM DD, YYYY h:mm a"
                  )}
                </TextTitle2>
              </TextTitle>
              {/* <TextAction>Add Task</TextAction> */}
            </TopOfChat>
            <ChatTag>Staff Test</ChatTag>
            <ChatMessage>
              <Slate
                editor={withHistory(withReact(createEditor()))}
                value={message.message}
              >
                <Editable
                  renderElement={props => <Element {...props} />}
                  renderLeaf={props => <Leaf {...props} />}
                  readOnly={true}
                />
              </Slate>
            </ChatMessage>
          </ChatItem>
        ))}
      </ChatContainer>
      <RichTextPanel>
        {sentMessageBuffer && <RichText sendMessage={sendMessage} />}
      </RichTextPanel>
    </>
  )
}
export default Messages
