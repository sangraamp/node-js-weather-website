const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => { //req gets the request, res the result
//     res.send('<h1>Homepage<h1>') //not console.log!!
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sangraam'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sangraam'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is the help page.',
        name: 'Sangraam'
    })
})

app.get('/weather', (req, res) => {
    const { query } = req

    if (!query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(query.address, (error, { latitude, longitude, place_name } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location: place_name,
                address: query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        errorMessage: 'Help article not found',
        name: 'Sangraam'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Sangraam'
    })
})

app.listen(port, () => {
    console.log('Server is up and running on port ' + port) //only displayed to the developer
}) //starts up the server, one time thing