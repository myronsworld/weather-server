const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define paths for express cfg
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup hbs engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static dir to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Myron'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Myron'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpMsg: 'This app will provide weather for any location',
    title: 'Help',
    name: 'Myron'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Must provide an address'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location }) => {
    if (location) {
      if (error) {
        return res.send({
          error
        })
      }
      forecast(latitude, longitude, (error, forcastData) => {
        if (error) {
          return res.send({
            error: error
          })
        }
        res.send({
          forecast: forcastData,
          location,
          address: req.query.address
        })
      })
    } else {
      res.send({
        error: 'Please provide a location'
      })
    }
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'Must provide a search term'
    })
  }

  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMsg: 'Help article not found',
    title: '404',
    name: 'Myron'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    errorMsg: 'Page not found',
    title: '404',
    name: 'Myron'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})
