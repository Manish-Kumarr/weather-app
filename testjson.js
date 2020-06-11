const request = require('request')
const url ="http://api.openweathermap.org/data/2.5/weather?q=Goa&appid=69767795771243a927f54d6744ecf024"

request({url}, (error, data)=>{
    const dat = JSON.parse(data.body)
    console.log(dat)
})