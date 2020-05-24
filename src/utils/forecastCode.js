const request = require('request')

const forecastCode = ( latitude,longitude, callback) =>{
    const API = "69767795771243a927f54d6744ecf024"
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API}`
        request({url, json:true}, (error,{body})=>{
            if(error){
                callback("Check your connection!",undefined)
            }
            else if(body.message){
                callback("Unable to find location!",undefined)
            }else{
                callback(undefined,'Temp : ' + (body.main.temp-273).toFixed(2) +'°C')
            }
        })
}

module.exports=forecastCode