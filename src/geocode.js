const request = require('request')




const geocode = (address, callback) => {
    const mapbox_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicHJpeWFuay0yNjA4IiwiYSI6ImNrYXl6b2ZoMjAyMTEycXBrZjZ6d2V1YmMifQ.K_aljhrlsIX3-eJFWLFC4g'
    request({url: mapbox_url, json: true}, (error, {body}={})=>{        //used object destructuring 

        if(error)
    {
        callback('Unable to connect to the location services',undefined)
        
    }
    else if(body.message)
    {
        callback('Location not valid or not provided',undefined)
    }
    else if(body.features.length === 0)
    {
        callback('No matching result found for the given location',undefined)
    }
    else
    {
      
    callback(undefined,{
         latitude : body.features[0].center[0],
         longitude : body.features[0].center[1],
         location: body.features[0].place_name
    })
    }

    })


}

module.exports = geocode 
