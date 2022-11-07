const mysql = require("mysql");

var db = mysql.createConnection({
    host: process.env.HOST,
    user: 'root',
    password: process.env.PASSWORD,
    database: process.env.DB
})

db.connect(function(err) {
    if(err){
        console.log(err)
    }
    console.log("connected");
    db.query("CREATE DATABASE IF NOT EXISTS newDB", function(err, result){
        if(err){
            console.log(err)
        }
        console.log("created successfully")
    })
})

module.exports = {db};