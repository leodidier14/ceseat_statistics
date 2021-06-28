const express = require('express')
const app = express()

const dotenv = require('dotenv');

//Import routes
const authRoute = require('./routes/routes')

//Route middlewares
app.use('/api/statistics', authRoute)

//Running server and listening on port 3000
const PORT = 3005
app.listen(PORT, () => console.log(`Serveur running on port ${PORT}`))

