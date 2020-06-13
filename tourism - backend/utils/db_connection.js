var mongoose = require('mongoose');

const db_connect = mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true  },
    function(err){
        if(err){
            console.log("Error occured while connecting to the Database ...!");
            throw err;
        }
        console.log("MongoDB : Connected to the Database successfully ...!");
    });

module.exports = db_connect;