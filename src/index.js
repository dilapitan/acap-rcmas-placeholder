const express = require('express')
const app = express()

const { SEASONAL_DUMMY_DATA } = require('./data')

app.get('/', (req, res) => {
  res.send('Welcome to ACAP-RCMAS Placeholder!')
})

app.get('/seasonal-dummy-data', (req, res) => {
  res.status(200).json({
    months: SEASONAL_DUMMY_DATA,
  })
})

app.listen(3000)
