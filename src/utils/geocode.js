const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FuZ3JhYW1wIiwiYSI6ImNrZnh5YW4zZDI0bDQyc216dDRpZHQ0OWwifQ.-0R7QXPpSMWAlLsLi-KBmg&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location, try another search!', undefined)
        } else {
            const { center, place_name } = body.features[0]
            const callbackResponse = {
                latitude: center[1],
                longitude: center[0],
                place_name
            }
            callback(undefined, callbackResponse)
        }
    })
}

module.exports = geocode