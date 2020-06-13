var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
require('dotenv').config();
require('./utils/db_connection');       //connection to Database
var app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

//Import routes
const placeRoute = require('./controllers/placeController');

//Routes
app.use('/place', placeRoute);


//Server listening - up and running Port
app.listen(process.env.PORT, () => {
    console.log("Server up and running on port : " + process.env.PORT);
});