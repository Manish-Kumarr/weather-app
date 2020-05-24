const request = require('request')

const geoCode = (address, callback) =>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ address +".json?access_token=pk.eyJ1IjoibWFuaXNoa2siLCJhIjoiY2thanB5Njc3MDk3NTJxbzZ3aHI3eXJwZSJ9.95ZMeanlD9w26u3kFLpo6g&limit=1"

    request({url, json:true}, (error, {body})=>{
        if(error){
            callback("Check your connection",undefined)
        }else if(body.message){
            callback("Unable to find location !",undefined)
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }    
    })
}

module.exports = geoCode