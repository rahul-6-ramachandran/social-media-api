const sqlite3 = require('sqlite3').verbose();
const path = require('path')

const dbPath = path.join(__dirname, "social_media.db");
const db = new sqlite3.Database(dbPath,(err)=>{
    if(err){
        console.error("Database connection failed : ", err. message)
    }else{
        console.log("Database connected successfully");
    }
})

module.exports = db;