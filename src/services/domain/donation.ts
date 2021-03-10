import {Partner} from "./partner";

export type Donation = {
    id: string
    donationCode: string;
    largeItems: number
    smallItems: number
    bags: number
    boxes: number
    appliances: number
    hazardous: number

    date: string
    formattedDate: string
    timeSlot: string

    address: string
    city: string
    state: string
    zip: string
    donorName: string
    phone: string
    email: string

    aboveTheGroundFloor: string
    staircases: number
    disassembly: number

    additionalInformation: string
    donationStatus: string
    charityId: string
    charityName: string

    driverId: string

    eventType: string

    photos: { url: string }[]
    primaryDrop: {url: string, selected: false}[]
    pocName: string
    pocPhone: string
    partner: Partner
}
