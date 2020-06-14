// require dependencies
var express = require("express");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// set up port 
var PORT = process.env.PORT || 3030;

// start our express app
var app = express();

// set up router for express
var router = express.Router();

// require routes file to pass our router
require("./config/routes")(router);

// Designate public folder as static directory
app.use(express.static(__dirname + "/public"));

// connect to handlebars
app.engine("handlebars", expressHandlebars ({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Body-parser for the app
app.use(bodyParser.urlencoded({
    extended: false
}));

// Middleware
app.use(router);

// If deployed, use databas
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connect mongoose to database
mongoose.connect(db, function(error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log("mongoose connection succeeded");
    }
});

// Port for listening
app.listen(PORT, function() {
    console.log("App is listening on port:" + PORT);
});