import { useState,createContext } from "react";


const UserContext = createContext();


export function UserContextProvider({children}){


    const [userToken, setUserToken] = useState("");
    const [userProfilePicture, setUserProfilePicture] = useState("");

    const locallyStoredToken = localStorage.getItem("token");
    const locallyStoredProfilePicture = localStorage.getItem("picture");

    if ((locallyStoredToken === null && locallyStoredProfilePicture === null) && (userToken !== "" && userProfilePicture !== "")) {
        localStorage.setItem("token", userToken);
        localStorage.setItem("picture", userProfilePicture);
    } else if ((locallyStoredToken !== null && locallyStoredProfilePicture !== null) && (userToken === "" && userProfilePicture === "")) {
        setUserToken(locallyStoredToken);
        setUserProfilePicture(locallyStoredProfilePicture);
    }


    return(
        <UserContext.Provider value={{userToken, userProfilePicture, setUserToken, setUserProfilePicture}}>
        { children }
        </UserContext.Provider>
    )

}

export default UserContext;