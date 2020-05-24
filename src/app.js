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

app.get('/help', (req, res)=>{
    res.send({
        name:'Hello'
    })
})

app.get("/about", (req, res)=>{
    res.send("Hello About")
})

app.get("/weather", (req, res)=>{
    if(!req.query.address){
       return res.send({
            error:'Please provide a location!'
        })
    }

    geoCode(req.query.address,(error, {latitude,longitude,location} = { } ) => {
        if(error){
        return res.send({error })
        }
        forecastCode(latitude,longitude,(error,forecastData)=> {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast : forecastData,
                address : req.query.address,
                location
            })
        })
    })
})


app.listen(port,()=>{
    console.log("Server run at port" + port)
})