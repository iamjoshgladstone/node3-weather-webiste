const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const request = require('postman-request')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlbar engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=> {
    res.render('index', {
        title: 'Weather App',
        name: 'Josh Gladstone'
    })
})

app.get('/about', (req,res)=> {
    res.render('about', {
        title: 'About Page',
        name: 'Josh Gladstone'
    })
})

app.get('/help', (req,res)=> {
    res.render('help', {
        title: 'This is the help page',
        name: 'Josh Gladstone'

    })
})

app.get('/weather', (req,res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
           res.send({
               forecast: forecastData,
               address: req.query.address
           })
        })
    }) 
}) 

// app.get('/products', (req, res) => {

// if (!req.query.search) {
//     return res.send({
//         error: 'You must provide a search term'
//     })
// }
//     res.send({
//         products: []
//     })
// })

app.get('/help/*',(req,res)=>{
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Josh Gladstone'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        errorMessage: 'Sorry guy! This page is not available'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})