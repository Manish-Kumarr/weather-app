const express = require('express')
const path = require('path')
var hbs = require('hbs');
const geoCode = require('./utils/geoCode')
const forecastCode = require('./utils/forecastCode')

const app = express()
const port = process.env.PORT || 3000


const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

app.use(express.static(publicDirectoryPath))
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.get('', (req, res)=>{
    res.render('index',{
        title:'Weather App'
    })
})

app.get("/weather", (req, res)=>{
    if(!req.query.address){
       return res.send({
            error:'Please provide a location!'
        })
    }

    // geoCode(req.query.address,(error, {latitude,longitude,location} = { } ) => {
    geoCode(req.query.address,(error, response ) => {
        if(error){
        return res.send({error })
        }
        forecastCode(response.latitude,response.longitude,(error,forecastData)=> {
            if(error){
                return res.send({error})
            }
            res.send({
                temprature :'Temp : '+(forecastData.temp-273).toFixed(2) +'°C',
                temp_Min:'Temp Min : '+(forecastData.temp_min-273).toFixed(2) +'°C',
                temp_Max:'Temp Max : '+(forecastData.temp_max-273).toFixed(2) +'°C',
                pressure:'Pressure : '+ forecastData.pressure,
                humidity:'Humidity : '+forecastData.humidity,
                location: response.location
            })
        })
    })
})


app.listen(port,()=>{
    console.log("Server run at port " + port)
})