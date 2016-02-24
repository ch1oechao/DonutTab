import React from 'react';
import SearchBtn from '../SearchBtn/SearchBtn.js';

require ('./SearchBox.scss');

var searchEngines = [{
        "brand": "Google",
        "link": "https://www.google.com/search?q="
    }, {
        "brand": "Baidu",
        "link": "http://www.baidu.com/s?wd="
    }, {
        "brand": "GitHub",
        "link": "https://github.com/search?q="
    }, {
        "brand": "微博",
        "link": "http://s.weibo.com/weibo/"
    }, {
        "brand": "知乎",
        "link": "https://www.zhihu.com/search?q="
    }];

export default class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            value: '',
            engines: searchEngines
        };
    }

    handleChange(ev) {
        this.setState({value: ev.target.value});
    }

    render() {
        var value = this.state.value,
            engines = this.state.engines,
            curEngine = this.state.curEngine;

        return (
            <div className="searchbox-container">
                <div className="searchbox-content">
                    <div className="form-group  label-floating">
                        <div className="searchbox-input">
                            <input type="text" value={value} className="form-control" onChange={this.handleChange.bind(this)} />
                        </div>
                        <SearchBtn engines={engines} inputval={value} />
                    </div>
                </div>
            </div>
        );
    }
}
