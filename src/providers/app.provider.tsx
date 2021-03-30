import React, {useEffect, useState} from "react";
import {Donation, User} from "../domain";
import {AppContext} from "../context";
import {routes} from "../services/api.routes";
import Api from "../services/api.service";

type Props = {
    children: React.ReactNode
}
export const AppProvider = (props: Props) => {
    const [currentUser, setCurrentUser] = useState<User>()
    const [_donations, setDonations] = useState<Donation[]>([])

    const donations = () => {
        if (_donations.length === 0){
            Api.$<Donation>(routes.donations).getAll().then(setDonations);
        }
    }



    return (
        <AppContext.Provider value={{currentUser, setCurrentUser, actions: {
                donations
            }}}>
            {props.children}
        </AppContext.Provider>
    )
}
