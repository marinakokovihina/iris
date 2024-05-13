import React from 'react';
import styled from "styled-components";
import AsyncSelect from "./AsyncSelect";
import {SyncSelect} from "./SyncSelect";

export const MainPage = () => {



    return (
        <MainWrapper>

            <AsyncSelect/>
            <SyncSelect/>

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
