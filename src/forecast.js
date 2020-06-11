const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a9774460d8c4d50b63c764fae9aa4b45&query=' + longitude + ',' + latitude

    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            
            let res = `Place: ${body.location.name}, Country: ${body.location.country}`
           res += body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain. '
         let obj = {
             name:body.location.name,
             country: body.location.country,
             weather: body.current.weather_descriptions[0],
             temperature: body.current.temperature,
             precip:body.current.precip

         }
     
            callback(undefined, obj)
        }
    })
}

module.exports = forecast