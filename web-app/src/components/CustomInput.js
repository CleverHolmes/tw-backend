import React from "react"
import styled from "styled-components"
import Select from "react-select"

const CustomInput = ({
  label,
  placeholder,
  type,
  options = [],
  onChange = () => null,
  value,
  border,
  name,
  vertical = true,
  width = "100%",
  height,
  margin,
  padding,
  readOnly,
  selectWidth,
  labelWeight,
  labelColor,
  selectHeight,
  labelSize,
  labelMargin,
  required
}) => {
  const customStyles = {
    control: base => ({
      ...base,
      height: (selectHeight ?? 40),
      minHeight: (selectHeight ?? 40),
      border: border
    })
  };
  return (
    <InputContainer margin={margin} height={height} vertical={vertical}>
      {label && <Label labelWeight={labelWeight} labelSize={labelSize} color={labelColor} vertical={vertical} margin={labelMargin}>{label}</Label>}
      {type === "select" ? (
        <SELECT
          border={border}
          vertical={vertical}
          name={name}
          value={
            options.includes(value)
              ? value
              : options?.filter(x => x.name === value)?.[0] ?? value
          }
          onChange={value => onChange(value)}
          options={options}
          placeholder={placeholder}
          isDisabled={readOnly}
          width={selectWidth}
          styles={customStyles}
        />
      ) : type === "grouped-radio" ? (
        <RadioGroup name={name}>
          {options.map((option, i) => (
            <RadioItem key={i} onClick={() => onChange(i)}>
              <RadioTextGroup>
                <RadioImage active={value === i} />
                <RadioText>{option?.label}</RadioText>
              </RadioTextGroup>
            </RadioItem>
          ))}
        </RadioGroup>
      ) : (
        <Input
          margin={margin}
          padding={padding}
          name={name}
          height={height}
          border={border}
          onChange={e => onChange(e.target.value)}
          value={value}
          required={required}
          placeholder={placeholder}
          type={type ?? "text"}
          width={width}
          readOnly={readOnly}
        />
      )}
    </InputContainer>
  )
}

const InputContainer = styled.div`
  height: ${props => (props?.height ? props?.height : "83px")};
  width: 100%;
  display: ${props => (props.vertical ? "block" : "flex")};
  align-items: ${props => (props.vertical ? "unset" : "center")};
  justify-content: ${props => (props.vertical ? "unset" : "start")};
  margin: ${props => props.margin ?? "0px"};
`

const Input = styled.input`
  width: ${props => props?.width};
  height: ${props => (props?.height ? props?.height : "41px")};
  border: ${props => props.border ?? "1px solid #120b27"};
  border-radius: 5px;
  margin: ${props => props?.margin ?? "0"};
  padding: ${props => props?.padding ?? " 0px 35px"};
  box-sizing: border-box;
  outline: none;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  color: #000;
`

const Label = styled.label`
  height: 20px;
  font-weight: 400;
  font-size:  ${props => props.labelSize ?? '15px'};
  line-height: 20px;
  text-align: flex-end;
  display: ${props => props.vertical && 'block'};
  font-weight: ${props => props.labelWeight};
  letter-spacing: -0.136219px;
  color: ${props => props.color ?? "#000000"}; 
  margin-left: 11px;
  margin-right: 5px;
  margin: ${props => props.margin};
`

const SELECT = styled(Select)`
  border: ${props => !props.border && "1px solid #120b27"};
  margin-top: ${props => (props.vertical ? "8px" : "0")};
  color: #8b8698;
  border-radius: 5px;
  width: ${props => props.width && props.width}
`

const RadioGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  width: 252px;
`

const RadioItem = styled.div`
  width: 110px;
  // height: 55px;
  height: 38px;
  background: #ffffff;
  border: 1px solid #120b27;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const RadioTextGroup = styled.div`
  width: 55px;
  height: 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const RadioImage = styled.div`
  width: 21px;
  height: 21px;
  background: ${props => (props?.active ? "#e9bd5a" : "#ffffff")};
  border: 1px solid #e9bd5a;
  border-radius: 100%;
`

const RadioText = styled.div`
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.136219px;
  color: #000000;
`

export default CustomInput
