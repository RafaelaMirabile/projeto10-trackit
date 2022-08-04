import { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import axios from "axios";

export default function SignUp(){

    const navigate = useNavigate();

    const[email, setUserEmail]= useState("");
    const[password, setUserPassword]= useState("");
    const[name, setUserName]= useState("");
    const[image, setUserProfilePic]= useState("");

    function userRegistration(e){
        
        e.preventDefault();
        
        const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up',
        {
            email,
            name,
            image,
            password
        }); 
        
        promise.then(()=>
         navigate('/')
        );
        
        promise.catch((err) => console.log(err));
    }
    
    return(
        <FormContainer>
            <Forms onSubmit={userRegistration}>
                    <input placeholder="email" type="text" required value={email} onChange={e => setUserEmail(e.target.value)}></input>
                    <input placeholder="senha" type="text" required value={password} onChange={e => setUserPassword(e.target.value)}></input>
                    <input placeholder="nome" type="text" required value={name} onChange={e => setUserName(e.target.value)}></input>
                    <input placeholder="foto" type="text" required value={image} onChange={e => setUserProfilePic(e.target.value)}></input>
                    <button type="submit">enviar</button>
                </Forms>
            <SignInLink to ="/">Já tem uma conta? Faça login!</SignInLink>
        </FormContainer>
    )
}

const FormContainer = styled.div`

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border: 2px solid green;
`
const Forms =styled.form`
display: flex;
flex-direction: column;
align-items: center;
border: 2px solid purple;
margin-bottom: 16px;

input{
    margin-bottom: 14px;
    width: 303px;
    height: 45px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #DBDBDB;
}
button{
    width: 303px;
    height: 45px;
    background: #52B6FF;
    border-radius: 4.63636px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 20.976px;
    line-height: 26px;
    text-align: center;
    color: #FFFFFF;
    border: none;
}
`
const SignInLink = styled(Link)`
    font-family: 'Lexend Deca', sans-serif;
    font-size: 14px;
    text-decoration: underline;
    color: #52B6FF;
`