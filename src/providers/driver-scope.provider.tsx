import React, {useContext, useEffect, useState} from "react"
import {DriverScopeContext} from "../context/driver-scope.context"
import {Donation, Driver, TPLOrganization} from "../domain";
import {AppContext, DonationContext, UserContext} from "../context";
import Api from "../services/api.service";
import {routes} from "../services/api.routes";
import {UserDetails} from "../domain/User";

type Props = {
    children: any
}

export const DriverScopeProvider = (props: Props) => {
    const {user} = useContext(UserContext);
    const donationContext = useContext(DonationContext);

    const [userDetails, setUserDetails] = useState<UserDetails>()

    const [driver, setDriver] = useState<Driver>()
    const [tplOrganization, setTplOrganization] = useState<TPLOrganization>()
    const [donations, setDonations] = useState<Donation[]>([])
    const [schedule, setSchedule] = useState<any>({})

    const fetchOrganizationDetails = () => {
        const orgId = userDetails?.tplOrganizationId;
        if (orgId) {
            Api.$<TPLOrganization>(routes.partners)
                .get(orgId, TPLOrganization)
                .then(setTplOrganization)
        }
    }

    const fetchDriverDetails = () => {
        if (tplOrganization) {
            setDriver(tplOrganization!.drivers
                .find((driver) => driver.user.username === user.username));
        }
    }

    const fetchDriversDonations = () => {
        setDonations(
            donationContext.donations.filter((donation) => {
                if (donation.driver && driver) {
                    return donation.driver.user.username === driver.user.username
                }
                return false;
            })
        )
    }

    const fetchDriverSchedule = () => {
        if (driver) {
            Api.$(routes.schedules).get(driver.scheduleId!).then(setSchedule);
        }
    }


    useEffect(() => {
        if (user && user.details) {
            console.log(user.details)
            setUserDetails(user.details)
        }
    }, [user])

    useEffect(fetchOrganizationDetails, [userDetails])
    useEffect(fetchDriverDetails, [tplOrganization])
    useEffect(fetchDriversDonations, [driver, donationContext.donations])
    useEffect(fetchDriverSchedule, [driver])

    return (
        <DriverScopeContext.Provider
            value={{
                driver,
                setDriver,
                tplOrganization,
                setTplOrganization,
                donations,
                setDonations,
                schedule,
                setSchedule,
                actions: {}
            }}
        >
            {props.children}
        </DriverScopeContext.Provider>
    )
}
