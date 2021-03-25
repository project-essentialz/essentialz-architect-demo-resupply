export class DonationSpec {
    largeItems: number = 0
    smallItems: number = 0
    bags: number = 0
    boxes: number = 0
    appliances: number = 0
    hazardous: number = 0

    aboveTheGroundFloor: 'no' | 'yes' | 'yes-elevator' | 'yes-curbside' = 'no'
    staircases: number = 0
    disassembly: number = 0

    additionalInformation: string = ''
}
