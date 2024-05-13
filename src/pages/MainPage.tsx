import React, {useState, useTransition} from 'react';
import styled from "styled-components";
import SelectList from "./SelectList";
import {SecondPage} from "./SecondPage";

export const MainPage = () => {



    return (
        <MainWrapper>

            <SelectList/>
           <SecondPage/>

        </MainWrapper>
    );
};


const StyledTextArea = styled.textarea `
  min-height: 400px;
  min-width: 400px;
  font-size: 15px
`

const MainWrapper = styled.main `
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vw;

`
