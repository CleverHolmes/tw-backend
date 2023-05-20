import styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";
import { Form } from "react-bootstrap";

export const PageContainer = styled.div``;
export const TableContainer = styled.div`
  border: none;

  .p-datatable-wrapper {
    overflow: unset;
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
        padding: 17px 20px !important;
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
`;
export const TableButton = styled.button`
  border: 0;
  outline: 0;
  padding: 0;
  margin: 0;
  color: #0496ff;
  background: transparent;
`;
export const DateTemplate = styled.div`
  display: flex;
  align-items: center;
`;
export const CalendarIcon = styled.img`
  width: 11px;
  height: 12px;
  object-fit: contain;
  margin-left: 10px;
`;
export const DropdownButton = styled(Dropdown)`
  #dropdown-basic {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3px 10px;
    width: 99px;
    font-size: 12px;
    line-height: 1;
    border-radius: 2px;
    background: ${(props) => props.bg};
    border: 0;
    text-transform: capitalize;
    &:after {
      margin-left: 10px;
      border-top: 7px solid;
      border-right: 4px solid transparent;
      border-bottom: 0;
      border-left: 4px solid transparent;
    }
  }
`;
