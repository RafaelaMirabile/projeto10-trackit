import  { useContext, useEffect } from "react";
import styled from "styled-components"
import CreatingHabitsBox from "./CreatingHabitsBox";
import { useState } from "react";
import UserHabits from "./UserHabits";
import axios from "axios";
import UserContext from "./UserContext";
import { ThreeDots } from "react-loader-spinner";


export default function Habitos(){

    const{userToken} = useContext(UserContext);
    
    const [countHabits, setCountHabits] = useState(1);
    const [clikedButton, setClickedButton]= useState(false);
    const [arrUserHabits, setArrUserHabits]= useState([]);
    
    const[createHabitsDiv, setcreateHabitsDiv] =useState([{id : 0}]);


    useEffect(()=>{
        const promise =axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",{
            headers:{Authorization: `Bearer ${userToken}`}
        });

        promise.then(({data})=>{
            setArrUserHabits(data);
        })
    },[])

    function createHabits(){

        //creating unique key
        setCountHabits(countHabits+1);
        setcreateHabitsDiv ([{id: countHabits}]);

       
        if(clikedButton === true ){
            setClickedButton(!clikedButton);

        }else{
            setClickedButton(!clikedButton);
            setcreateHabitsDiv([]);

        }
    }
    function deleteHabitFromList(position){
        console.log(position);
        setArrUserHabits([...arrUserHabits].filter((habit,index)=> position !== index));

    }
    

    function addUserHabit(data){
        setArrUserHabits([...arrUserHabits,data]);
        console.log(arrUserHabits);
    }
    
    function showUserHabit(data){
              
        if(arrUserHabits === null){
           return <></>
        } else{
            return (arrUserHabits.map((habit,index)=> <UserHabits habit={habit} key={habit.id} index={index} deleteHabitFromList={deleteHabitFromList}/> ))
        }
    }

    function showWarning(){
        if(arrUserHabits === null){
            return <ThreeDots  color="#FFFFFF" height={20} width={50}/>
        } 
        if(arrUserHabits.length === 0){
            return <Warning>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</Warning>
        }
        else{
            return<></>
        }
    }


     const userHabitList = showUserHabit(); 
     const warning = showWarning();

    return(         
            <HabitsContainer>
                <CreateHabit>
                <p>Meus hábitos</p>
                <AddHabits onClick={createHabits}>{clikedButton ? <span>+</span> : <span>-</span> }</AddHabits>  
                </CreateHabit>
                    {createHabitsDiv.map((value,index)=> <CreatingHabitsBox createHabitsDiv={createHabitsDiv} 
                    index={index} key={value.id}  setcreateHabitsDiv={setcreateHabitsDiv} 
                    clikedButton={clikedButton} setClickedButton={setClickedButton} addUserHabit={addUserHabit}/>)}
                <UserHabitList>
                   {userHabitList}
                   {warning}
                </UserHabitList>
            </HabitsContainer>
    )
}

const UserHabitList = styled.div`
border: 2px solid purple;
height: 230px;
overflow-y: scroll;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
`
const Warning = styled.p `
    font-family: 'Lexend Deca', sans-serif;
    margin-top: 30px;
    font-size: 18px;
    color: #666666;
`


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
height: 430px;
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



