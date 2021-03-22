import React, {useState} from "react";
import {User} from "../domain/User";
import {AppContext} from "../context";

type Props = {
    children: React.ReactNode
}
export const AppProvider = (props: Props) => {
    const [currentUser, setCurrentUser] = useState<User>()
    return (
        <AppContext.Provider value={{currentUser, setCurrentUser, actions: {}}}>
            {props.children}
        </AppContext.Provider>
    )
}