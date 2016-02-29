import React from 'react';

require('./Calendar.scss');

const weeks = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default class Calendar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {

	}

	_getCurDate() {
        var self = this,
            curTime = new Date(),
            week = curTime.getDay(),
            day = this._convertTime(curTime.getDate()),
            month = this._convertTime(curTime.getMonth() + 1),
            year = curTime.getFullYear();

        return [year, month, day].join(' / ') + ' ' + weeks[week];
    }

    _convertTime(time) {
        return time >= 10 ? time : '0' + time;
    }

	render() {

		var date = this._getCurDate();

		return (
			<div className="calendar-container">
				<span>{date}</span>
			</div>
		);
	}
}