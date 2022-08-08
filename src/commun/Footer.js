import styled from "styled-components"
import { Link } from "react-router-dom"
import { CircularProgressbar} from "react-circular-progressbar"
import 'react-circular-progressbar/dist/styles.css'
import { useContext } from "react"
import UserContext from "../UserContext"


export default function Footer(){



    return(       
        <FooterContainer>
            <Content>
                <NavbarLink to="/habitos">Hábitos</NavbarLink>
                <NavbarLink to="/hoje">
                <Progressbar>
                            <CircularProgressbar 
                            background={true} 
                            backgroundPadding={6}   
                            text="Hoje"
                           />
                </Progressbar>
               
                </NavbarLink>
                <NavbarLink to="/historico">Histórico</NavbarLink>
            </Content>
        </FooterContainer>
    )
}

const Progressbar = styled.div`
    margin-bottom: 100px;
    height: 90px;
    width: 90px;
    display: flex;
    justify-content: center;
    align-items: center;

    .CircularProgressbar-path {
        stroke: #FFFFFF;
    }
    .CircularProgressbar-trail {
        stroke: #52B6FF;
    }
    .CircularProgressbar-text {
        fill: #FFFFFF;

    }
    .CircularProgressbar-background {
        fill: #52B6FF;
    }

`





const FooterContainer=styled.div`
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    height: 70px;
    background-color: #FFFFFF;
`
const Content = styled.div `
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    max-width: 600px;
`

const NavbarLink = styled(Link) `
    font-family: 'Lexend Deca', sans-serif;
    font-size: 18px;
    text-decoration: none;
    color: #52B6FF;
`

