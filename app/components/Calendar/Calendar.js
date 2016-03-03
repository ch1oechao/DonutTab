import React from 'react';
import Weather from '../Weather/Weather.js';

require('./Calendar.scss');

const WEEKS = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default class Calendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            curDateVal: this._getDateVal(),
            curWeeks: [],
            pickWeek: ''
        };
    }

    componentDidMount() {

        let curWeeks = this._genCurWeek(this._getDateVal());

        this.setState({
            curWeeks: curWeeks,
            pickWeek: this._getDateVal().week
        });

    }

    weekClick(ev) {
        let pickWeek = +ev.target.getAttribute('data-week');
        this.weekChange(pickWeek);        
    }

    weekChange(week) {
        this.setState({
            pickWeek: week
        });
    }

    _getDateVal() {
        var self = this,
            curTime = new Date(),
            day = curTime.getDate(),
            month = curTime.getMonth(),
            year = curTime.getFullYear(),
            week = curTime.getDay();

        return {
            year: year,
            month: month,
            day: day,
            week: week
        };
    }

    _getMonthLen(month, year) {
        switch(month + 1) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                return 31;
            break;
            case 4:
            case 6:
            case 9: 
            case 11: 
                return 30;
            break;
            case 2: 
                if ((year % 100 === 0 && year % 400 === 0) 
                    || (year % 100 !== 0 && year % 4 === 0)) {
                    return 29;
                } else {
                    return 28;
                }
            break;
        }
    }

    _genCurWeek(time) {
        var weekLen = 7,
            curDay = time.day || this._getDateVal().day,
            curWeek = +(time.week + '' || this._getDateVal().week),
            curMonth = +(time.month + '' || this._getDateVal().month),
            curYear = time.year || this._getDateVal().year,
            weekArr = [],
            beforeDay = curDay - curWeek, 
            afterDay = curDay,
            firstDay = 1,
            lastDay = this._getMonthLen(curMonth, curYear);

        for (var i = 0; i < weekLen; i++) {
            if (i < curWeek) {
                if (beforeDay > 0) {
                    weekArr.push(beforeDay);
                    beforeDay += 1;
                } else {
                    weekArr.push('');
                    beforeDay += 1;
                }
            }
            else if (i > curWeek) {
                if (afterDay < lastDay) {
                    afterDay += 1;
                    weekArr.push(afterDay);
                } else {
                    weekArr.push(firstDay++);
                }
            }
        }

        weekArr.splice(curWeek, 0, curDay);

        return weekArr;
    }

    _convertTime(time, type) {

        var timeTmp = '';

        switch(type) {
            case 'week':
                timeTmp = WEEKS[time];
            break;
            case 'month':
                timeTmp = MONTHS[time];
            break;
            case 'hour':
            case 'min':
            case 'sec':
            default:
                timeTmp = time >= 10 ? time : '0' + time;
            break;
        }

        return timeTmp;
    }

    render() {
        var self = this,
            curDateVal = this.state.curDateVal,
            curWeeks = this.state.curWeeks,
            pickWeek = this.state.pickWeek;

        return (
            <div className="calendar-container">
                <h3 className="calendar-head">
                    <i className="fa fa-fw fa-calendar-o"></i>
                    <span className="calendar-title"> {curDateVal.year} {this._convertTime(curDateVal.month, 'month')} <small>{this._convertTime(curDateVal.day, 'day')}</small></span>
                </h3>
                <ul className="calendar-week clearfix">
                    {WEEKS.map((item, idx) => {
                        return (
                            <li key={idx}>{item}</li>
                        )
                    })}
                </ul>
                <ul className="calendar-week clearfix">
                    {curWeeks.map((item, idx) => {
                        return (
                            <li key={idx}>
                                {item 
                                    ? (<span className={pickWeek === idx ? 'active' : ''} data-week={idx} onClick={self.weekClick.bind(self)}>{item}</span>) 
                                    : item
                                }
                            </li>
                        )
                    })}
                </ul>
                <Weather pickIndex={pickWeek - curDateVal.week} />
            </div>
        );
    }
}