import React from 'react';
import styled from "styled-components";
import AsyncSelect from "./AsyncSelect";
import {SyncSelect} from "./SyncSelect";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import GetDistance from "./GetDistance";

export const MainPage = () => {



    return (
        <MainWrapper>
            <Header/>
            <MainPageStyle>
                <AsyncSelect/>
                <SyncSelect/>
                <GetDistance/>
            </MainPageStyle>

            <Footer/>
        </MainWrapper>
    );
};


const MainPageStyle = styled.div `
    display: flex;
    flex-direction: row;
    margin-top: 20px;

`

const MainWrapper = styled.main `
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
  min-width: 100%;

`
