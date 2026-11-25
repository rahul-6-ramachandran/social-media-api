const express = require('express');
const db = require('./database/connection');
const { default: router } = require('./routes');

const app = express()


app.use(express.json());


app.get('/',(req,res)=>{
    console.log("Hello world")
})
app.use('/api', router )

app.use((res, req, err)=>{
    return res.status(err.status).json({
        message : err.message
    })
})
module.exports = {db,app}