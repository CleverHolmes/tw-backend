import styled from "styled-components";
import Form from "react-bootstrap/Form";

export const ChatPageContainer = styled.div`
  display: flex;
  height: 100%;
`;

export const ChatSideBar = styled.div`
  width: 243px;
  height: 100%;
  border-right: 1px solid #e4eaf0;
  padding: 37px 16px;
  .accordion {
    .accordion-item {
      border-radius: 0;
      border: 0;
      margin-bottom: 14px;
      .accordion-header {
        margin-bottom: 18px;
        button {
          background: transparent;
          color: #000;
          box-shadow: none;
          padding: 0;
          font-size: 15px;
          font-weight: 600;
          &:not(.collapsed)::after {
            background-image: var(--bs-accordion-btn-icon);
          }
        }
      }
      .accordion-body {
        padding: 0;
      }
    }
  }
`;
export const SideNavItem = styled.button`
  border: 0;
  outline: 0;
  padding: 0;
  background: #fff;
  width: 100%;
  padding: 10px 5px;
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 500;
  &.active {
    background: #1565d8;
    color: #fff;
    path {
      fill: #fff;
      stroke: #fff;
    }
  }
`;

export const TagImage = styled.svg`
  width: 13.52px;
  height: 16px;
  fill: #fff;
  margin-right: 16px;
`;

export const NormalIcon = styled.svg`
  width: 18px;
  height: 18px;
  fill: #fff;
  margin-right: 17.5px;
`;

export const DirectAvatar = styled.div`
  width: 24px;
  height: 24px;
  background: #000000;
  border-radius: 8px;
  margin-right: 12px;
`;

export const ChatContainer = styled.div`
  flex: 1;
`;

export const ChatContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 26px 24px 22px 24px;
  border-bottom: 1px solid #e4eaf0;
`;

export const CustomSelect = styled.select`
  font-size: 24px;
  font-weight: 600;
  border: 0 !important;
  outline: 0 !important;
`;

export const UsersContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const AddUserButton = styled.button`
  background: #1565d8;
  padding: 0;
  outline: 0;
  border: 0;
  width: 30px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-right: 5px;
`;

export const AddUserImg = styled.svg`
  width: 18px;
  height: 14px;
  fill: transparent;
`;

export const UserAvatarContainer = styled.div`
  display: flex;
  margin-right: 5px;
`;
export const UserAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  &:not(:first-child) {
    margin-left: -15px;
  }
`;

export const UserCounter = styled.p`
  color: rgba(27, 27, 27, 0.75);
  font-weight: 600;
  font-size: 25px;
  margin-bottom: 0;
`;

export const ChatContainerBody = styled.div`
  position: relative;
  height: calc(100% - 86.5px);
`;

export const PinnedContainer = styled.div`
  position: absolute;
  top: 3px;
  left: 10px;
  display: flex;
  align-items: center;
`;

export const PinnedMessageCounter = styled.div`
  padding: 2px 5px;
  background: #ececec;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 400;
  color: #7a7a7a;
  display: flex;
  align-items: center;
`;

export const Icon = styled.svg`
  width: ${(props) => props.width ?? "15px"};
  height: ${(props) => props.height ?? "15px"};
  fill: transparent;
  margin-right: ${(props) => props.marginRight};
  cursor: ${(props) => props.cursor};
`;

export const PinnedMessageCounter2 = styled.div`
  background: #ececec;
  font-size: 12px;
  font-weight: 400;
  color: #7a7a7a;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 14px;
`;

export const MessageContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 80px 30px;
`;

export const MessageTextContainer = styled.div`
  min-height: calc(100% - 80px);
  max-height: calc(100vh - 80px);
  overflow-y: auto;
  padding: 50px 10px 30px 10px;
`;

export const MessageDateTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  align-items: center;
  span {
    flex: 1;
    display: block;
    height: 1px;
    background-color: #1565d8;
  }
`;
export const MessageDateTitleText = styled.p`
  font-weight: 600;
  font-size: 12px;
  color: #1565d8;
  margin: 0 18px;
`;

export const MessageTextItem = styled.div`
  display: flex;
  margin-bottom: 38px;
`;

export const MessageAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 16px;
`;

export const MessageItem = styled.div`
  min-width: 300px;
  padding: 17px 16px 16px;
  background-color: rgba(27, 27, 27, 0.03);
  border-radius: 8px;
`;

export const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const MessageTitle = styled.h5`
  font-weight: 600;
  font-size: 15px;
  color: #1b1b1b;
  margin: 0;
  margin-right: 8px;
`;

export const MessageDate = styled.h6`
  font-weight: 400;
  font-size: 16px;
  color: rgba(27, 27, 27, 0.5);
  margin: 0;
`;

export const MessageText = styled.p`
  font-weight: 400;
  font-size: 15px;
  letter-spacing: 0.25px;
  color: rgba(27, 27, 27, 0.75);
  margin: 0;
  a {
    color: #0496ff;
    text-decoration: none;
  }
  p {
    margin-bottom: 0;
    img {
      width: 300px;
      height: 300px;
      display: block;
      margin-bottom: 10px;
      &[src*='https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img']
      {
        width: 30px;
        height: 30px;
        margin-bottom: 0px;
        display: inline;
      }
    }
  }
`;

export const MessageInputContainer = styled.label`
  height: 80px;
  display: flex;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(27, 27, 27, 0.25);
  padding: 16px 16px 5px 16px;
  .quill {
    .ql-container {
      border: 0;
    }
  }
  #toolbar {
    border: 0;
    padding: 8px 12px;
    height: 36px;
    background: rgba(27, 27, 27, 0.03);
    border-radius: 8px;
    & > button {
      padding: 0;
      height: 20px;
      width: 20px;
      &:not(:last-child) {
        margin-right: 10px;
      }
    }
    .EmojiPickerReact {
      .epr-body {
        button {
          width: auto;
          height: auto;
        }
      }
    }
  }
  p {
    img[src*='https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img']
    {
      width: 20px;
      height: 20px;
      display: inline;
    }
    img {
      width: 100px;
      height: 100px;
      display: block;
    }
  }
`;

export const MessageInputLabel = styled.label`
  height: 100%;
  display: block;
  flex: 1;
  resize: none;
  overflow-y: auto;
  font-size: 15px;
  font-weight: 400;
  /* position: relative; */
  /* z-index: 2; */
  a {
    color: #0496ff;
    text-decoration: none;
  }
`;
export const MessageInputTextArea = styled.textarea`
  border: 0;
  outline: 0;
  height: calc(100% - 10px);
  width: 100%;
  /* margin-right: 32px; */
  /* overflow-y: auto; */
  resize: none;
  font-size: 15px;
  font-weight: 400;
  /* color: transparent; */
  /* caret-color: #000; */
  /* position: absolute; */
  background: transparent;
  /* top: 0;
  left: 0;
  z-index: 1; */
  /* .upload-file {
    position: relative;
    z-index: 3;
  } */
`;

export const MessageInputButtonPanel = styled.div`
  width: 184px;
  height: 36px;
  padding: 8px 12px;
  background: rgba(27, 27, 27, 0.03);
  border-radius: 8px;
  display: flex;
  align-items: center;
`;

export const FileInputLabel = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 10px;
`;
