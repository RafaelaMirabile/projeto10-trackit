import Day from "./Day"
import styled from "styled-components";
import { useContext, useState } from "react";
import axios from "axios";
import UserContext from "./UserContext"
import { ThreeDots } from "react-loader-spinner";

export default function CreatingHabitsBox(props){

const {setcreateHabitsDiv,addUserHabit} =props;

    const {userToken} = useContext(UserContext)

    const [areInputFieldsDisabled, setAreInputFieldsDisabled] = useState(false);
    const [selectedDay, setSelectedDays] = useState([]);
    const[habitName, setHabitName]= useState("");

    const weekdays =[{day: 'D',dayID: 0,isSelected : false},
    { day: 'S', dayID: 1,isSelected : false},
    {day: 'T',dayID: 2,isSelected : false},
    {day: 'Q',dayID: 3,isSelected : false},
    {day: 'Q',dayID: 4,isSelected : false},
    {day: 'S',dayID: 5,isSelected : false},
    {day: 'S',dayID: 6,isSelected : false}]

    function addHabit(e){
        
        e.preventDefault();
        setAreInputFieldsDisabled(true);

        if(selectedDay.length === 0){
            alert("Selecione pelo menos uma dia da semana")
            return
        }
        
        const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits',
        {
           name: habitName,
            days: selectedDay
        },
        {
            headers: {Authorization: `Bearer ${userToken}`}
        }
        );

        promise.then(({data})=>{
            setHabitName("");
            setSelectedDays([]);
            setAreInputFieldsDisabled(false);
            setcreateHabitsDiv([]);
            addUserHabit(data);
        });

        promise.catch(()=>{
            alert("Houve um erro durante a criação do novo hábito. Tente novamente.");
            setAreInputFieldsDisabled(false);
        })
        
    }

    function showInputsFields(){
        console.log(areInputFieldsDisabled);

        if(areInputFieldsDisabled){
            return(
                <WeekdaysList disabled>
                    kkkkkkkkkkkk
                    <Input required type="text" placeholder="nome do hábito" value={habitName} onChange={(e) => setHabitName(e.target.value)}></Input>
                    <Days>
                        {weekdays.map((weekday, index) => <Day selectedDay={selectedDay} 
                        setSelectedDays={setSelectedDays} weekday={weekday} key={index} habitName={habitName}/>)}         
                    </Days>
                </WeekdaysList>
            )
        } else{
            return(
                <WeekdaysList>
                    <Input required type="text" placeholder="nome do hábito" value={habitName} onChange={(e) => setHabitName(e.target.value)}></Input>
                    <Days>
                        {weekdays.map((weekday, index) => <Day selectedDay={selectedDay} 
                        setSelectedDays={setSelectedDays} weekday={weekday} key={index} habitName={habitName}/>)}         
                    </Days>
                </WeekdaysList>

            )
        }
    }

    function submitHabitButtonDoots(){
        if(areInputFieldsDisabled){
            return(
                <Salvar><ThreeDots color="#FFFFFF" height={20} width={50}/></Salvar>
            )
        } else{
            return(
                <Salvar type="submit">Salvar</Salvar>
            )
        }
    }

    const submitHabitButton = submitHabitButtonDoots()

    function showActions(){
        return(
            <Actions>
                <Cancelar>Cancelar</Cancelar>
                {submitHabitButton}
                </Actions>
        )
    }

    const inputFildes = showInputsFields();
    const actions = showActions();

    return(
            <CreatingBox onSubmit={addHabit}>
                {inputFildes}
                {actions}
            </CreatingBox>
    )
}

const CreatingBox = styled.form`
border: 2px solid red;
margin-bottom: 20px;
`
const Days=styled.div`
border: 2px solid brown;
display: flex;
`
const Actions=styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
`

const Salvar=styled.button`
width: 84px;
height: 35px;
background: #52B6FF;
border-radius: 4.63636px;
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 15.976px;
line-height: 20px;
color: #FFFFFF;
display: flex;
justify-content: center;
align-items: center;
border: none;
`

const Cancelar=styled.span`
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 15.976px;
line-height: 20px;
text-align: center;
color: #52B6FF;
margin-right:14px;
`

const Input =styled.input`
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
    margin-bottom: 10px;
`

const WeekdaysList=styled.div`
border: 2px solid green;
display: flex;
flex-direction: column;

`