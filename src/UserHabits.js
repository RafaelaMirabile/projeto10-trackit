import { useContext } from "react";
import styled from "styled-components";
import UserContext from "./UserContext";
import axios from "axios";

export default function UserHabits({habit,deleteHabitFromList,index}){
    
    const {userToken}= useContext(UserContext);

    const weekdaysList = ["D", "S", "T", "Q", "Q", "S", "S"];

    function deleteHabit(){
      if(!window.confirm(`Você realmente deseja deletar o hábito "${habit.name}?`)){
        return
      }

        const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}`,{
            headers: {Authorization: `Bearer ${userToken}`}
        });

        promise.then(()=> deleteHabitFromList(index));
    }

     function showWeekDays(){        
        return(
            <>
                {weekdaysList.map((weekday, index) => {
                    const isSelected = habit.days.some((day) => day === index);
                    return (<Weekday key={index} isSelected={isSelected}>{weekday}</Weekday>)
                })}
            </>
        )
     }
    
    const weekdays = showWeekDays();
    
    return(
        <CreatedHabit>
            <HabitName>
            <p>{habit.name}</p>
            <ion-icon name="trash-outline" onClick={deleteHabit}></ion-icon>
            </HabitName>
            <div>{weekdays}</div>
        </CreatedHabit>
    )
}
const HabitName = styled.div`
border: 2px solid blue;
display: flex;
justify-content: space-between;
width:340px;
padding: 6px;
`
const CreatedHabit= styled.div`
border: 2px solid orange;
margin-bottom: 10px;
width: 340px;
height: 91px;
background: #FFFFFF;
border-radius: 5px;

div:nth-child(2){
border: 2px solid pink;
display: flex;
}

p{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #666666;
}

ion-icon{
width: 20px;
height: 20px;
}
`
const Weekday = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    margin-right: 6px;
    height: 30px;
    width: 30px;
    background-color: ${props => props.isSelected ? "#DBDBDB" : "#FFFFFF"};
    font-family: 'Lexend Deca', sans-serif;
    color: ${props => props.isSelected ? "#FFFFFF" : "#DBDBDB"};
`;
