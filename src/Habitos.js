import React from "react";
import styled from "styled-components"
import CreatingHabitsBox from "./CreatingHabitsBox";
import { useState } from "react";

export default function Habitos(){
    const [countHabits, setCountHabits] = useState(1);
    
    const[createHabitsDiv, setcreateHabitsDiv] =React.useState([]);

    function createHabits(){

        setCountHabits(countHabits+1);
        console.log(countHabits);
    
        setcreateHabitsDiv ([...createHabitsDiv,{position: countHabits}]);
        console.log(createHabitsDiv);
        
    }
       
    return(         
            <HabitsContainer>
                <CreateHabit>
                <p>Meus hábitos</p>
                <AddHabits onClick={createHabits}><span>+</span></AddHabits>  
            </CreateHabit>
                <Habits>
                    {createHabitsDiv.map((index)=> <CreatingHabitsBox createHabitsDiv={createHabitsDiv} 
                      key={index} setcreateHabitsDiv={setcreateHabitsDiv}/>)}
                </Habits>
            </HabitsContainer>
    )
}

const CreateHabit =styled.div`
border: 2px solid purple;
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
const HabitsContainer = styled.div`
border: 2px solid green;
margin-top: 100px;
height: 400px;

`
const AddHabits =styled.button`
width: 40px;
height: 35px;
background: #52B6FF;
border-radius: 4.63636px;
border: none;
display: flex;
justify-content: center;
align-items: center;
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 26.976px;
line-height: 34px;
color: #FFFFFF;
`

const Habits=styled.div`
border: 2px solid pink;
display: flex;
flex-direction: column;
align-items: center;
overflow-y: scroll;
overflow-x: hidden;
height: 300px;
margin-bottom: 10px;

`


