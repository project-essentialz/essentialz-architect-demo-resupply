import React from 'react';
import {ThemeProvider} from '@zendeskgarden/react-theming';
import Api from "./services/api.service";
import appSlice from "./appSlice";
import CaptainApp from "./slices/CaptainApp";
import CharityApp from "./slices/CharityApp";
import DriverApp from "./slices/DriverApp";
import DonorApp from "./slices/DonorApp";

Api.configure('https://architect.rspl.dev')

const App = () => {
    return (
        <ThemeProvider>
            {appSlice.captain && (<CaptainApp/>)}
            {appSlice.charity && (<CharityApp/>)}
            {appSlice.driver && (<DriverApp/>)}
            {appSlice.donor && (<DonorApp/>)}
        </ThemeProvider>

    );
}

export default App;
