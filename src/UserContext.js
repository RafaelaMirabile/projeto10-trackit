import { useState,createContext } from "react";

const UserContext = createContext();

export function UserContextProvider({children}){

    const [userToken, setUserToken] = useState("");
    const [userProfilePicture, setUserProfilePicture] = useState("");
    const [arrTodayUserHabits, setArrTodayUserHabits]= useState([]);

    const locallyStoredToken = localStorage.getItem("token");
    const locallyStoredProfilePicture = localStorage.getItem("picture");

    if ((locallyStoredToken === null && locallyStoredProfilePicture === null) && (userToken !== "" && userProfilePicture !== "")) {
        localStorage.setItem("token", userToken);
        localStorage.setItem("picture", userProfilePicture);
    } else if ((locallyStoredToken !== null && locallyStoredProfilePicture !== null) && (userToken === "" && userProfilePicture === "")) {
        setUserToken(locallyStoredToken);
        setUserProfilePicture(locallyStoredProfilePicture);
    }

    const progress = arrTodayUserHabits.filter(habit => habit.done).length;
    const totalHabits = arrTodayUserHabits.length;
    console.log(totalHabits);
    let calcPercentage =(progress/totalHabits)*100;
    let newcalPercentage = calcPercentage.toFixed(0);

    return(
        <UserContext.Provider value={{userToken, userProfilePicture, setUserToken, setUserProfilePicture,arrTodayUserHabits, setArrTodayUserHabits,newcalPercentage}}>
        { children }
        </UserContext.Provider>
    )

}

export default UserContext;