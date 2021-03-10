const appSlice = () => {
    return process.env.REACT_APP_SLICE
}

export default {
    captain: appSlice() === 'captain',
    charity: appSlice() === 'charity',


}