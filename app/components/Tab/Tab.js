import React from 'react';
import SearchBox from '../SearchBox/SearchBox.js';
import Bookmark from '../Bookmark/Bookmark.js';
import Tools from '../Tools/Tools.js';
import Clock from '../Clock/Clock.js';

require('./Tab.scss');

export default class Tab extends React.Component {
    render() {
        return (
            <div className="donut-tab-container">
                <SearchBox />
                <Clock />
                <Bookmark />
                <Tools />
            </div>
        );
    }
}
