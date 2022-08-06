import { useContext } from "react";
import styled from "styled-components";
import UserContext from "./UserContext";
import axios from "axios";

export default function UserHabits({habit,deleteHabitFromList,index}){
    
    const {userToken}= useContext(UserContext);

    function deleteHabit(){
      if(!window.confirm(`Você realmente deseja deletar o hábito "${habit.name}?`)){
        return
      }

        const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}`,{
            headers: {Authorization: `Bearer ${userToken}`}
        });

        promise.then(()=> deleteHabitFromList(index));
    }
    
    return(
        <HabitName>
            <p>{habit.name}</p>
            <ion-icon name="trash-outline" onClick={deleteHabit}></ion-icon>
        </HabitName>
    )
}


const HabitName= styled.div`
border: 2px solid orange;
margin-bottom: 10px;
width: 340px;
height: 91px;
background: #FFFFFF;
border-radius: 5px;
display: flex;
justify-content: space-between;
align-items: center;
padding: 10px;

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

