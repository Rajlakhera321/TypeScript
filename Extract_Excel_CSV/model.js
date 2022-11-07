const {db} = require("./db");

var user = "CREATE TABLE IF NOT EXISTS excel(Name char(100),Age int,Email char(100),Password char(50))"
const file =
    db.query(user, function(err, result){
        if(err){
            console.log(err, "error occurs here")
        }
    })

module.exports = {file}