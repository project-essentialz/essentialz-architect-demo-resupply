import React, {useEffect, useState} from "react";
import {Auth, AuthRequest} from "../services/domain";
import {UserContext} from "../context";
import Api, {method} from "../services/api.service";
import {routes} from "../services/api.routes";
import {User} from "../domain";

type Props = {
    children: any
}

const emptyUser = {
    username: '',
    password: '',
    role: '',
    details: {
        name: ''
    }
}
export const UserProvider = (props: Props) => {
    const [authData, setAuthData] = useState<Auth>({} as Auth)
    const [users, setUsers] = useState<User[]>([])
    const [user, setUser] = useState<User>(emptyUser)

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
        if (authData.authorization) {
            localStorage.setItem('auth', JSON.stringify(authData))
            Api.setToken(authData.authorization.token)
        }
    }, [authData])

    const authenticate = (authRequest: AuthRequest) => {
        return Api.$<Auth>(routes.authenticate)
            .call(method.post, authRequest)
            .then((result: Auth) => {
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
        if (authData.id) {
            Api.$(routes.users).get(authData.id).then(result => console.log(result))
        }
    }
    const getUsers = () => {
        Api.$<User>(routes.users).getAll().then(setUsers);
    }

    const createUser = (user: User) : Promise<User> => {
        return Api.$<User>(routes.users).create(user)
    }

    const getUser = (id: string) => {
        Api.$<User>(routes.users).get(id).then(setUser)
    }

    const resetUser = () => {
        setUser(emptyUser);
    }

    return (
        <UserContext.Provider value={
            {
                authData,
                setAuthData,
                users,
                setUsers,
                user,
                setUser,
                actions: {
                    authenticate,
                    logout,
                    getUserData,
                    getUsers,
                    createUser,
                    getUser,
                    resetUser
                }
            }}>
            {dataRetrieved ? (props.children) : (<></>)}
        </UserContext.Provider>
    )
}
