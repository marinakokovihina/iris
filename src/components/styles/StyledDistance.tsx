import styled from "styled-components";

export const StyledDistancePage = styled.div `
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

export const StyledInputDistance = styled.input `
  
  margin-top: 5px;
  height: 30px;
  min-height: 35px;
  width: 290px;
  font-size: 16px;
  padding-left: 10px;
  color: #3d3d3d;
  margin-bottom: 10px;
  border: #3d3d3d solid 0.1px;
  border-radius: 5px;
`

export const StyledP = styled.p`
  font-size: 18px;
  color: #3d3d3d;
  justify-content: left;
  margin: 0; /* Убираем внешние отступы */
`;

export const StyledDistanceDiv = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  text-align: center;

  align-items: center;
  iframe {
    margin-top: 10px;
    margin-bottom: 20px;
  }
  p {

  }
`;
