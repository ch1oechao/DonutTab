import React from 'react';

require ('./SearchBox.scss');

export default class SearchBox extends React.Component {
  render() {
    return (
        <div className="searchbox-container">
            <div className="searchbox-content">
                <div className="form-group  label-floating">
                    <div className="searchbox-input">
                        <label className="control-label" htmlFor="focusedInput">Google</label>
                        <input type="text" value="" className="form-control" id="focusedInput" />
                    </div>
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="button">Search</button>
                    </span>
                </div>
            </div>
        </div>
    );
  }
}
