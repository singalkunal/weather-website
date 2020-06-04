const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia3VuYWxzIiwiYSI6ImNrYXh3NnZjcTBhNW0yem1hMTZjMGliOXMifQ.kgf1wJW53y_qN7Whqrn6Cw'
    
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services.', undefined)
        }
        else if(!body.features.length){
            callback('Invalid location. Try another search.', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
}

// geocode('Philadelphia', (err, data) => {
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log(data)
//     }
// })

module.exports = geocode