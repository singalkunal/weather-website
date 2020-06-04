const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

PORT = 3000
// express config paths
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engines and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)  // Only if want to change default views path
hbs.registerPartials(partialsPath)

// Setup static derectory
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kunal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kunal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is message for help page',
        name: 'Kunal'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Must provide and address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error)
        {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error)
            {
                res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })
    // res.send({
    //     forecast: 'It is summer',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        errorMsg: 'Help not found',
        name: 'Kunal'
    })
})

app.get('*', (req, res) => {
    
    res.render('404',{
        title: '404',
        errorMsg: 'Page not found',
        name: 'Kunal'
    })
})


app.listen(PORT, () => {
    console.log('Server running on port', PORT)
})