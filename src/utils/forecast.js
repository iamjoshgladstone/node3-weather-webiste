const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=362c25853f055757107d8d42084a284a&query=' + longitude +',' + latitude +''
    request({url, json:true}, (error, response)=> {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (response.body.error) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current['temperature'] + ' outside. There is a ' + response.body.current['precip'] + '% chance of rain tonight.')
        }
    })
}

module.exports = forecast