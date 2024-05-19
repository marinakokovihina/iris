import styled from "styled-components";
import exp from "constants";

export const StyledAsync = styled.div `
  min-height: 70vh;
  min-width: 425px;
  margin-right: 10px;
  align-items: center;
  justify-items: center;
  display: flex; 
  flex-direction: column;
  border: 0.3px solid #282c34;
  border-radius: 10px;
  color: rgb(33, 37, 41);
  margin-left: 30px;
  

`

export const StyledSyncSelectServices = styled.div`
 
  display: flex;
  flex-direction: column;
`


export const StyledSelectService = styled.select `
    height: 40px;
    width: 300px;
    font-size: 18px;
  padding-left: 10px;
  color: #3d3d3d;
  margin-bottom: 10px;
  border: #3d3d3d solid 0.1px;
  border-radius: 5px;
`
export const StyledTextSync = styled.div `
  
`

export const StyledButtonAsync = styled.button `
  

  &:hover {
   
  }

`
export const AsyncH1 = styled.h1 `
  font-size: 25px;
  color: #3d3d3d;
  
`

export const SelectTimeStyled = styled.select `
  
`
export const SelectTimeDivStyled = styled.div `
`

export const StyledButtonAsyncBigger = styled.button `
  min-width: 300px;
  font-family: Helvetica, -apple-system, sans-serif;
  font-size: 16px;
  color: white;
  text-align: center;
  height: 40px;
  background-color: rgb(52, 108, 176);
  border: none;
  border-radius: 7px;
  margin-bottom: 10px;
  margin-top: 10px;
  &:hover {
    background-color: rgb(43, 90, 146);
    transition: 0.2s;
  }
`

export const StyledIframe = styled.iframe `
  
`

export const StyledTimerAsync = styled.div `
  display: flex;
  
`

export const StyledTimerAsyncContainer = styled.div `
  margin-right: 7px;
  margin-top: 10px;
  text-align: center;
  font-size: 19px;
  margin-bottom: 10px;
    input {
      margin-top: 2px ;
      font-size: 18px;
      max-height: 20px;
      max-width: 50px;
      text-align: center;
      align-items: center;
      margin-left: 2px;
    }
`

export const StyledTable = styled.table `
    margin-top: 20px;
    border-spacing: 0;
   border-radius: 10px;
    max-width: 90%;
  min-width: 90%;
   border-collapse: collapse;
  color: #3d3d3d;
    text-align: center;
  
  th{
    padding: 8px;
    border: 0.2px solid #3d3d3d;

  }
  tr {
    border: 0.2px solid #3d3d3d;
  }
  td{
    padding: 8px;
  }

`
