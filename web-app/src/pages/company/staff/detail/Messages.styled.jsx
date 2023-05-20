import styled from "styled-components";
import Form from "react-bootstrap/Form";

export const ActionButtons = styled.div`
  display: flex;
  margin-bottom: 27px;
  width: 100%;
  justify-content: center;
  height: 66px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 8px 0;
  align-items: center;
`;
export const CustomSelect = styled(Form.Select)`
  border-radius: 0;
  border: 0;
  font-size: 14px;
  line-height: 19px;
  font-weight: 600;
  word-break: break-word;
  padding-bottom: 3px;
  padding-top: 3px;
  box-shadow: none !important;
  &:first-of-type {
    width: 90px;
  }
  &:not(:last-of-type) {
    border-right: 2px solid #d0d5dd;
  }
`;
export const Button = styled.button`
  padding: 6px 14px;
  background: #ffffff;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  border: none;
  margin-left: 20px;
  margin-right: 5px;
  cursor: pointer;
  font-weight: 400;
  font-size: 18px;
  color: #e9bd5a;
`;
export const ActionButton = styled.button`
  background-color: #e9bd5a;
  padding: 6px 14px;
  height: 28px;
  border-radius: 4px;
  border: none;
  margin-left: ${(props) => props.marginLeft ?? "0"};
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
`;
export const ChatContainer = styled.div`
  padding: 20px;
  box-sizing: border-box;
  height: 610px;
  overflow-y: auto;
`;
export const ChatItem = styled.div`
  width: 500px;
  min-height: 128px;
  background: ${(props) => (props.client ? "#ffffff" : "#EDF4FC")};
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  margin-bottom: 20px;
  margin-left: ${(props) => (props.client ? "none" : "auto")};
  padding: 17px;
  box-sizing: border-box;
`;
export const TopOfChat = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const TextTitle = styled.span`
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  color: #1b1b1b;
`;
export const TextTitle2 = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #1b1b1b80;
  margin-left: 8px;
`;
export const TextAction = styled.span`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: #e9bd5a;
  cursor: pointer;
  margin-right: 100px;
`;
export const ChatTag = styled.div`
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
`;
export const ChatMessage = styled.div`
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: 0.25px;
  color: rgba(27, 27, 27, 0.75);
  background: transparent;
  border: none;
`;

export const RichTextPanel = styled.div`
  & > div:first-child {
    margin: 0;
    padding: 10px 16px;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    background: #ffffff;
    border-bottom: 0;
  }
  & > div:last-child {
    height: 80px;
    padding: 10px 16px;
    font-size: 15px;
    font-weight: 400;
    background: #ffffff;
    border: 1px solid rgba(27, 27, 27, 0.25);
    box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    overflow-y: auto;
    overflow-x: hidden;
    word-break: break-all;
  }
`;
