import React from 'react';
import Calendar from '../Calendar/Calendar.js';
import Weather from '../Weather/Weather.js';

require("./Tools.scss");

export default class Tools extends React.Component {
    render() {
        return (
            <div className="tools-container">
                <Calendar />
                <Weather />
            </div>
        );
    }
}
