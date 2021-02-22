import React, {useEffect, useState} from "react";
import {Auth, AuthRequest} from "../services/domain";
import {UserContext} from "../context/user.context";
import Api, {method} from "../services/api.service";
import {routes} from "../services/api.routes";

type Props = {
    children: any
}
export const UserProvider = (props: Props) => {
    const [authData, setAuthData] = useState<Auth>({} as Auth)
    const [dataRetrieved, setDataRetrieved] = useState<boolean>(false);

    useEffect(() => {
        const authDataJson = localStorage.getItem('auth');
        if (authDataJson) {
            let authDataParsed = JSON.parse(authDataJson);
            setAuthData(authDataParsed)
            Api.setToken(authDataParsed.authorization.token)
        }
        setDataRetrieved(true);
    }, [])

    useEffect(() => {
        if (authData.authorization){
            localStorage.setItem('auth', JSON.stringify(authData))
            Api.setToken(authData.authorization.token)
        }
    }, [authData])

    const authenticate = (authRequest: AuthRequest) => {
        return Api.$<Auth>(routes.authenticate)
            .call(method.post, authRequest)
            .then((result:Auth) => {
                Api.setToken(result.authorization.token)
                setAuthData(result);
                return result;
            });
    }

    const logout = () => {
        Api.setToken('');
        setAuthData({} as Auth);
        localStorage.removeItem('auth')
    }

    const getUserData = () => {
        if (authData.id){
            Api.$('users').get(authData.id).then(result => console.log(result))
        }
    }

    return (
        <UserContext.Provider value={{authData, setAuthData, actions: {authenticate, logout, getUserData}}}>
            {dataRetrieved ? (props.children) : (<></>)}
        </UserContext.Provider>
    )
}
