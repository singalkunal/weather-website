const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/91c331dfca3413f2c947dcc3e2ae1d4c/' + latitude + ',' + longitude + '?units=si'

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unabel to connect to weather services.', undefined)
        } else if(body.error){
            callback('Unable to find location.', undefined)
        }else {
            const currently = body.currently
            callback(undefined, body.daily.data[0].summary + ' There is ' + currently.temperature + ' degrees out. The high today is ' + body.daily.data[0].temperatureHigh  + ' with a low of ' + body.daily.data[0].temperatureLow + '. There is ' + (currently.precipProbability*100) + '% chances of rain.')
        }
    })
}

module.exports = forecast