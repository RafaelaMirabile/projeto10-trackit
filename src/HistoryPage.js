import Header from "./commun/Header"
import Footer from "./commun/Footer"
import styled from "styled-components"


export default function HistoryPage(){
    return(
        <>
        <Header/>
        <HistoryContainer>
            <Title>
                <p>Histórico</p>
            </Title>
            <Subtitle>Em breve você poderá ver o histórico dos seus hábitos aqui!</Subtitle>
        </HistoryContainer>       
        <Footer/>
        </>
    )
}

const HistoryContainer = styled.div`
margin-top: 100px;
padding: 10px;
`
const Title =styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 26px;
width: 100%;

p{
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 22.976px;
line-height: 29px;
color: #126BA5;
}
`
const Subtitle= styled.span`
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 17.976px;
line-height: 22px;
color: #666666
`

