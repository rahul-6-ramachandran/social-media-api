const express = require('express');
const db = require('./database/connection');

const app = express()


app.use(express.json());

app.get('/',(req,res)=>{
    console.log("Hello world")
})


module.exports = {db,app}