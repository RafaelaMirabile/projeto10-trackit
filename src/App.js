import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUpPage from "./SignUpPage"
import { UserContextProvider } from "./UserContext"
import GlobalStyle from "./globalStyles"
import HabitosPage from "./HabitosPage"
import HomePage from "./HomePage"


export default function App(){
    return(
        <>
        <UserContextProvider>
            <BrowserRouter>
                <GlobalStyle />
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/cadastro" element={<SignUpPage/>}/>
                    <Route path="/habitos" element={<HabitosPage/>}/>
                </Routes>
            </BrowserRouter>
        </UserContextProvider>
        </>




    )
}