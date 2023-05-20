import moment from "moment";
import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";

const ViewAllTaskModal = ({ show, handleClose, data }) => {
  const closeModal = () => {
    handleClose();
  };

  return (
    <ModalContainer
      show={show}
      onHide={closeModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">All Tasks</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {data.map((d, i) => (
          <TaskListItem
            key={i}
            last={data.slice(1).length === i + 1}
            d={d}
            defaultChecked={data.length === i + 1}
          />
        ))}
      </Modal.Body>
    </ModalContainer>
  );
};

const TaskListItem = ({ last, d }) => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  useEffect(() => {
    let interval = 0;
    if (!moment(d?.due_date).isSameOrBefore(moment.now())) {
      setInterval(() => {
        let diff = moment(d?.due_date).diff(moment.now());
        setTimeRemaining(moment(diff).format("D:LTS").split(" ")?.[0]);
      }, 100);
    }
    return clearInterval(interval);
  }, []);
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
  );
};

const ModalContainer = styled(Modal)`
  /* width: 631px; */

  .modal-dialog {
    max-width: 480px;

    .modal-header {
      padding: 19px 33px;

      .modal-title {
        font-size: 22px;
      }
    }

    .modal-body {
      padding: 20px 30px;
      max-height: calc(90vh - 75px);
      overflow: auto;
    }
  }
`;

const TaskList = styled.label`
  display: flex;
  padding: 10px 0;
  box-sizing: border-box;
  width: 100%;

  &:not(:last-of-type) {
    border-bottom: 1px solid #e4eaf0;
  }
`;
const TaskContent = styled.div`
  margin-top: -3px;
  flex: 1;
`;
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
`;
const TaskDetailPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
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
`;
const TaskStatus = styled.span`
  width: 8px;
  height: 8px;
  background: ${(props) =>
    props.status === "completed" ? "#34D1BF" : "#F17105"};
  border-radius: 50%;
`;
const CheckBoxContainer = styled.div`
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

const CheckBox = styled.input`
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
export default ViewAllTaskModal;
