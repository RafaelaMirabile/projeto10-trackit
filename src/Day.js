import styled from "styled-components";
import { useState } from "react";
export default function Day(props){
const {weekday, selectedDay, setSelectedDays,habitName}= props;

const [selected,setSelected]= useState(false);
    
    function save(weekday){
               
        if(selected === false){
            setSelected(!selected)
            setSelectedDays([...selectedDay, weekday.dayID]);
        }else{
            setSelected(!selected);
            const novoarray = selectedDay.filter(value => value !== weekday.dayID);
            setSelectedDays(novoarray);
            console.log(selectedDay);
        }      
    }       
    return(
        <>
         <Weekday  selected={selected} key={weekday.dayID} onClick={()=>save(weekday)}>{weekday.day}</Weekday>
        </>
    )
}

const Weekday =styled.div`
background: #FFFFFF;
border: 1px solid ${props => props.selected ? '#ffffff' : '#dbdbdb'};
border-radius: 5px;
margin-top: 6px;
margin-right: 10px;
width: 30px;
height: 30px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
color: ${props => props.selected ? '#ffffff' : '#dbdbdb'};
background-color: ${props => props.selected ? '#cfcfcf' : '#ffffff'};
`