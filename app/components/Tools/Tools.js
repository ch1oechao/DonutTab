import React from 'react';
import Bookmark from '../Bookmark/Bookmark.js';
import Calendar from '../Calendar/Calendar.js';
import Weather from '../Weather/Weather.js';

require("./Tools.scss");

export default class Tools extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isFold: false
		};
	}

	btnClick(ev) {
        this.setState({
            isFold: !this.state.isFold
        });
    }

    render() {

    	var toolConClass = 'tools-container',
    		isFold = this.state.isFold;

        return (
            <div className={toolConClass += isFold ? ' fold' : ' unfold'}>
            	<div className="container">
            		<div className="row">
            			<div className="col-md-9">
            				<Bookmark />
            			</div>
            			<div className="col-md-3">
            				<Calendar />
            				<Weather />
            			</div>
            		</div>
            	</div>
                <div className="tools-btn" onClick={this.btnClick.bind(this)}>
                    <i className="fa fa-star"></i>
                </div>
            </div>
        );
    }
}
