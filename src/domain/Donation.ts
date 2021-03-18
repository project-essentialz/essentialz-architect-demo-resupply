import {Eventful} from "./Eventful";
import {Charity} from "./Charity";
import {Driver} from "./Driver";
import {Donor} from "./Donor";
import {DonationItemPhoto} from "./DonationItemPhoto";
import {TPLOgranization} from "./TPLOrganization";
import {pricing} from "../utility/pricing";

export enum DonationStatus {
    submitted = 'submitted',
    service_request_dispatched = 'service_request_dispatched',
    driver_assigned = 'driver_assigned',
    driver_en_route = 'driver_en_route',
    driver_arrived = 'driver_arrived',
    quote_sent = 'quote_sent',
    payment_successful = 'payment_successful',
    primary_drop = 'primary_drop',
    completed = 'completed'
}

export enum DonationItemType {
    largeItem = 'largeItem',
    smallItem = 'smallItem',
    bag = 'bag',
    box = 'boxes',
    appliance = 'appliance',
    hazardousItem = 'hazardousItem'

}

class DonationSpec {
    largeItems: number = 0
    smallItems: number = 0
    bags: number = 0
    boxes: number = 0
    appliances: number = 0
    hazardous: number = 0

    aboveTheGroundFloor: boolean = false // Todo: Do we need this at all?
    staircases: number = 0
    disassembly: number = 0

    additionalInformation: string = ''
}

class DonationItem {
    type?: DonationItemType
    photos: DonationItemPhoto[] =[]
}

class DropOffOutcome {
    acceptedItems: DonationItem[] = []
    pocName?: string
    pocPhone?: string
    pocConfirmed?: string
}

export class Donation extends Eventful {

    id?: string
    donationCode?: string;
    donationStatus?: DonationStatus

    date?: string
    formattedDate?: string
    partOfDay: string = 'am'
    timeSlot?: string

    spec: DonationSpec
    adjustedSpec: DonationSpec

    content?: DonationItem[]
    donor: Donor

    charity?: Charity
    primaryDropOff?: Charity
    secondaryDropOff?: Charity

    tpl?: TPLOgranization
    driver?: Driver

    primaryDropOffOutcome?: DropOffOutcome
    secondaryDropOffOutcome?: DropOffOutcome

    getEstimate(spec: DonationSpec) : number{
        const price = pricing.base
            + pricing.largeItems * (spec.largeItems || 0)
            + pricing.smallItems * (spec.smallItems || 0)
            + pricing.boxes * (spec.boxes || 0)
            + pricing.bags * (spec.bags || 0)
            + pricing.appliances * (spec.appliances || 0)
            + pricing.hazardous * (spec.hazardous || 0)
            + pricing.staircases * (spec.staircases || 0)
            + pricing.disassembly * (spec.disassembly || 0)
        return Math.round(price * 100) / 100
    }

    constructor() {
        super();
        this.donor = new Donor();
        this.spec = new DonationSpec()
        this.adjustedSpec = new DonationSpec()
    }
}