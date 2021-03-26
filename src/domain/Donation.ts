import {Eventful} from "./Eventful";
import {Charity} from "./Charity";
import {Driver} from "./Driver";
import {Donor} from "./Donor";
import {pricing} from "../utility/pricing";
import {TPLOrganization} from "./TPLOrganization";
import {StaticContent} from "./StaticContent";
import {getDonationCode} from "../utility/donation-code";
import {DonationSpec} from "./DonationSpec";

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

class DonationItem {
    type?: DonationItemType
    photos: StaticContent[] = []
}

class DropOffOutcome {
    acceptedItems: DonationItem[] = []
    pocName?: string
    pocPhone?: string
    pocConfirmed?: boolean
}

export class Donation extends Eventful {
    versionNo: string = '1.0' // TODO: Think about this convention

    id?: string
    donationStatus: DonationStatus = DonationStatus.submitted
    donationCode: string = '';

    /**
     * Donation Request Fields
     */

    private _date?: string      // Specified by the donor
    partOfDay: string = 'am'    // Specified by the donor
    spec: DonationSpec          // Specified by the donor

    formattedDate: string = ''  // Autogenerated based on date entry

    /** END-OF Donation Request Fields **/

    adjustedSpec: DonationSpec  // Donation specification adjusted by the driver

    timeSlot?: string           // Service request time slot assigned by the scheduler

    content?: DonationItem[]    // Driver created content based on the type and photos
    donor: Donor                // Donor information

    private _charity?: Charity          // Charity that Donor picked / Donation request originated from
    primaryDropOff?: Charity            // Same as charity field unless overwritten by the scheduler
    secondaryDropOff?: Charity          // Inferred from the primaryDropOff unless overwritten by the scheduler

    tplOrganization?: TPLOrganization   // 3PL Organization that is handling donation pickup
    driver?: Driver                     // Driver that is assigned to the pickup

    primaryDropOffOutcome?: DropOffOutcome      // What items were accepted at the first charity
    secondaryDropOffOutcome?: DropOffOutcome    // What items were accepted at the second charity

    constructor() {
        super();
        this.donor = new Donor();
        this.spec = new DonationSpec()
        this.adjustedSpec = new DonationSpec()
    }

    /**
     * getEstimate(spec: {@link DonationSpec})
     *
     * Calculate the value of the donation pickup estimate based
     * on the specification provided.
     *
     * @public
     * @param spec
     * @returns number
     */

    public static getEstimate(spec: DonationSpec): number {
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

    get date(): string | undefined {
        return this._date;
    }

    set date(value: string | undefined) {
        this._date = value;
        if (value) {
            this.formattedDate = value
        }
    }

    get charity(): Charity | undefined {
        return this._charity;
    }

    set charity(value: Charity | undefined) {
        this._charity = value;

        // TODO: Either verify that these fields are set during the charity creation or fail here

        /**
         * Define DonationCode based on the DonationCode anatomy
         */
        if (value && value.code && value.state){
            //TODO: Keep in TD list
            this.donationCode = getDonationCode(value.state, value.code)
        }

        /**
         * Define primary and secondary DropOffs
         */
        if (value){
            this.primaryDropOff = value
            this.secondaryDropOff = value.secondaryDropOff
        }
    }


}
