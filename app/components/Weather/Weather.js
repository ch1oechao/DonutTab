import React from 'react';

require('./Weather.scss');

const WEATHER_API = 'https://api.heweather.com/x3/weather';
const CITY_API = 'https://api.heweather.com/x3/citylist';
const KEY = 'ac32bea2133a4f849fc136a0ffae65dd';

const showStyle = {
    display: 'inline'
};
const hideStyle = {
    display: 'none'
};

export default class Weather extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            city: localStorage.getItem('curCity') ? localStorage.getItem('curCity') : 'Beijing',
            hasCity: true,
            pickday: this.props.pickday,
            foreWs: [],
            cityStyle: showStyle,
            inputStyle: hideStyle
        };
    }

    componentDidMount() {
        this.renderWeather(this.state.city);
    }

    _convertTime(time) {
        return time >= 10 ? time : '0' + time;;
    }

    renderWeather(city) {

        if (localStorage.getItem('curWeather')) {
            var curWeather = JSON.parse(localStorage.getItem('curWeather')),
                isCurCity = (curWeather.curCity === city),
                isDayOut = (+curWeather.foreWs[0].date.substr(-2) !== this._convertTime((new Date()).getDate()));

            if (isCurCity && !isDayOut) {
                
                this.setState(JSON.parse(localStorage.getItem('curWeather')));

            } else {

                this.getWeatherData(city);   
            
            }


        } else {

            this.getWeatherData(city);

        }

    }

    _getRightDate(foreWs) {
        foreWs.forEach((item, idx) => {
            if (+item.date.substr(-2) < this._convertTime((new Date()).getDate())) {
                foreWs.splice(idx, 1)
            }
        });

        return foreWs;
    }

    getWeatherData(city) {
        this._getCityWeather(city, (data) => {

            if (!data) {
                this.setState({
                    hasCity: false
                });
                return;
            }

            var weatherInfo = {
                hasCity: true,
                curCity: city,
                curTmp: data.curW.tmp,
                curCondTxt: data.curW.cond.txt,
                foreWs: this._getRightDate(data.foreWs),
                curPickWeather: this._getRightDate(data.foreWs)[this.props.pickIndex]
            };

            this.setState(weatherInfo);

            localStorage.setItem('curWeather', JSON.stringify(weatherInfo));

        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.pickIndex !== nextProps.pickIndex) {
            this.setState({
                curPickWeather: this._getPickWeather(nextProps.pickIndex)
            });
        }
    }

    cityClick(ev) {
        this.setState({
            cityVal: this.state.city,
            cityStyle: hideStyle,
            inputStyle: showStyle
        });
    }

    cityEdit(ev) {
        if (+ev.keyCode === 13) {
            this.setState({
                city: this.state.cityVal,
                cityStyle: showStyle,
                inputStyle: hideStyle
            });

            localStorage.setItem('curCity', this.state.cityVal);

            this.renderWeather(this.state.cityVal);
        }
    }

    cityChange(ev) {
        this.setState({cityVal: ev.target.value});
    }

    cityUnchange(ev) {
        this.setState({
            cityVal: '',
            cityStyle: showStyle,
            inputStyle: hideStyle
        })
    }

    _getPickWeather(idx) {
        return this.state.foreWs[idx];
    }

    _getCityWeather(cityVal, callback) {

        var self = this;

        $.ajax({
            url: WEATHER_API,
            data: {
                city: cityVal,
                key: KEY
            },
            success: (data) => {
                return data;
            },
            error: (err) => {
                throw err;
            }

        }).done((data) => {

            if (!data) return;

            var weather = data[Object.keys(data)[0]];
                
            weather = Array.isArray(weather) ? weather[0] : (() => { return; })();

            var cityInfo = weather.basic ? weather.basic : null,
                curWeather = weather.now ? weather.now : null,
                foreWeathers = Array.isArray(weather.daily_forecast) ? weather.daily_forecast : null;

            if (cityInfo && curWeather && foreWeathers) {

                var filterData = {
                    city: cityInfo,
                    curW: curWeather,
                    foreWs: foreWeathers
                };

                callback(filterData);

            } else {
                callback(false);
            }
        });

    }

    _getCityList(searchType) {
        return $.ajax({
            url: CITY_API,
            data: {
                search: searchType,
                key: KEY
            },
            success: (data) => {
                return data
            },
            error: (err) => {
                throw err;
            }
        })
    }

    _convertName(str) {
        if (str.length > 9) {
            return str.substring(0, 1).toUpperCase() + str.substring(1, 6) + '...'; 
        } else {
            return str.substring(0, 1).toUpperCase() + str.substring(1);   
        }
    }

    render() {

        var ts = this.state,
            hasCity = ts.hasCity,
            cityVal = ts.cityVal,
            curPickW = ts.curPickWeather,
            cityStyle = ts.cityStyle,
            inputStyle = ts.inputStyle,
            foreDate = curPickW ? curPickW.date.substring(5).split('-').join(' / ') : '';

        let noCityWeather = (<span className="weather-noinfo">Sorry. There's no {this._convertName(ts.city)}'s weather info.</span>);

        let renderCityWeather = (
                <div className="weather-info">
                    <p>
                        <span className="label label-success">Right now</span>
                        {ts.curTmp}℃ {ts.curCondTxt}
                    </p>
                    <p>
                        <span className="label label-info">{foreDate}</span>
                        {curPickW ? (curPickW.tmp.min + ' ~ ' + curPickW.tmp.max + '℃ ' + curPickW.cond.txt_d) : 'There is no more forecast.'}
                    </p>
                </div>
            );

        return (
            <div className="weather-container"> 
                <div className="weather-location form-group has-success">
                   <i className="fa fa-fw fa-map-marker"></i>
                   <span className="weather-city" style={cityStyle} onClick={this.cityClick.bind(this)}>{this._convertName(ts.city)}</span>
                   <input className="form-control input-sm weather-city-input" value={cityVal} style={inputStyle}
                        onChange={this.cityChange.bind(this)} 
                        onKeyDown={this.cityEdit.bind(this)}
                        onBlur={this.cityUnchange.bind(this)}  />
                </div>
                {hasCity ? renderCityWeather : noCityWeather}
            </div>
        );
    }
}