import React from 'react';
import styled from "styled-components";

const Header = () => {
    return (
        <StyledHeader>
            <p> Geoscope </p>
        </StyledHeader>
    );
};


const StyledHeader = styled.header `
  background-color: rgb(52, 108, 176);
  color: white;
  min-height: 40px;
  min-width: 100vw;
  p {
    font-size: 25px;
    font-weight: bolder;
    margin-left: 90px;
  }
`
export default Header;
