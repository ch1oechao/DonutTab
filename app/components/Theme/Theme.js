import React from 'react';

require('./Theme.scss');

const LIGHT_ICON = (
        <span className="theme-icon theme-light">
            <i className="fa fa-sun-o"></i> 
        </span>
    );
const DARK_ICON = (
        <span className="theme-icon theme-dark">
            <i className="fa fa-moon-o"></i>
        </span>
    );
const LIGHT_STYLE = {
    background: 'rgba(255, 255, 255, .16)'
}
const DARK_STYLE = {
    background: 'rgba(0, 0, 0, .16)'
}

export default class Theme extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isDark: JSON.parse(localStorage.getItem('curIsDark')) ? true : false
        }
    }

    componentDidMount() {
        this.props.onChangeTheme(!this.state.isDark);
    }

    handleClick(ev) {

        var isDark = this.state.isDark;

        // change icon
        this.setState({
            isDark: !isDark
        });

        // set local
        localStorage.setItem('curIsDark', !isDark);

        this.props.onChangeTheme(isDark);
    }


    render() {
        var isDark = this.state.isDark,
            themeStyle = isDark ? DARK_STYLE : LIGHT_STYLE;

        return (
            <div className="theme-container" style={themeStyle}>
                <div onClick={this.handleClick.bind(this)}>
                    {isDark ? DARK_ICON : LIGHT_ICON}
                </div>
            </div>
        );
    }

}
