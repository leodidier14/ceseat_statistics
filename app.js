const express = require('express')
const app = express()


const requestLog = require('./models/requestLog')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const mongoose = require('mongoose');
//Connect to db
mongoose.connect(process.env.DB_MONGO_CONNECT, {useNewUrlParser: true}, () =>
    console.log("connected to database")
);
//######### Display name and version ############// 
const apiinf = require('./models/apiinfo')
var pjson = require('./package.json');
console.log("name : " + pjson.name);
console.log("version : " + pjson.version);
const PORT = process.env.PORT
const apiinfos = apiinf.findOneAndUpdate({name: pjson.name , port:process.env.PORT}, {version : pjson.version}, {upsert: true}).exec()
//################################################//

app.use((req,res,next) => {
    requestLog.create({name:pjson.name,date: Date.now()}, (err)=> {
      if(err) console.log(err)
    })
    next()
  })

//Import routes
const authRoute = require('./routes/routes')

//Route middlewares
app.use('/api/statistics', authRoute)

//Running server and listening on port 3000
app.listen(PORT, () => console.log(`Serveur running on port ${PORT}`))

