import React from 'react';
import styled from "styled-components";
import Header from "./Header";

const Footer = () => {
    return (
        <StyledFooter>
            <p>Выполнил Дондоков Г.Б., группа Б20-603.</p>
        </StyledFooter>
    );
};
const StyledFooter = styled.footer `
  background-color: rgb(52, 108, 176);
  color: white;
  min-height: 50px;
  min-width: 100vw;
  margin-top: 30px;
  text-align: center;

  p {
    font-size: 20px;
    font-weight: bolder;
    
  }
`

export default Footer;
