import React, {useContext} from "react";
import { Redirect } from "react-router-dom";
import {UserContext} from "../../context/user.context";

type Props = {
    children: JSX.Element
}
export const PrivateNavigationStackContainer = (props: Props) => {
    const {authData} = useContext(UserContext);
    const isAuthenticated = () => authData.authorization && authData.authorization.token;
    return isAuthenticated() ? (props.children) : (<Redirect to={{pathname: '/access'}}/>);

    return (
        <>
            {props.children}
        </>
    )
}
