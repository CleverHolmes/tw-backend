import moment from "moment";
import React, { useEffect, useState, useRef } from "react";
import parse from "html-react-parser";
import {
  AddUserButton,
  AddUserImg,
  ChatContainer,
  ChatContainerBody,
  ChatContainerHeader,
  ChatPageContainer,
  ChatSideBar,
  CustomSelect,
  Icon,
  DirectAvatar,
  MessageContainer,
  MessageInputContainer,
  MessageTextContainer,
  NormalIcon,
  PinnedContainer,
  PinnedMessageCounter,
  PinnedMessageCounter2,
  SideNavItem,
  TagImage,
  UserAvatar,
  UserAvatarContainer,
  UserCounter,
  UsersContainer,
  MessageDateTitle,
  MessageDateTitleText,
  MessageTextItem,
  MessageAvatar,
  MessageItem,
  MessageHeader,
  MessageTitle,
  MessageDate,
  MessageText,
  FileInputLabel,
} from "./Chat.styled";
import EmojiPicker from "emoji-picker-react";
import { Accordion, Dropdown } from "react-bootstrap";
import TagIcon from "../../../assets/icons/TagIcon";
import ShapIcon from "../../../assets/icons/ShapIcon";
import EmoticonIcon from "../../../assets/icons/EmoticonIcon";
import PinMessageIcon from "../../../assets/icons/PinMessageIcon";
import FileIcon from "../../../assets/icons/FileIcon";
import AddUserIcon from "../../../assets/icons/AddUserIcon";
import UserAvatar1 from "../../../assets/avatar/Ellipse 191.png";
import UserAvatar2 from "../../../assets/avatar/Ellipse 192.png";
import UserAvatar3 from "../../../assets/avatar/Ellipse 193.png";
import UserAvatar4 from "../../../assets/avatar/Ellipse 194.png";
import UserAvatar5 from "../../../assets/avatar/Ellipse 195.png";
import { Fragment } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TagsData = [
  {
    title: "Tags",
    items: ["Pets", "Stafftest", "Product"],
  },
  {
    title: "Staff Support",
    items: ["Staff Support 1", "Staff Support 2", "Staff Support 4"],
  },
  {
    title: "General Client Q&A",
    items: ["Client 1", "Client 2", "Client 3", "Client 4"],
  },
  {
    title: "Service Notes",
    items: [
      "Furgis Holiday",
      "Furgis Holiday",
      "Furgis Holiday",
      "Furgis Holiday",
    ],
  },
  {
    title: "Direct Message",
    items: ["Kledis", "Staff 1 ", "Staff 2", "John Doe"],
  },
];

const userAvatars = [
  {
    id: 1,
    avatar: UserAvatar1,
    name: "Petr Bilek",
  },
  {
    id: 2,
    avatar: UserAvatar2,
    name: "Cody Fisher",
  },
  {
    id: 3,
    avatar: UserAvatar3,
    name: "Kristin Watson",
  },
  {
    id: 4,
    avatar: UserAvatar4,
    name: "Jenny Wilson",
  },
  {
    id: 5,
    avatar: UserAvatar5,
    name: "Brooklyn Simmons",
  },
];

