import React from 'react';

import Dictionary from '../../libs/Dictionary.js';

require ('./SearchBox.scss');

const DEFAULT_LINK = 'javascript:void(0)';

const DEFAULT_ENGINE = {
    "brand": "Google",
    "action": "https://www.google.com/search",
    "name": "q"
};

var searchEngines = [DEFAULT_ENGINE, 
    {
        "brand": "Baidu",
        "action": "http://www.baidu.com/s",
        "name": "wd"
    }, {
        "brand": "GitHub",
        "action": "https://github.com/search",
        "name": "q"
    }, {
        "brand": "知乎",
        "action": "https://www.zhihu.com/search",
        "name": "q"
    }, {
        "brand": "bilibili",
        "action": "http://search.bilibili.com/all",
        "name": "keyword"
    }];

export default class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            value: '',
            engines: searchEngines,
            curEngine: this._getCurEngine(),
            enginesDict: this._getEnginesDict(searchEngines)
        };
    }

    _getCurEngine() {
        var localEngine = JSON.parse(localStorage.getItem('curEngine'));
        return localEngine ? localEngine : DEFAULT_ENGINE;
    }

    handleChange(ev) {
        this.setState({value: ev.target.value});
    }

    handleKeyDown(ev) {
        if (+ev.keyCode === 13) {
            var $form = document.getElementById('searchForm');

            $form.submit();
        }
    }

    _getEnginesDict(engines) {
        var enginesDict = new Dictionary();
        engines.map(function(item) {
            enginesDict.set(item.brand, item);
        });
        return enginesDict;
    }

    changeSearchEngine(event) {

        var changeEngine = this.state.enginesDict.get(event.target.id);

        // set state
        this.setState({curEngine: changeEngine});

        // set localStorage
        localStorage.setItem("curEngine", JSON.stringify(changeEngine));
    }

    _firstLetterToUpperCase(str) {
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }

    render() {
        var self = this,
            value = this.state.value,
            engines = this.state.engines,
            curEngine = this.state.curEngine;

        return (
            <div className="searchbox-container">
                <div className="searchbox-content">
                    <form className="form-group  label-floating" name="searchForm" id="searchForm" action={curEngine.action}>
                        <div className="searchbox-input">
                            <input type="text" value={value} name={curEngine.name} className="form-control" 
                                autoComplete="off" 
                                onChange={this.handleChange.bind(this)}
                                onKeyDown={this.handleKeyDown.bind(this)} />
                        </div>
                        <div className="btn-group search-btn-container">
                            <input type="submit" className="btn btn-primary search-btn" value={this._firstLetterToUpperCase(curEngine.brand)} />
                            <a href={DEFAULT_LINK} data-target="#" className="btn dropdown-toggle btn-primary" data-toggle="dropdown">
                                <span className="caret"></span>
                            </a>
                            <ul className="dropdown-menu">
                                {engines.map(function(item) {
                                    var brand = self._firstLetterToUpperCase(item.brand);
                                    return (<li key={item.brand}>
                                                <a href={DEFAULT_LINK} id={item.brand} onClick={self.changeSearchEngine.bind(self)}>{brand}</a>
                                            </li>);
                                })}
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
