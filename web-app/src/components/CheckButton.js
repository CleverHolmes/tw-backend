import React from "react"
import styled from "styled-components"

function CheckButton({ checked }) {
  return (
    <CheckBoxContainer>
      <CheckBox checked={checked} type="checkbox" />
    </CheckBoxContainer>
  )
}

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
`

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
`

export default CheckButton
