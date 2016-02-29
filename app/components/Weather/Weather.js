import React from 'react';

require('./Weather.scss');

const WEATHER_API = 'https://api.heweather.com/x3/weather';
const CITY_API = 'https://api.heweather.com/x3/citylist';
const KEY = 'ac32bea2133a4f849fc136a0ffae65dd';

export default class Weather extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        var defaultCityName = localStorage.getItem('curCity') ? localStorage.getItem('curCity') : 'shaoyang',
            defaultSearchType = 'allchina';

        this._getCityWeather(defaultCityName, (data) => {

            if (!data) return; 

            this.setState({
                city: data.city.city,
                curTmp: data.curW.tmp,
                curCondTxt: data.curW.cond.txt,
                tomTempMin: data.tomW.tmp.min,
                tomTempMax: data.tomW.tmp.max,
                tomCondTxt: data.tomW.cond.txt_d
            })
        });

    }

    _getCityWeather(cityName, callback) {
        
        $.ajax({
            url: WEATHER_API,
            data: {
                city: cityName,
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
                tomorrowWeather = Array.isArray(weather.daily_forecast) ? weather.daily_forecast[0] : null;

            if (cityInfo && curWeather && tomorrowWeather) {

                var filterData = {
                    city: cityInfo,
                    curW: curWeather,
                    tomW: tomorrowWeather
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

    render() {

        var ts = this.state;

        return (
            <div className="weather-container"> 
                <div className="weather-city">
                    {ts.city} <span>{ts.curTmp}℃ {ts.curCondTxt}</span>
                </div>
                <div>明日 {ts.tomTempMin} - {ts.tomTempMax}℃ {ts.tomCondTxt}</div>
            </div>
        );
    }
}