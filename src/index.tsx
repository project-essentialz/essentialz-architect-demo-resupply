import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@zendeskgarden/css-bedrock';
import {ThemeProvider} from '@zendeskgarden/react-theming';
import DriverApp from "./DriverApp";
import DonorApp from "./DonorApp";
import CharityApp from "./CharityApp";

const getApp = () => {
    console.log(process.env)
    switch (process.env.REACT_APP_SLICE) {
        case 'driver':
            return <DriverApp/>
        case 'donor':
            return <DonorApp/>
        case 'charity':
            return <CharityApp/>
        default:
            return <App/>
    }
}
ReactDOM.render(
    <ThemeProvider>
        {getApp()}
    </ThemeProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
