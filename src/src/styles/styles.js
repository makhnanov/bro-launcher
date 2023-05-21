import styled, { css } from "styled-components";

export const ContextMenu = styled.div`
  position: absolute;
  width: 120px;
  background-color: #383838;
  border-radius: 5px;
  box-sizing: border-box;
  ${({top, left}) => css`
    top: ${top}px;
    left: ${left}px;
  `}
  border-radius: 0 25px 25px 25px;
  box-shadow: 10px 10px 17px -12px #FFF;
  border: 1px solid #000;

  ul {
    box-sizing: border-box;
    padding: 3px;
    margin: 0;
    list-style: none;
    text-align: left;
  }

  ul li {
    padding: 7px 12px;
    background-color: #222;
    margin: 2px;
  }

  /* hover */

  ul li {
    border: 1px solid #000;
  }

  ul li:hover {
    cursor: pointer;
    background-color: #000000;
  }

  ul li:first-of-type {
    border-top-right-radius: 19px;
  }

  ul li:last-of-type {
    border-bottom-left-radius: 19px;
    border-bottom-right-radius: 19px;
    text-align: right;
  }
`;


