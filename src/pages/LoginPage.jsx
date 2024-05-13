import React from 'react';
import {StyledFormLogin, StyledLoginPage, StyledWrapLogin} from "../components/styles/StyledLoginPage";
import {useNavigate} from "react-router-dom";

export const LoginPage = ({ onLogin }) => {
    const navigate = useNavigate();

    const loginButton = () => {
        const login = document.getElementById('loginInput').value;
        const password = document.getElementById('passwordInput').value;


        if (login === "admin" && password === "admin") {
            onLogin();
            navigate('/vkr')

        } else {
            alert('Неправильный пароль :с')
        }
    }
    return (
        <StyledLoginPage>
            <StyledWrapLogin>
                <StyledFormLogin>
                    <h2> Войти в аккаунт </h2>
                    <p> Введите логин: </p>
                    <input
                        type={"text"}
                        placeholder={"Введите логин"}
                        id = {"loginInput"} />
                    <p>Введите пароль: </p>
                    <input type={"password"}
                           placeholder={"Введите пароль"}
                           id={"passwordInput"}/>
                    <button onClick={loginButton}> Войти в аккаунт! </button>
                </StyledFormLogin>
            </StyledWrapLogin>
        </StyledLoginPage>
    );
};

