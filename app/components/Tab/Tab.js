import React from 'react';
import SearchBox from '../SearchBox/SearchBox.js';
import Bookmark from '../Bookmark/Bookmark.js';
import Tools from '../Tools/Tools.js';
import Clock from '../Clock/Clock.js';

require('./Tab.scss');

// Thanks for ihuan.me
const BING_IMG = 'http://ihuan.me/bing';

var tabStyle = {
    backgroundImage: 'url(' + BING_IMG + ')'
}

export default class Tab extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="donut-tab-container" style={tabStyle}>
                <SearchBox />
                <Clock />
                <Bookmark />
                <Tools />
            </div>
        );
    }
}

