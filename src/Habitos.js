import  { useContext, useEffect , useState} from "react";
import styled from "styled-components"
import UserHabits from "./UserHabits";
import axios from "axios";
import UserContext from "./UserContext"
import { ThreeDots } from "react-loader-spinner";
import Day from "./Day"


export default function Habitos(){

    const{userToken} = useContext(UserContext);
    
    const[showElementCreateHabit, setShowElementCreateHabit]= useState(true);
    const [arrUserHabits, setArrUserHabits]= useState([]);
    const [isSaveButtonClicked, setIsSaveButtonClicked] = useState(true);
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


    useEffect(()=>{
        const promise =axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",{
            headers:{Authorization: `Bearer ${userToken}`}
        });

        promise.then(({data})=>{
            setArrUserHabits(data);
        })
    },[])

    function addHabit(e){
        
        e.preventDefault();
        setAreInputFieldsDisabled(true);

        if(selectedDay.length === 0){
            alert("Selecione pelo menos uma dia da semana");
            setAreInputFieldsDisabled(false);
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
            setSelectedDays("");
            setAreInputFieldsDisabled(false);
            addUserHabit(data);
            setShowElementCreateHabit(false);
        });

        promise.catch(()=>{
            alert("Houve um erro durante a criação do novo hábito. Tente novamente.");
            setAreInputFieldsDisabled(false);
            setHabitName("");
            setSelectedDays("");
        })
        
    }
 
    
    function deleteHabitFromList(position){
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

    function showInputsFields(){
        if (!isSaveButtonClicked) {
            return <></>
        }

        if(areInputFieldsDisabled){
            return(
                <WeekdaysList disabled>
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

    function showActions(){
        return(
            <Actions>
                <Cancelar onClick={()=>setShowElementCreateHabit(false) }>Cancelar</Cancelar>
                {submitHabitButton}
            </Actions>
        )
    }

    function submitHabitButtonDoots(){
        if (!isSaveButtonClicked) {
            return <></>
        }   
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
     
     const submitHabitButton = submitHabitButtonDoots();
     const userHabitList = showUserHabit(); 
     const inputFildes = showInputsFields();
     const actions = showActions();


    return(         
            <HabitsContainer>
                <CreateHabit>
                <p>Meus hábitos</p>
                <AddHabits onClick={()=> setShowElementCreateHabit(!showElementCreateHabit)}><span>+</span></AddHabits>  
                </CreateHabit>
                {showElementCreateHabit ? 
                    <CreatingBox onSubmit={addHabit}>
                        {inputFildes}
                        {actions}
                    </CreatingBox> : " " }                   
                <UserHabitList>
                   {userHabitList}
                   {arrUserHabits.length === 0 ? <Warning>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</Warning> : ''}                 
                </UserHabitList>
            </HabitsContainer>
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
const UserHabitList = styled.div`
border: 2px solid purple;
height: 330px;
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
border: 2px solid black;
display: flex;
justify-content: space-between;
margin-bottom: 16px;
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
height: 470px;
padding: 10px;
overflow-y: hidden;
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



