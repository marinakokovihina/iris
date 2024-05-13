import styled from "styled-components";

export const StyledLoginPage = styled.div `
  min-height: 100vh;
  min-width: 100vw;
  background-color: rgba(164, 164, 189, 0.51);
  display: flex;
  align-items: center;
  justify-content: center;  
`
export const StyledWrapLogin = styled.div `
  min-height: 40vh;
  min-width: 35vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 40px;
`

export const StyledFormLogin = styled.form `
  font-family: Helvetica, sans-serif;

  h2 {
    font-size: 25px;
    font-family: Helvetica, sans-serif;
  }

  p {
    font-size: 18px;
  }

  button {
    display: block;
    width: 200px;
    height: 50px;
    border-radius: 15px;
    font-size: 18px;
    border: none;
    background-color: rgba(164, 164, 189, 0.51);
    color: rgba(0, 0, 0, 0.52);
    margin-top: 20px;

    
  }
  button:hover{
    
      background-color: white;
      transition: 1s;
      
  }
  input{
    width: 200px;
    height: 30px;
    border-color: rgba(164, 164, 189, 0.51);;
    
  }
`
