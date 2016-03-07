import React from 'react';
import SearchBox from '../SearchBox/SearchBox.js';
import Bookmark from '../Bookmark/Bookmark.js';
import Tools from '../Tools/Tools.js';
import Clock from '../Clock/Clock.js';
import Theme from '../Theme/Theme.js';

require('./Tab.scss');

// Thanks for ihuan.me
const BG_LINK = 'http://7xr6bj.com1.z0.glb.clouddn.com/';

export default class Tab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tabStyle: {
                backgroundImage: 'url(' + BG_LINK + this._genRandomNum() + '.jpg)'
            },
            tabClass: JSON.parse(localStorage.getItem('curIsDark')) ? 'donut-tab-container light-font' : 'donut-tab-container dark-font'
        }
    }

    _genRandomNum() {
        var randomNum = Math.floor(Math.random() * 100) + 1;

        return randomNum < 10 ? ('0' + randomNum) : randomNum;
    }

    handleCallback(res) {
        this.setState({
            tabClass: res ? 'donut-tab-container light-font' : 'donut-tab-container dark-font'
        });
    }

    render() {
        var tabStyle = this.state.tabStyle,
            tabClass = this.state.tabClass;

        return (
            <div className={tabClass} style={tabStyle}>
                <Tools />
                <Clock />
                <SearchBox />
                <Theme onChangeTheme={this.handleCallback.bind(this)} />
            </div>
        );
    }
}

