export const getDonationCode = (state: string, charityCode: string) => {
    const currentMonth = new Date().getMonth();
    const randomNumber = Math.round(Math.random()*1000);
    return `${state}-${charityCode}${currentMonth > 9 ? currentMonth : '0'+currentMonth}${randomNumber}`
}
