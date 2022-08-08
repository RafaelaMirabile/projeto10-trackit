import { useContext, useState}from "react";
import { Link, useNavigate} from "react-router-dom"
import axios from "axios";
import UserContext from "./UserContext";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";



export default function Login(){

    const navigate = useNavigate();
    
    
    const {setUserProfilePicture,setUserToken} = useContext(UserContext);
    
    const[email, setUserEmail]= useState("");
    const[password, setUserPassword]= useState("");
    const [InputDisable, setInputDisable]= useState(false);

    
    function loginStatus(e){
        e.preventDefault();
        setInputDisable(true);

        const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login',{
            email,
            password
        });

        promise.then(({data})=>{
           const {image, token}= data;
           setUserProfilePicture(image);
           setUserToken(token);
           navigate('/habitos');
           
        }
      
        );
        promise.catch(() => {
            alert('Usuário ou a senha incorretos');
            setInputDisable(false);
            setUserEmail('');
            setUserPassword('');
        });
    } 

    function FormsState(){
        if(InputDisable){
            return(
                <Forms disabled>
                    <input placeholder="email" type="text" required value={email} ></input>
                    <input  placeholder="senha" type="text" required value={password}></input>
                    <button><ThreeDots color="#FFFFFF" height={20} width={50}/></button>
                </Forms>
                )
        }
        else{
            return(
                <Forms onSubmit={loginStatus}>
                    <input required type="email" placeholder="email" value={email} onChange={(e) => setUserEmail(e.target.value)} ></input>
                    <input required type="password" placeholder="senha" value={password} onChange={(e) => setUserPassword(e.target.value)} ></input>
                    <button type="submit">Entrar</button>
                </Forms>
            )
        }
    }

    const forms= FormsState();
   
    return(      
        <FormContainer>
            {forms}
            <SignUpLink to ="/cadastro">Não tem uma conta? Cadastre-se!</SignUpLink>
        </FormContainer>  
    )
}

const FormContainer = styled.div`

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const Forms =styled.form`
display: flex;
flex-direction: column;
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
    display: flex;
    justify-content: center;
    align-items: center;
}
`
const SignUpLink = styled(Link)`
    font-family: 'Lexend Deca', sans-serif;
    font-size: 14px;
    text-decoration: underline;
    color: #52B6FF;
`