const messageData = [
  {
    userId: 1,
    dateTime: "2022-11-22 04:33 am",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    userId: 5,
    dateTime: "2022-11-23 04:34 am",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    userId: 2,
    dateTime: "2022-11-24 00:58 am",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    userId: 4,
    dateTime: "2022-11-23 04:38 am",
    text: "Amet minim mollit non deserunt @ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    userId: 5,
    dateTime: "2022-11-24 01:38 am",
    text: "Find it here https://docs.google.com/spreadsheets/d",
  },
  {
    userId: 3,
    dateTime: "2022-11-24 02:18 am",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
];

const ChatPage = () => {
  const [data, setData] = useState(messageData);
  const [currentChannel, setCurrentChannel] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [parsedMessage, setParsedMessage] = useState("");
  const editorRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (newMessage.split("<p><br></p>").join("")) {
        if (!e.shiftKey) {
          e.preventDefault();
          setData([
            ...data,
            {
              userId: 1,
              dateTime: moment(new Date()).format("YYYY-MM-DD hh:mm A"),
              text: newMessage.slice(0, newMessage.length - 11),
            },
          ]);
          setNewMessage("");
          setParsedMessage("");
        }
      } else {
        e.preventDefault();
        return;
      }
    }
  };

  const addFile = (fileData) => {
    if (fileData.type.includes("image")) {
      console.log(fileData);
      const reader = new FileReader();
      reader.onload = function (e) {
        console.log(e.target.readAsDataURL);
        editorRef.current
          .getEditor()
          .insertEmbed(null, "image", URL.createObjectURL(fileData));
      };
      reader.readAsDataURL(fileData);
    }
  };
  useEffect(() => {
    console.log(newMessage);
  }, [newMessage]);
  const parseMessage = (text) => {
    return parse(text);
  };

  const handleChangeMessage = (e) => {
    setNewMessage(e);
  };

  const addEmoticon = (emojiData) => {
    if (emojiData.emoji) {
      editorRef.current
        .getEditor()
        .insertEmbed(null, "image", emojiData.getImageUrl());
    } else {
      if (emojiData.includes("Fa")) {
        setNewMessage(
          newMessage +
            '<IconPickerItem icon="FaAdobe" size={24} color="#000" />'
        );
      }
    }
  };

  const modules = {
    toolbar: {
      container: "#toolbar",
    },
  };

  useEffect(() => {
    const arr = [];
    const originData = data.sort(
      (a, b) => new Date(a.dateTime) - new Date(b.dateTime)
    );
    const originDateArr = originData.map((item) =>
      moment(item.dateTime).format("YYYY-MM-DD")
    );
    const dateArr = originDateArr.filter(
      (item, index) => originDateArr.indexOf(item) === index
    );
    dateArr.map((item) => {
      arr.push({
        dateTitle: moment(item).fromNow(true).includes("hour")
          ? "Today"
          : moment(item).fromNow(true) === "a day"
          ? "Yesterday"
          : item,
        messages: originData.filter(
          (message) => moment(message.dateTime).format("YYYY-MM-DD") === item
        ),
      });
    });
    setMessages([...arr]);
  }, [data]);
  return (
    <ChatPageContainer>
      <ChatSideBar>
        <Accordion
          defaultActiveKey={TagsData.map((item, index) => index)}
          alwaysOpen
        >
          {TagsData.map((tag, index) => {
            if (tag.items.length)
              return (
                <Accordion.Item eventKey={index} key={index}>
                  <Accordion.Header>{tag.title}</Accordion.Header>
                  <Accordion.Body>
                    {tag.items.map((item, i) => (
                      <SideNavItem
                        key={i}
                        className={
                          "" +
                          (currentChannel === item + "-" + index + "-" + i &&
                            "active")
                        }
                        onClick={() =>
                          setCurrentChannel(item + "-" + index + "-" + i)
                        }
                      >
                        {tag.title === "Tags" ? (
                          <TagImage>{TagIcon}</TagImage>
                        ) : tag.title === "Direct Message" ? (
                          <DirectAvatar />
                        ) : (
                          <NormalIcon>{ShapIcon}</NormalIcon>
                        )}
                        {item}
                      </SideNavItem>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              );
          })}
        </Accordion>
      </ChatSideBar>
      <ChatContainer>
        <ChatContainerHeader>
          <CustomSelect
            value={currentChannel}
            onChange={(e) => setCurrentChannel(e.target.value)}
          >
            {TagsData.map((tag) => tag.items).map((arr, index) =>
              arr.map((item, i) => (
                <option
                  value={item + "-" + index + "-" + i}
                  key={index + "-" + i}
                >
                  {item}
                </option>
              ))
            )}
          </CustomSelect>
          <UsersContainer>
            <AddUserButton>
              <AddUserImg>{AddUserIcon}</AddUserImg>
            </AddUserButton>
            <UserAvatarContainer>
              {userAvatars.map((user, index) => (
                <UserAvatar src={user.avatar} key={index} alt="user-avatar" />
              ))}
            </UserAvatarContainer>
            <UserCounter>{userAvatars.length}</UserCounter>
          </UsersContainer>
        </ChatContainerHeader>
        <ChatContainerBody>
          <PinnedContainer>
            <PinnedMessageCounter>
              <Icon marginRight={"5px"}>{PinMessageIcon}</Icon>3 Pinned
            </PinnedMessageCounter>
            <PinnedMessageCounter2>
              <Icon marginRight={"2px"}>{PinMessageIcon}</Icon>3
            </PinnedMessageCounter2>
          </PinnedContainer>
          <MessageContainer>
            <MessageTextContainer>
              {messages.map((item, index) => (
                <Fragment key={index}>
                  <MessageDateTitle>
                    <span />
                    <MessageDateTitleText>
                      {item.dateTitle}
                    </MessageDateTitleText>
                    <span />
                  </MessageDateTitle>
                  {item.messages.map((message, i) => {
                    const user = userAvatars.find(
                      (avatar) => avatar.id === message.userId
                    );
                    return (
                      <MessageTextItem key={i}>
                        <MessageAvatar src={user.avatar} alt="user-avatar" />
                        <MessageItem>
                          <MessageHeader>
                            <MessageTitle>{user.name}</MessageTitle>
                            <MessageDate>
                              {moment(message.dateTime).format("h:mm A")}
                            </MessageDate>
                          </MessageHeader>
                          <MessageText>
                            {parseMessage(message.text)}
                          </MessageText>
                        </MessageItem>
                      </MessageTextItem>
                    );
                  })}
                </Fragment>
              ))}
            </MessageTextContainer>
            <MessageInputContainer>
              <ReactQuill
                onChange={handleChangeMessage}
                value={newMessage}
                modules={modules}
                onKeyDown={handleKeyDown}
                className="flex-fill"
                ref={editorRef}
              />
              <CustomToolbar addEmoticon={addEmoticon} addFile={addFile} />
            </MessageInputContainer>
          </MessageContainer>
        </ChatContainerBody>
      </ChatContainer>
    </ChatPageContainer>
  );
};
export default ChatPage;

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <Icon
    width={"20px"}
    height={"20px"}
    cursor={"pointer"}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </Icon>
));

const CustomToolbar = ({ addEmoticon, addFile }) => {
  const [iconLabel, setIconLabel] = useState("");
  return (
    <div id="toolbar" className="d-flex align-items-center">
      <button className="ql-image"></button>
      {/* <FileInputLabel>
      <Icon width="20px" height="20px" cursor="pointer">
        {FileIcon}
      </Icon>
      <input
        type="file"
        className="d-none"
        onChange={(e) => addFile(e.target.files[0])}
      />
    </FileInputLabel> */}
      <Dropdown className="d-flex align-items-center">
        <Dropdown.Toggle as={CustomToggle}>{EmoticonIcon}</Dropdown.Toggle>
        <Dropdown.Menu>
          <EmojiPicker onEmojiClick={addEmoticon} />
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
