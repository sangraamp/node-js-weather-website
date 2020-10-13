const geocode = require('./geocode')
const request = require('request')
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fbe9b07377bf55e9252d10351a386afb&query=' + encodeURIComponent(latitude + ',' + longitude) + '&units=m'
    request({ url, json: true }, (error, { body } /*instead of that long response*/) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if (body.error) {
            callback('Unable to find location!')
        } else {
            const {current} = body 
            const {temperature, feelslike, weather_descriptions} = current
            callback(undefined, weather_descriptions[0] + '. It is currently ' + temperature + ' degrees out, and it feels like ' + feelslike + ' degrees.')
        }/* json=true parses the response JSON so we don't need to */
    })
}

module.exports = forecast

