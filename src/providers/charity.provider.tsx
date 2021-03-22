import React, {useState} from "react";

import {CharityContext} from "../context/";
import Api, {method} from "../services/api.service";
import {routes} from "../services/api.routes";
import {Charity} from "../domain/Charity";
import {User} from "../domain/User";
import {CharityAdmin} from "../domain/CharityAdmin";

type Props = {
    children: any
}

const emptyCharity = {
    id: '',
    refId: '',
    charityNumber: '',
    charityName: '',
    charityEin: '',
    logoUrl: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    daysOfOperation: {
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
        sun: false
    },
    closingTime: '',
    pointOfContact: '',
    email: '',
    phone: '',
    zoneId: '',
    notes: '',
    salesforceId: '',
    partner: '',
    secondaryDropLocation: ''
}
export const CharityProvider = (props: Props) => {
    const [charity, setCharity] = useState<Charity>(emptyCharity as Charity)
    const [charities, setCharities] = useState<Charity[]>([] as Charity[])

    const createCharity = (data: Charity): Promise<void> => {
        return Api.$<Charity>(routes.charities).create(data).then(
            result => {
                return;
            }
        )
    }
    const updateCharity = (data: Charity): Promise<void> => {
        return Api.$<Charity>(routes.charities).update(data.id!, data).then(
            result => {
                return
            }
        )
    }
    const getAllCharities = () => {
        return Api.$<Charity>(routes.charities).getAll().then(setCharities)
    }

    const getCharity = (id: string) => {
        return Api.$<Charity>(routes.charities).get(id)
    }

    const removeCharity = (id:string) => {
        return Api.$<Charity>(routes.charities).remove(id)
    }

    const resetCharity = () => {
        setCharity(emptyCharity)
    }

    const getUsers = () => {
        return Api.$<CharityAdmin>(routes.users).getAll().then(users => {
            return users.filter((user) => {
                return user.details && user.details.charity.id === charity.id
            })
        })
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
                    resetCharity,
                    getUsers,
                    addUser
                }
            }
        }>
            {props.children}
        </CharityContext.Provider>
    )
}
