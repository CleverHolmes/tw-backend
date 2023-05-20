import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { main_api } from "../api/axios_helper"
import CreateIcon from "../assets/icons/CreateIcon"
import IconButton from "../components/IconButton"
import Table from "../components/Table"
import CloseIcon from "../assets/icons/CloseIcon"

function CustomModal({ isLoading, isModalOpen, setModalOpen, title, children }) {
  return (
    <>
      <ModalContainer visible={isModalOpen}>
        <Modal>
          <ModalHeader>
            <ModalHeaderText>{title}</ModalHeaderText>
            <ModalClose onClick={() => setModalOpen(false)}>
              {CloseIcon}
            </ModalClose>
          </ModalHeader>
          {children}
        </Modal>
      </ModalContainer>
    </>
  )
}

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

export default CustomModal
