const express = require('express')
const app = express()

const { TENDAY_DUMMY_DATA, SEASONAL_DUMMY_DATA } = require('./data')

app.get('/', (req, res) => {
  res.send('Welcome to ACAP-RCMAS Placeholder!')
})

app.get('/tenday-dummy-data', (req, res) => {
  res.status(200).json({
    municipalities: TENDAY_DUMMY_DATA,
  })
})

app.get('/seasonal-dummy-data', (req, res) => {
  res.status(200).json({
    months: SEASONAL_DUMMY_DATA,
  })
})

app.listen(3000)
