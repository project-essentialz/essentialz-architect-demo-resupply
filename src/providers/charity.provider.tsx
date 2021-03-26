import React, {useEffect, useState} from "react";
import Api from "../services/api.service";
import {CharityContext} from "../context/";
import {routes} from "../services/api.routes";
import {Charity, User} from "../domain";

type Props = {
    children: any
}

export const CharityProvider = (props: Props) => {
    const [charity, setCharity] = useState<Charity>(new Charity())
    const [charities, setCharities] = useState<Charity[]>([])

    useEffect(() => {
        getAllCharities()
    }, [])


    const getAllCharities = () => {
        return Api.$<Charity>(routes.charities).getAll().then(setCharities)
    }

    const createCharity = (data: Charity): Promise<Charity> => {
        return Api.$<Charity>(routes.charities).create(data).then((charity) => {
            getAllCharities()
            return charity
        })
    }

    const updateCharity = (data: Charity): Promise<Charity> => {
        return Api.$<Charity>(routes.charities).update(data.id!, data).then((charity) => {
            getAllCharities()
            return charity
        })
    }

    const getCharity = (id: string) => {
        return Api.$<Charity>(routes.charities).get(id, Charity).then(setCharity)
    }

    const removeCharity = (id: string) => {
        return Api.$<Charity>(routes.charities).remove(id)
    }

    const addUser = (user: User) => {
        return Api.$<User>(routes.users).create({
            ...user,
            role: 'charity_user',
            details: {
                ...user.details,
                charityId: charity.id
            }
        } as User).then(_ => {
            return
        })
    }

    return (
        <CharityContext.Provider value={
            {
                charity,
                setCharity,
                charities,
                setCharities,
                actions: {
                    createCharity,
                    updateCharity,
                    getAllCharities,
                    getCharity,
                    removeCharity,
                    addUser
                }
            }
        }>
            {props.children}
        </CharityContext.Provider>
    )
}
