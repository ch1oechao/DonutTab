import React from 'react';

require("./Clock.scss");

export default class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            isTiming: false,
            timeState: ''
        };
    }

    componentDidMount() {
        var self = this;

        setInterval(function(){
            self.setState({
                curHour: self._getCurTime().hour,
                curMins: self._getCurTime().mins
            })
        }, 1000 / 60);

    }

    _getCurTime() {
        var curTime = new Date(),
            hour = this._convertTime(curTime.getHours(), 'hour'),
            mins = this._convertTime(curTime.getMinutes()),
            secs = this._convertTime(curTime.getSeconds());

        return { 
            hour: hour,
            mins: mins
        };
    }

    _convertTime(time, type) {

        if (type === 'hour' && this.state.timing) {
            this.setState({
                timeState: time > 12 ? 'PM' : 'AM'
            });

            time = time > 12 ? time - 12 : time;
        }

        return time >= 10 ? time : '0' + time;
    }

    changeTiming() {
        this.setState({
            timing: !this.state.timing
        });
    }

    render() {
        return (
            <div className="clock-container">
                <h2 className="clock-time" onClick={this.changeTiming.bind(this)}>
                    {this.state.curHour}<small>{this.state.timing ? this.state.timeState : ''}</small> : {this.state.curMins}
                </h2>
            </div>
        );
    }
}
