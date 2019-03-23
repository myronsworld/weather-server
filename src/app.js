const path = require('path')
const express = require('express')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')

app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Myron'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Myron'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpMsg: 'This app will provide weather for any location'
  })
})

app.get('/weather', (req, res) => {
  res.send({
    location: 'Wichita',
    forecast: 'Nice'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})
