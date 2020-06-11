// require dependencies
var express = require("express");

// set up port 
var PORT = process.env.PORT || 3030;

// start our express app
var app = express();

// set up router for express
var router = express.Router();

// Designate public folder as static directory
app.use(express.static(__dirname + "/public"));

// Middleware
app.use(router);

// Port for listening
app.listen(PORT, function() {
    console.log("App is listening on port:" + PORT);
});