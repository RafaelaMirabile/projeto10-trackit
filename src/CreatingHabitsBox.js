import Day from "./Day"
import styled from "styled-components";
import { useState } from "react";

export default function CreatingHabitsBox({createHabitsDiv, setcreateHabitsDiv}){
    
    const [selectedDay, setSelectedDays] = useState([]);
   
    const weekdays =[{day: 'D',dayID: 0,isSelected : false},
    { day: 'S', dayID: 1,isSelected : false},
    {day: 'T',dayID: 2,isSelected : false},
    {day: 'Q',dayID: 3,isSelected : false},
    {day: 'Q',dayID: 4,isSelected : false},
    {day: 'S',dayID: 5,isSelected : false},
    {day: 'S',dayID: 6,isSelected : false}]


    
    return(
        <CreatingBox>
        <Input required type="text" placeholder="nome do hábito" ></Input>
        <WeekdaysList>
            {weekdays.map((weekday, index) => <Day selectedDay={selectedDay} 
            setSelectedDays={setSelectedDays} weekday={weekday} key={index} />)}         
        </WeekdaysList>
        </CreatingBox>
    )
}

const CreatingBox = styled.div`
border: 2px solid red;
margin-bottom: 20px;
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

const WeekdaysList=styled.ul`
border: 2px solid green;
display: flex;
`
