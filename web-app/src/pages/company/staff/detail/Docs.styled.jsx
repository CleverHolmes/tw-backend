import styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";

export const PageContainer = styled.div`

`
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
        border: 1px solid #E7EAEE;
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
        content: "\\e930"
      }
    }
  }

  thead {
    tr {
      border: none !important;

      th {
        background: #fff !important;
        font-size: 12px;
        font-weight: 600;
        padding: 15px 20px 10px 20px !important;
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
        padding: 13px 20px !important;
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
        background: #FAFAFA
      }
    }
  }
`
export const TableButton = styled.button`
  border: 0;
  outline: 0;
  padding: 0;
  margin: 0;
  color: #0496ff;
  background: transparent;
`
export const DocNameTemplate = styled.a`
  font-size: 12px;
  font-weight: 400;
  color: #0496ff;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
`
export const UploadZone = styled.div`
  margin: 20px 0;
  width: 379px;
  height: 32px;
  background: #ffffff;
  border: 1px dashed #cad3dc;
  border-radius: 5px;
  padding-left: 65px;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  display: flex;
  align-items: center;
  letter-spacing: 0.01px;
  color: #8b8698;
  cursor: pointer;
`

export const Browse = styled.div`
  color: #E9BD5A;
  margin-right: 3px;
`;

export const Icon = styled.svg`
  width: ${props => props.width};
  height: ${props => props.height};
  stroke: ${props => props.stroke};
  fill: ${props => props.fill ?? "#fff"};
  margin-right: ${props => props.marginRight};
`

export const StatusTemplate = styled.button`
  padding: 3px 5px;
  background: #FF4545;
  box-shadow: inset 0px -3px 0px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  border: 0;
  outline: 0;
`