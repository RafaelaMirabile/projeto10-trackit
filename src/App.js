import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUpPage from "./SignUpPage"
import { UserContextProvider } from "./UserContext"
import GlobalStyle from "./globalStyles"
import HabitosPage from "./HabitosPage"
import HojePage from "./HojePage"
import HomePage from "./HomePage"
import HistoryPage from "./HistoryPage"


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
                    <Route path="/hoje" element={<HojePage/>}/>
                    <Route path="/historico" element={<HistoryPage/>}/> 
                </Routes>
            </BrowserRouter>
        </UserContextProvider>
        </>




    )
}