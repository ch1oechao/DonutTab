import React from 'react';

require("./Clock.scss");

export default class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            curTime: this._getCurTime()
        };
    }

    _getCurTime() {
        var self = this,
            curTime = new Date(),
            hour = curTime.getHours(),
            mins = this._convertTime(curTime.getMinutes()),
            secs = this._convertTime(curTime.getSeconds());

        return [hour, mins, secs].join(" : ");

        setTimeout(function() {
            self._getCurTime();
        }, 1000);
    }

    _convertTime(time) {
        return time > 10 ? time : '0' + time;
    }

    render() {
        return (
            <h2 className="clock-container">{this.state.curTime}</h2>
        );
    }
}
