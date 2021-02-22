import React, {useState} from "react";
import {Charity} from "../services/domain";
import {CharityContext} from "../context/";
import Api, {method} from "../services/api.service";
import {routes} from "../services/api.routes";

type Props = {
    children: any
}

const emptyCharity = {
    id: '',
    charityNumber: '',
    charityName: '',
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
        return Api.$<Charity>(routes.charities).update(data.id, data).then(
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
                    resetCharity
                }
            }
        }>
            {props.children}
        </CharityContext.Provider>
    )
}
