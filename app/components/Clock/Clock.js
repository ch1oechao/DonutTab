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

        return [hour, mins].join(" : ");
    }

    _convertTime(time) {
        return time >= 10 ? time : '0' + time;
    }

    render() {
        return (
            <div className="clock-container">
                <h2 className="clock-time">{this.state.curTime}</h2>
            </div>
        );
    }
}
