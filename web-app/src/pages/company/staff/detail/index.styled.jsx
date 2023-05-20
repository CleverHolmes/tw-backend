import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;
export const SideContainer = styled.div`
  width: 324px;
  /* min-height: 897px; */
  background: #ffffff;
  border: 1px solid #e4eaf0;
  box-shadow: 0px 1px 8px rgba(110, 110, 110, 0.1);
  border-radius: 16px;
  padding: 17px 42px 71px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  .dropdown-menu {
    width: 22px;
    width: 226px;
    left: 50%;
    transform: translateX(-50%);
    top: 50px;
  }
`;
export const AvatarContainer = styled.div`
  width: 80px;
  height: 80px;
  position: relative;
  margin-bottom: 10px;
`;
export const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
`;
export const TextAvatar = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #176177;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: 700;
  color: #fff;
`;
export const AvatarEditButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  border: 0;
  outline: 0;
`;
export const StaffStatusContainer = styled.div`
  margin-top: 13px;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    margin-top: 0;
  }
`;
export const Contacts = styled.div`
  position: relative;
  width: 240px;
  height: ${(props) => props.height ?? "238px"};
  margin-top: ${(props) => props.marginTop ?? "0"};
  background: #ffffff;
  box-shadow: 0px 1px 8px rgba(110, 110, 110, 0.1);
  border-radius: 16px;
  padding: ${(props) => props.padding ?? "13px 21px"};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const ContactItem = styled.span`
  width: 100%;
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 1.21205px;
  color: #000000;
  overflow: hidden;
  word-break: break-all;
  .text-capitalize {
    text-transform: capitalize;
  }
  &:not(:first-child) {
    margin-top: 16px;
  }
`;
export const Headers = styled.h3`
  font-weight: 700;
  font-size: ${(props) => props.size ?? "20px"};
  letter-spacing: 0.01px;
  text-transform: capitalize;
  color: #414d55;
  text-align: center;
  margin: 0;
`;

export const QuickAction = styled.div`
  width: 226px;
  height: 235px;
  background: #ffffff;
  border: 1px solid #e4eaf0;
  border-radius: 6px;
  z-index: 999;
  padding: 9px;
  box-sizing: border-box;
`;

export const QuickItem = styled.span`
  width: 100%;
  height: 16px;
  margin-top: 5px;
  padding: 0 22px;
  display: flex;
  align-items: center;
  border-bottom: ${(props) => props.borderBottom ?? "none"};
  cursor: pointer;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #000000;
`;

export const TaskView = styled.p`
  margin: 0;
  margin-top: 10px;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.25px;
  color: #0496ff;
  cursor: pointer;
`;

export const QuickIcon = styled.svg`
  width: 18px;
  height: 14px;
  stroke: #000000;
  fill: #fff;
  margin-right: 10px;
`;

export const Content = styled.div`
  margin-left: 22px;
  flex: 1;
`;

export const TopCard = styled.div`
  display: flex;
  width: 788px;
  height: 156px;
  background: #ffffff;
`;
export const Icon = styled.svg`
  min-width: 32px;
  width: 32px;
  height: 20px;
  stroke: #e9bd5a;
  fill: #fff;
`;
export const Icon2 = styled.svg`
  width: 14.73px;
  height: 10px;
  fill: #e9bd5a;
  stroke: #fff;
  margin-left: 10px;
`;
export const Button = styled.button`
  margin-top: ${(props) => props.marginTop ?? "15px"};
  margin-left: ${(props) => props.marginLeft};
  display: ${(props) => props.display ?? "flex"};
  align-items: center;
  justify-content: ${(props) => props.justifyContent};
  padding: ${(props) => props.padding ?? "6px 14px"};
  height: ${(props) => props.height ?? "28px"};
  width: ${(props) => props.width};
  background: ${(props) => props.bg ?? "#e9bd5a"};
  border-radius: ${(props) => props.round ?? "6px"};
  border: none;
  cursor: pointer;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #ffffff;
  box-shadow: ${(props) =>
    props.shadow && "inset 0px -3px 0px rgba(0, 0, 0, 0.1)"};
`;
export const TaskList = styled.label`
  display: flex;
  padding: 10px 0;
  box-sizing: border-box;
  width: 100%;

  &:not(:last-of-type) {
    border-bottom: 1px solid #e4eaf0;
  }
`;
export const TaskContent = styled.div`
  margin-top: -3px;
  flex: 1;
`;
export const TaskTitle = styled.p`
  margin: 0;
  height: 22px;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #727677;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const TaskDetailPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const TaskDetail = styled.p`
  margin: 0;
  height: 20px;
  font-weight: 400;
  font-size: 10px;
  line-height: 20px;
  letter-spacing: 0.416667px;
  text-transform: uppercase;
  color: #696d6e;
  overflow: hidden;
`;
export const TaskStatus = styled.span`
  width: 8px;
  height: 8px;
  background: ${(props) =>
    props.status === "completed" ? "#34D1BF" : "#F17105"};
  border-radius: 50%;
`;
export const ModalContainer = styled.div`
  position: absolute;
  display: ${(props) => (props.visible ? "flex" : "none")};
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  padding: 40px 0;
  background: rgba(229, 236, 239, 0.4);
  backdrop-filter: blur(1.5px);
  align-items: center;
  justify-content: center;
`;

export const Modal = styled.div`
  padding: 30px;
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
`;
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ModalHeaderText = styled.span`
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  letter-spacing: 0.01px;
  color: #414d55;
`;

export const CheckBoxContainer = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #a2c4d4;
  margin-right: 19px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CheckBox = styled.input`
  height: 12px;
  width: 12px;
  border-radius: 2px;
  margin: 6px;
  appearance: none;
  margin: 0px;
  &:checked {
    background-color: #e9bd5a;
  }
`;
export const ModalClose = styled.svg`
  width: 30px;
  height: 30px;
  cursor: pointer;
  stroke: #414d55;
`;

export const Action = styled.button`
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
`;
export const NavBar = styled.div`
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
`;
export const NavItem = styled.button`
  padding: 9px 8px;
  height: 37px;
  background: ${(props) =>
    props.active ? "rgba(233, 189, 90, 0.2)" : "transparent"};
  border-radius: 6px;
  border: none;
  cursor: pointer;

  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: ${(props) => (props.active ? "#e9bd5a" : "#000")};

  &:hover {
    background: lightblue;
  }
`;
export const Tag = styled.span`
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
`;

export const ContentContainer = styled.div`
  width: 100%;
  background: #ffffff;
  box-sizing: border-box;
`;
