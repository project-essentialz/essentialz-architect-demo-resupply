import { DonationsContainer } from "./donations.container";
import {BaseContainer} from "./base.container";
import {DonationContainer} from "./donation.container";
import {ValidateDonationContainer} from './validate-donation.container'
import {DonationPhotosContainer} from './donation-photos.container'
import {DropOffContainer} from "./drop-off.container";
import {LoginContainer} from "./login.container";
import {StartDonationContainer} from "./start-donation.container";
import {NotifyArrivalDonationContainer} from "./notify-arrival-donation.container";
import {AdjustTheQuoteDonationContainer} from "./adjust-the-quote-donation.container";
import {QuoteCalculatorDonationContainer} from "./quote-calculator-donation.container";
import {AwaitDonorAcceptanceDonationContainer} from "./await-donor-acceptance-donation.container";
import {QuoteAcceptedDonationContainer} from "./quote-accepted-donation.container";
import {AddPicturesDonationContainer} from "./add-pictures-donation.container";
import {PictureGaleryDonationContainer} from "./picture-gallery-donation.container";
import {LoadUpAndMoveOutDonationContainer} from "./load-up-and-move-out-donation.container";
import {PrimaryDropOffDonationContainer} from "./primary-drop-off-donation.container";
import {CompletedPrimaryDropOffDonationContainer} from "./completed-primary-drop-off-donation.container";

export const Driver = {
    BaseContainer,
    DonationsContainer,
    DonationContainer,
    ValidateDonationContainer,
    DonationPhotosContainer,
    DropOffContainer,
    LoginContainer,
    StartDonationContainer,
    NotifyArrivalDonationContainer,
    AdjustTheQuoteDonationContainer,
    QuoteCalculatorDonationContainer,
    AwaitDonorAcceptanceDonationContainer,
    QuoteAcceptedDonationContainer,
    AddPicturesDonationContainer,
    PictureGaleryDonationContainer,
    LoadUpAndMoveOutDonationContainer,
    PrimaryDropOffDonationContainer,
    CompletedPrimaryDropOffDonationContainer
}
