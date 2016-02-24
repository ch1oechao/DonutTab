import React from 'react';
import SearchBtn from '../SearchBtn/SearchBtn.js';

require ('./SearchBox.scss');

const DEFAULT_ENGINE = {
    "brand": "Google",
    "link": "https://www.google.com/search?q="
};

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
        "brand": "知乎",
        "link": "https://www.zhihu.com/search?q="
    }];

export default class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            value: '',
            inputName: 'q',
            engines: searchEngines
        };
    }

    _getCurEngine() {
        var localEngine = JSON.parse(localStorage.getItem('curEngine'));
        return localEngine ? localEngine : DEFAULT_ENGINE;
    }

    _changeInputName(brand) {
        if (brand.toLowerCase() === 'baidu') {
            this.setState({
                inputName: 'wd'
            })
        } else {
            this.setState({
                inputName: 'q'
            })
        }
    }

    handleChange(ev) {
        this.setState({value: ev.target.value});
    }

    handleKeyDown(ev) {
        if (+ev.keyCode === 13) {
            var link = this._getCurEngine().link + this.state.value,
                brand = this._getCurEngine().brand,
                $form = document.getElementById('searchForm');

            this._changeInputName(brand);

            $form.method = 'get';
            $form.action = link;
            $form.submit();
        }
    }

    render() {
        var value = this.state.value,
            name = this.state.inputName,
            engines = this.state.engines,
            curEngine = this.state.curEngine;

        return (
            <div className="searchbox-container">
                <div className="searchbox-content">
                    <form className="form-group  label-floating" name="searchForm" id="searchForm">
                        <div className="searchbox-input">
                            <input type="text" value={value} name={name} className="form-control" 
                                autoComplete="off" 
                                onChange={this.handleChange.bind(this)}
                                onKeyDown={this.handleKeyDown.bind(this)} />
                        </div>
                        <SearchBtn engines={engines} inputval={value} />
                    </form>
                </div>
            </div>
        );
    }
}
