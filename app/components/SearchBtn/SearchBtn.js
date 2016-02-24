import React from 'react';

import Dictionary from '../../libs/Dictionary.js';

require('./SearchBtn.scss');

const DEFAULT_LINK = 'javascript:void(0)';

export default class SearchBtn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            href: DEFAULT_LINK,
            enginesDict: this.getEnginesDict(props.engines),
            curEngine: localStorage.getItem("curEngine") 
                        ? JSON.parse(localStorage.getItem("curEngine")) 
                        : { "brand": "google", "link": "https://www.google.com/search?q=" }
        };
    }

    getEnginesDict(engines) {
        var enginesDict = new Dictionary();
        engines.map(function(item) {
            enginesDict.set(item.brand, item.link);
        });
        return enginesDict;
    }

    startToSearch(event) {
        var link = this.state.enginesDict.get(event.target.id) + this.props.inputval;
        this.setState({
            href: link
        });
    }

    changeSearchEngine(event) {
        // set state
        this.setState({
            curEngine: {
                "brand": event.target.id,
                "link": this.state.enginesDict.get(event.target.id)
            }
        });

        // init href
        this.setState({
            href: DEFAULT_LINK
        });

        // set localStorage
        localStorage.setItem("curEngine", JSON.stringify({
            "brand": event.target.id,
            "link": this.state.enginesDict.get(event.target.id)
        }));
    }

    _firstLetterToUpperCase(str) {
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }

    render() {
        var self = this,
            engines = this.props.engines,
            curEngine = this.state.curEngine;

        return (
            <div className="btn-group search-btn-container">
                <a href={self.state.href} id={curEngine.brand} className="btn btn-primary search-btn" onClick={self.startToSearch.bind(self)}>{curEngine.brand}</a>
                <a href="javascript:void(0)" data-target="#" className="btn dropdown-toggle btn-primary" data-toggle="dropdown">
                    <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                    {engines.map(function(item) {
                        var brand = self._firstLetterToUpperCase(item.brand);
                        return <li key={item.brand}><a href="javascript:void(0)" id={item.brand} onClick={self.changeSearchEngine.bind(self)}>{brand}</a></li>;
                    })}
                </ul>
            </div>
        )
    }
}
 