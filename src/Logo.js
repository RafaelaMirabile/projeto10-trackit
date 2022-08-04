import styled from "styled-components"
import logo from "../src/assets/img/logo.png"

export default function Logo() {
    return (
        <ImageContainer>
            <img src={logo} alt="Logo do app TrackIt" />
        </ImageContainer>
    )
}

const ImageContainer = styled.div`
    margin: 68px auto 32px;
    height: 180px;
    width: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        width:200px;
        height: 200px;
    }
`