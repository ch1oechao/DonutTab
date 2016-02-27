import React from 'react';
import SearchBox from '../SearchBox/SearchBox.js';
import Bookmark from '../Bookmark/Bookmark.js';
import Tools from '../Tools/Tools.js';
import Clock from '../Clock/Clock.js';
import Theme from '../Theme/Theme.js';

require('./Tab.scss');

// Thanks for ihuan.me
const BING_IMG = 'http://ihuan.me/bing';

export default class Tab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tabStyle: {
                backgroundImage: 'url(' + BING_IMG + ')'
            }
        }
    }

    handleCallback(res) {
        this.setState({
            tabStyle: {
                backgroundImage: 'url(' + BING_IMG + ')',
                color: res ? '#212121' : '#FFF'
            }
        })
    }

    render() {
        var tabStyle = this.state.tabStyle;

        return (
            <div className="donut-tab-container" style={tabStyle}>
                <Clock />
                <SearchBox />
                <Bookmark />
                <Tools />
                <Theme onChangeTheme={this.handleCallback.bind(this)} />
            </div>
        );
    }
}

