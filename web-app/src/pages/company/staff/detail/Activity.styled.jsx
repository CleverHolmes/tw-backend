import Form from "react-bootstrap/Form"
import styled from "styled-components"

export const PageContainer = styled.div``

export const FilterContainer = styled.div`
  margin-top: 40px;
  margin-bottom: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: end;
`
export const TextAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #176177;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  margin-right: 10px;
`
export const ReloadIconContainer = styled.svg`
  width: 24px;
  height: 22px;
  background: #e9bd5a;
  border-radius: 6px;
  padding: 5px 6px;
  fill: #e9bd5a;
  box-sizing: border-box;
  cursor: pointer;
  margin-left: 20px;
`
export const CustomSelect = styled(Form.Select)`
  width: ${props => props.width ?? "100%"};
  margin: ${props => props.margin};
  padding: 0 10px;
  font-size: 12px;
  border: 1px solid #cad3dc;
  border-radius: 5px;
  height: 24px;
  box-shadow: none !important;
`

export const SelectContainer = styled.div``

export const Result = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #000000;
  margin: ${props => props.margin ?? 0};
`
export const ResultContainer = styled.div``
export const ResultItemContainer = styled.div`
  padding: 10px 13px;
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #ffffff;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
`
export const ResultItemLeftContainer = styled.div`
  display: flex;
  align-items: center;
`
export const ResultItemAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: contain;
  margin-right: 10px;
`
export const ResultItemText = styled.p`
  font-size: 12px;
  font-weight: 400;
  margin: ${props => props.margin ?? 0};
  color: ${props => props.color ?? "#000"};
`
