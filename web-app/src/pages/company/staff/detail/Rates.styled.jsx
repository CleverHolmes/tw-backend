import styled from "styled-components"
import Form from "react-bootstrap/Form"

export const PageContainer = styled.div``
export const TableContainer = styled.div`
  border: none;

  .p-datatable-wrapper {
    overflow: hidden;
  }

  .p-datatable-header {
    border: none;

    .p-input-icon-left {
      input {
        padding: 7px 15px 7px 35px;
        border: 1px solid #e7eaee;
        border-radius: 4px;
        width: 425px;
        box-shadow: none !important;
      }
    }
  }

  .p-column-header-content {
    justify-content: space-between;

    .pi-sort-alt {
      &:before {
        content: "\\e930";
      }
    }

    .pi-sort-amount-up-alt {
      &:before {
        content: "\\e933";
      }
    }

    .pi-sort-amount-down {
      &:before {
        content: "\\e930";
      }
    }
  }

  thead {
    tr {
      border: none !important;

      th {
        background: #fff !important;
        font-size: 12px;
        font-weight: 400 !important;
        padding: 10px 20px !important;
        max-width: 88px;
        color: #000 !important;

        &:first-child {
          padding-left: 43px !important;
        }
      }
    }
  }

  .p-datatable-tbody {
    tr {
      td {
        padding: 7px 20px !important;
        font-size: 12px;
        font-weight: 400;
        color: #000;
        border: 0;

        p {
          margin-bottom: 0;
        }

        &:first-child {
          padding-left: 43px !important;
        }

        &:last-child {
          padding-right: 43px !important;
        }
      }

      &.p-row-odd {
        background: #fafafa;
      }
    }
  }
`
export const CustomFilter = styled(Form.Select)`
  width: 176px;
  height: 40px;
  padding: 7px 15px;
  font-size: 16px;
  color: #8b8698;
  font-weight: 600;
  border: 0;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: none !important;
`
export const TableButton = styled.button`
  border: 0;
  outline: 0;
  padding: 0;
  margin: 0;
  color: #0496ff;
  background: transparent;
`
export const CustomSelect = styled(Form.Select)`
  width: ${props => props.width ?? "94px"};
  padding: 5px 15px;
  font-size: 12px;
  border: 1px solid #cad3dc;
  border-radius: 5px;
  height: 29px;
  box-shadow: none !important;
`
