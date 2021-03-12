export type Charity = {
    id: string
    refId: string
    charityName: string
    charityNumber: string
    charityEin: string
    logoUrl: string
    address: string
    city: string
    state: string
    zip: string
    daysOfOperation: {
        mon: boolean,
        tue: boolean,
        wed: boolean,
        thu: boolean,
        fri: boolean,
        sat: boolean,
        sun: boolean
    }
    pointOfContact: string
    email: string
    phone: string
    closingTime: string
    zoneId: string
    notes: string
    salesforceId: string
    partner: string,
    secondaryDropLocation: string
}
