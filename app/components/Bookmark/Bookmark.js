import React from 'react';

require("./Bookmark.scss");

const showStyle = {
    display: 'inline'
};
const hideStyle = {
    display: 'none'
};

var DefaultLinks = [{
    "link": "https://github.com/",
    "name": "GitHub"
}, {
    "link": "http://www.imooc.com/",
    "name": "Imooc"
}, {
    "link": "http://www.uisdc.com/",
    "name": "优设"
}, {
    "link": "https://dribbble.com/",
    "name": "dribbble"
}, {
    "link": "http://www.bootcdn.cn/",
    "name": "BootCDN"
}, {
    "link": "http://www.panc.cc/",
    "name": "胖次"
}];

export default class Bookmark extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isFold: true,
            bookName: localStorage.getItem('curBookTitle') ? localStorage.getItem('curBookTitle') : 'Bookmark',
            titleVal: localStorage.getItem('curBookTitle') ? localStorage.getItem('curBookTitle') : 'Bookmark',
            titleStyle: showStyle,
            inputStyle: hideStyle,
            bookLinks: this._getBookLinks(),
            addNameVal: '',
            addLinkVal: ''
        }
    }

    _getBookLinks() {
        var bookLinks = localStorage.getItem('curBookLinks');
        if (!bookLinks) {
            localStorage.setItem('curBookLinks', JSON.stringify(DefaultLinks));
        }
        return JSON.parse(localStorage.getItem('curBookLinks'));
    }

    titleClick(ev) {
        this.setState({
            titleVal: this.state.bookName,
            titleStyle: hideStyle,
            inputStyle: showStyle
        })
    }

    titleChange(ev) {
         this.setState({titleVal: ev.target.value ? ev.target.value : '-'});
    }

    titleEdit(ev) {
        if (+ev.keyCode === 13) {
            this.setState({
                bookName: this.state.titleVal,
                titleStyle: showStyle,
                inputStyle: hideStyle
            });
            localStorage.setItem('curBookTitle', this.state.titleVal);
        }
    }

    renderAdd(name, link) {
        this.setState({
            addNameVal: name ? name : '',
            addLinkVal: link ? link : ''
        });
    }

    renderLinks(links) {
        this.setState({
            bookLinks: links,
        });
        localStorage.setItem('curBookLinks', JSON.stringify(links));
    }

    addOpen(ev) {
        $(this.refs.addPanel).show();
        this.renderAdd();
    }

    addSave(ev) {
        var localBookLinks = this._getBookLinks(),
            newItem = {
                "name": this.state.addNameVal,
                "link": this.state.addLinkVal
            };

        localBookLinks.map((item, idx) => {
            if (item.name === newItem.name) {
                localBookLinks.splice(idx, 1)
            }
        });

        localBookLinks.push(newItem);

        this.renderLinks(localBookLinks);
        
        this.addClose();
    }

    addClose(ev) {
        $(this.refs.addPanel).hide();
        this.renderAdd();
    }

    addNameChange(ev) {
         this.setState({addNameVal: ev.target.value});
    }

    addLinkChange(ev) {
         this.setState({addLinkVal: ev.target.value});
    }

    deleteLink(ev) {
        var delItem = {
            name: ev.target.getAttribute('data-name')
        };
        let links = this._getBookLinks();
        links.map((item, idx) => {
            if (item.name === delItem.name) {
                links.splice(idx, 1);
            }
        });

        this.renderLinks(links);
    }

    editLink(ev) {
        var self = this,
            editItem = {
            name: ev.target.getAttribute('data-name')
        };
        let links = this._getBookLinks();

        links.map((item, idx) => {
            if (item.name === editItem.name) {
                self.addOpen();
                this.setState({
                    addNameVal: item.name,
                    addLinkVal: item.link
                })
            }
        });
    }

    btnClick(ev) {
        this.setState({
            isFold: !this.state.isFold
        });
    }

    _firstLetterToUpperCase(str) {
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }


    render() {

        var self = this,
            isFold = this.state.isFold,
            bookConClass = 'bookmark-container',
            bookName = this.state.bookName,
            titleVal = this.state.titleVal,
            titleStyle = this.state.titleStyle,
            inputStyle = this.state.inputStyle,
            bookLinks = this.state.bookLinks,
            addNameVal = this.state.addNameVal,
            addLinkVal = this.state.addLinkVal;

        return (
            <div className={bookConClass += isFold ? ' fold' : ' unfold'}>
                <div className="bookmark-content">
                    <div className="container">
                        <div className="bookmark-head">
                            <h3 className="form-group has-success">
                                <i className="fa fa-bookmark-o fa-fw"></i>
                                <span className="book-title" 
                                    onClick={this.titleClick.bind(this)}
                                    style={titleStyle}> {bookName}</span>
                                <input className="form-control book-input" 
                                    value={titleVal} style={inputStyle}
                                    onChange={this.titleChange.bind(this)}
                                    onKeyDown={this.titleEdit.bind(this)} />
                            </h3>
                        </div>
                        <div className="book-body row">
                            {bookLinks.map((item, idx) => {
                                var linkName = self._firstLetterToUpperCase(item.name);
                                return (
                                    <div className="col-md-2" key={idx}>
                                        <i className="fa fa-fw fa-ellipsis-h link-setting del" data-name={item.name} onClick={this.deleteLink.bind(this)} title="DEL"></i>
                                        <a href={item.link} className="book-link">{linkName}</a>
                                        <i className="fa fa-fw fa-ellipsis-v link-setting edit" data-name={item.name} onClick={this.editLink.bind(this)} title="EDIT"></i>
                                    </div>
                                )
                            })}
                            <div className="col-md-2">
                                <a href="javascript:void(0)" 
                                    className="book-link"
                                    onClick={this.addOpen.bind(this)}><i className="fa fa-plus fa-fw"></i></a>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="book-edit container" ref="addPanel">
                    <div className="well">
                        <div className="form-group">
                            <label className="book-label" htmlFor="bookLabel"><i className="fa fa-tag"></i></label>
                            <input className="form-control book-link-input name" 
                                value={addNameVal} id="bookLabel" onChange={this.addNameChange.bind(this)} />
                        </div>
                        <div className="form-group">
                            <label className="book-label" htmlFor="bookLink"><i className="fa fa-link"></i></label>
                            <input className="form-control book-link-input link" 
                                value={addLinkVal}  id="bookLink" onChange={this.addLinkChange.bind(this)} />
                        </div>
                        <div className="form-group">
                            <a href="javascript:void(0)" 
                                className="btn btn-primary"
                                onClick={this.addSave.bind(this)}>Save</a>
                        </div>
                        <span className="well-close" onClick={this.addClose.bind(this)}><i className="fa fa-times"></i></span>
                    </div>                                    
                </div>
                <div className="bookmark-btn" onClick={this.btnClick.bind(this)}>
                    <i className="fa fa-star"></i>
                </div>
            </div>
        );
    }
}
