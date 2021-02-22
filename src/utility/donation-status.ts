export const donationStatus = [
    'submitted',
    'service_request_dispatched',
    'driver_assigned',
    'driver_en_route',
    'driver_arrived',
    'quote_sent',
    'payment_successful',
    'primary_drop',
    'completed'
]
export const nextState = (currentState: string):string => {
    return donationStatus[donationStatus.indexOf(currentState) + 1]
}

export const donationActions = {
    'submitted': '',
    'service_request_dispatched': '',
    'driver_assigned': 'Start the job',
    'driver_en_route': 'Notify arrival',
    'driver_arrived': 'Send quote to customer',
    'quote_sent': 'Waiting for the confirmation',
    'payment_successful': 'Proceed to primary drop-off point',
    'primary_drop': 'Finish drop-off',
    'completed': 'Get further instructions',
}
