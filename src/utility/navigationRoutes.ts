import {Charity, Donation, TPLOrganization, Zone} from "../domain";

export const navigationRoutes = {
    allCharities: 'charities',
    createCharity: 'create-charity',
    charityDetails: (charity: Charity) => `/charities/${charity.id}`,

    donationDetails: (donation: Donation) => `/donations/${donation.id}`,

    createTPL: 'create-partner',
    editTPL: (tpl: TPLOrganization) => `/edit-partner/${tpl.id}`,
    tplDetails: (tpl: TPLOrganization) => `/partners/${tpl.id}`,

    zoneDetails: (zone: Zone) => `/zones/${zone.id}`
}
