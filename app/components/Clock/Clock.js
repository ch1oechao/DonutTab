import React from 'react';

require("./Clock.scss");

export default class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            curTime: this._getCurTime()
        };
    }

    componentDidMount() {
        var self = this;

        setInterval(function(){
            self.setState({curTime: self._getCurTime()})
        }, 1000 / 60);

    }

    _getCurTime() {
        var self = this,
            curTime = new Date(),
            hour = curTime.getHours(),
            mins = this._convertTime(curTime.getMinutes()),
            secs = this._convertTime(curTime.getSeconds());

        return [hour, mins, secs].join(" : ");
    }

    _convertTime(time) {
        return time >= 10 ? time : '0' + time;
    }

    render() {
        return (
            <h2 className="clock-container">{this.state.curTime}</h2>
        );
    }
}
